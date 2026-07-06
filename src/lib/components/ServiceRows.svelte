<script>
	// Forked from svelte-bits FlowingMenu (MIT) — restyled for the TechGFX
	// design system: index + price columns, accent marquee, no images.
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	/** @type {{ items: { href: string, name: string, price: string }[] }} */
	let { items = [] } = $props();

	/** @type {HTMLElement[]} */
	const rowRefs = [];
	/** @type {HTMLDivElement[]} */
	const marqueeRefs = [];
	/** @type {HTMLDivElement[]} */
	const innerRefs = [];
	/** @type {(gsap.core.Tween | null)[]} */
	const tweens = [];
	/** @type {number[]} */
	let repetitions = $state([]);

	const defaults = { duration: 0.6, ease: 'expo.out' };

	/**
	 * @param {number} mx @param {number} my @param {number} w @param {number} h
	 * @returns {'top' | 'bottom'}
	 */
	function closestEdge(mx, my, w, h) {
		const top = (mx - w / 2) ** 2 + my ** 2;
		const bot = (mx - w / 2) ** 2 + (my - h) ** 2;
		return top < bot ? 'top' : 'bottom';
	}

	onMount(() => {
		const calc = () => {
			repetitions = items.map((_, i) => {
				const part = innerRefs[i]?.querySelector('.part');
				const cw = part instanceof HTMLElement ? part.offsetWidth : 0;
				return cw ? Math.max(4, Math.ceil(window.innerWidth / cw) + 2) : 4;
			});
		};
		calc();
		window.addEventListener('resize', calc);

		const timer = setTimeout(() => {
			items.forEach((_, i) => {
				const inner = innerRefs[i];
				const part = inner?.querySelector('.part');
				if (!inner || !(part instanceof HTMLElement) || !part.offsetWidth) return;
				tweens[i]?.kill();
				tweens[i] = gsap.to(inner, {
					x: -part.offsetWidth,
					duration: 14,
					ease: 'none',
					repeat: -1
				});
			});
		}, 60);

		return () => {
			clearTimeout(timer);
			tweens.forEach((t) => t?.kill());
			window.removeEventListener('resize', calc);
		};
	});

	/** @param {MouseEvent} ev @param {number} i */
	function enter(ev, i) {
		const root = rowRefs[i], m = marqueeRefs[i], inner = innerRefs[i];
		if (!root || !m || !inner) return;
		const r = root.getBoundingClientRect();
		const edge = closestEdge(ev.clientX - r.left, ev.clientY - r.top, r.width, r.height);
		gsap
			.timeline({ defaults })
			.set(m, { y: edge === 'top' ? '-101%' : '101%' }, 0)
			.set(inner, { y: edge === 'top' ? '101%' : '-101%' }, 0)
			.to([m, inner], { y: '0%' }, 0);
	}

	/** @param {MouseEvent} ev @param {number} i */
	function leave(ev, i) {
		const root = rowRefs[i], m = marqueeRefs[i], inner = innerRefs[i];
		if (!root || !m || !inner) return;
		const r = root.getBoundingClientRect();
		const edge = closestEdge(ev.clientX - r.left, ev.clientY - r.top, r.width, r.height);
		// inner returns to its rest offset (0) so it rides out with m instead of
		// counter-cancelling it — the opposite-offset pair only belongs to enter().
		gsap
			.timeline({ defaults })
			.to(m, { y: edge === 'top' ? '-101%' : '101%' }, 0)
			.to(inner, { y: '0%' }, 0);
	}
</script>

<div class="rows">
	{#each items as item, i (item.href)}
		<div class="row" bind:this={rowRefs[i]}>
			<a
				href={item.href}
				class="row-link"
				onmouseenter={(e) => enter(e, i)}
				onmouseleave={(e) => leave(e, i)}
			>
				<span class="idx">{String(i + 1).padStart(2, '0')}</span>
				<span class="name">{item.name}</span>
				<span class="price">{item.price}</span>
				<span class="go" aria-hidden="true">→</span>
			</a>
			<div class="marquee" bind:this={marqueeRefs[i]}>
				<div class="marquee-inner" bind:this={innerRefs[i]}>
					{#each Array.from({ length: repetitions[i] ?? 4 }) as _, idx (idx)}
						<div class="part">
							<span>{item.name}</span>
							<span class="dot" aria-hidden="true">✺</span>
							<span>{item.price}</span>
							<span class="dot" aria-hidden="true">✺</span>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
	.rows {
		border-top: 1px solid var(--line);
	}

	.row {
		position: relative;
		overflow: hidden;
		border-bottom: 1px solid var(--line);
	}

	.row-link {
		display: grid;
		grid-template-columns: 3.5rem 1fr auto 2.5rem;
		align-items: baseline;
		gap: 1.5rem;
		padding: clamp(1.6rem, 3vw, 2.4rem) 0;
		text-decoration: none;
		color: var(--fg);
	}

	.idx {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--fg-40);
	}

	.name {
		font-size: clamp(1.7rem, 4.2vw, 3.6rem);
		font-weight: 500;
		letter-spacing: -0.03em;
		line-height: 1;
	}

	.price {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		letter-spacing: 0.06em;
		color: var(--fg-60);
	}

	.go {
		font-size: 1.4rem;
		justify-self: end;
		transform: translateX(-6px);
		opacity: 0.35;
		transition:
			transform 0.45s var(--ease-out),
			opacity 0.45s var(--ease-out);
	}
	.row-link:hover .go {
		transform: translateX(0);
		opacity: 1;
	}

	.marquee {
		position: absolute;
		inset: 0;
		background: var(--accent);
		pointer-events: none;
		transform: translateY(101%);
	}

	.marquee-inner {
		height: 100%;
		width: fit-content;
		display: flex;
	}

	.part {
		display: flex;
		align-items: center;
		gap: 2rem;
		flex-shrink: 0;
		padding-inline: 1rem;
		height: 100%;
		color: var(--ink);
		font-size: clamp(1.4rem, 3vw, 2.4rem);
		font-weight: 500;
		letter-spacing: -0.02em;
		white-space: nowrap;
	}

	.part .dot {
		font-size: 0.9em;
	}

	@media (max-width: 720px) {
		.row-link {
			grid-template-columns: 2.2rem 1fr auto;
		}
		.go {
			display: none;
		}
	}
</style>
