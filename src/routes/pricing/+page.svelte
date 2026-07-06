<script>
	import { onMount, untrack } from 'svelte';
	import { goto } from '$app/navigation';
	import { services } from '$lib/data/services.js';
	import { gsap as motionGsap, revealLines, revealOnScroll, magnetic, reducedMotion, EASE } from '$lib/motion.js';

	/** @type {Set<string>} */
	let selected = $state(new Set());
	let displayedTotal = $state(0);

	const selectedServices = $derived(services.filter((s) => selected.has(s.slug)));
	const total = $derived(selectedServices.reduce((sum, s) => sum + s.price, 0));

	/** @param {string} slug */
	function toggle(slug) {
		const next = new Set(selected);
		if (next.has(slug)) {
			next.delete(slug);
		} else {
			next.add(slug);
		}
		selected = next;
	}

	function proceed() {
		if (selected.size === 0) return;
		const items = Array.from(selected).join(',');
		goto(`/checkout/?items=${encodeURIComponent(items)}`);
	}

	/** @type {any} */
	let gsapInstance;

	/** @type {HTMLElement} */
	let heroH1;

	onMount(() => {
		const params = new URLSearchParams(window.location.search);
		const addSlug = params.get('add');
		if (addSlug && services.some((s) => s.slug === addSlug)) {
			selected = new Set([addSlug]);
		}

		if (reducedMotion()) return;

		gsapInstance = motionGsap;

		const tl = motionGsap.timeline({ delay: 0.1 });
		tl.from('.hero .label', { opacity: 0, y: 16, duration: 0.8, ease: EASE }, 0);
		revealLines(heroH1, { delay: 0.15, stagger: 0.1 });
		tl.from('.hero .lead', { opacity: 0, y: 20, duration: 0.9, ease: EASE }, 0.5);

		revealOnScroll('.service-row', '.services-col', { y: 24, stagger: 0.05 });
		motionGsap.from('.summary-panel', { opacity: 0, y: 24, duration: 0.9, delay: 0.3, ease: EASE });
	});

	$effect(() => {
		const target = total;
		if (!gsapInstance) {
			displayedTotal = target;
			return;
		}
		// untrack: onUpdate writes displayedTotal; tracking it would respawn a tween every frame
		const obj = { val: untrack(() => displayedTotal) };
		gsapInstance.to(obj, {
			val: target,
			duration: 0.5,
			ease: 'power2.out',
			onUpdate: () => {
				displayedTotal = Math.round(obj.val);
			}
		});
	});
</script>

<svelte:head>
	<title>Pricing & Quote Builder — TechGFX</title>
	<meta
		name="description"
		content="Select the services you need and get an instant indicative quote from TechGFX."
	/>
</svelte:head>

<section class="hero section">
	<div class="container hero-grid">
		<p class="label">Quote builder</p>
		<h1 class="display" bind:this={heroH1}>
			Pick. Sum. <span class="serif-accent">Ship.</span>
		</h1>
		<p class="lead">
			Choose the services you need. We'll total an indicative price instantly — no forms, no
			waiting.
		</p>
	</div>
</section>

<section class="section chapter">
	<div class="container pricing-layout">
		<div class="services-col">
			{#each services as service (service.slug)}
				<label class="service-row" class:active={selected.has(service.slug)}>
					<input
						type="checkbox"
						class="visually-hidden"
						checked={selected.has(service.slug)}
						onchange={() => toggle(service.slug)}
					/>
					<span class="indicator" aria-hidden="true"></span>
					<span class="service-body">
						<span class="service-name">{service.short}</span>
						<span class="service-full">{service.name}</span>
					</span>
					<span class="service-price">from £{service.price.toLocaleString()}</span>
				</label>
			{/each}
		</div>

		<aside class="summary-panel">
			<p class="label">Your quote</p>

			{#if selectedServices.length === 0}
				<p class="empty-summary">Nothing selected yet — choose from the list.</p>
			{:else}
				<ul class="summary-list">
					{#each selectedServices as s (s.slug)}
						<li>
							<span>{s.short}</span>
							<span>£{s.price.toLocaleString()}</span>
						</li>
					{/each}
				</ul>
			{/if}

			<div class="summary-total">
				<span class="total-label">Total</span>
				<span class="total-value">£{displayedTotal.toLocaleString()}</span>
			</div>

			<p class="summary-note">
				Indicative starting prices — final quote confirmed after scoping call.
			</p>

			<button
				type="button"
				class="btn btn-solid full-width"
				disabled={selected.size === 0}
				use:magnetic
				onclick={proceed}
			>
				Proceed to checkout <span class="arrow">→</span>
			</button>
		</aside>
	</div>
</section>

<style>
	.hero {
		padding-top: clamp(8rem, 16vh, 11rem);
		padding-bottom: clamp(3rem, 6vh, 5rem);
	}
	.hero-grid {
		display: flex;
		flex-direction: column;
		gap: clamp(1.25rem, 2.5vh, 2rem);
	}

	.chapter {
		padding-block: 0 clamp(5rem, 11vw, 8rem);
	}

	.pricing-layout {
		display: grid;
		grid-template-columns: 1fr 380px;
		gap: clamp(2rem, 4vw, 4rem);
		align-items: start;
	}

	/* ---------- services list ---------- */
	.services-col {
		display: flex;
		flex-direction: column;
		border-top: 1px solid var(--line);
	}

	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
	}

	.service-row {
		position: relative;
		display: grid;
		grid-template-columns: 18px 1fr auto;
		align-items: center;
		gap: 1.5rem;
		padding: clamp(1.4rem, 3vw, 2rem) clamp(0.5rem, 2vw, 1.25rem);
		border-bottom: 1px solid var(--line);
		cursor: pointer;
		transition: background-color 0.35s var(--ease-out);
	}
	.service-row:hover,
	.service-row.active {
		background: var(--surface);
	}

	.indicator {
		width: 18px;
		height: 18px;
		border: 1px solid var(--line);
		flex-shrink: 0;
		position: relative;
		transition: border-color 0.3s var(--ease-out);
	}
	.service-row.active .indicator {
		background: var(--accent);
		border-color: var(--accent);
	}
	.service-row.active .indicator::after {
		content: '';
		position: absolute;
		left: 5px;
		top: 1px;
		width: 5px;
		height: 9px;
		border: solid var(--ink);
		border-width: 0 2px 2px 0;
		transform: rotate(45deg);
	}

	.service-body {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		min-width: 0;
	}
	.service-name {
		font-size: clamp(1.4rem, 3vw, 1.7rem);
		font-weight: 500;
		letter-spacing: -0.02em;
	}
	.service-full {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--fg-40);
	}

	.service-price {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		letter-spacing: 0.04em;
		color: var(--fg-60);
		white-space: nowrap;
	}

	/* ---------- summary panel ---------- */
	.summary-panel {
		position: sticky;
		top: 100px;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		padding: clamp(1.75rem, 3vw, 2.5rem);
		border: 1px solid var(--line);
	}

	.empty-summary {
		font-size: 0.95rem;
		color: var(--fg-60);
	}

	.summary-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
	}
	.summary-list li {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		padding-block: 0.9rem;
		border-bottom: 1px solid var(--line);
		font-size: 0.95rem;
	}
	.summary-list li span:last-child {
		font-family: var(--font-mono);
		font-size: 0.82rem;
		color: var(--fg-60);
		white-space: nowrap;
	}

	.summary-total {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 1rem;
		padding-top: 0.5rem;
	}
	.total-label {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: var(--fg-60);
	}
	.total-value {
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-weight: 500;
		letter-spacing: -0.03em;
		color: var(--accent);
		font-variant-numeric: tabular-nums;
	}

	.summary-note {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		line-height: 1.6;
		color: var(--fg-40);
	}

	.full-width {
		width: 100%;
	}

	/* ---------- responsive ---------- */
	@media (max-width: 900px) {
		.pricing-layout {
			grid-template-columns: 1fr;
		}
		.summary-panel {
			position: static;
		}
	}

	@media (max-width: 480px) {
		.service-row {
			grid-template-columns: 16px 1fr;
			row-gap: 0.6rem;
		}
		.service-price {
			grid-column: 2;
		}
	}
</style>
