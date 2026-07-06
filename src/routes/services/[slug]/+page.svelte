<script>
	import { onMount } from 'svelte';
	import { gsap, revealLines, revealOnScroll, magnetic, reducedMotion, EASE } from '$lib/motion.js';
	import { services } from '$lib/data/services.js';
	import SEO from '$lib/components/SEO.svelte';

	let { data } = $props();
	const service = $derived(data.service);
	const otherServices = $derived(data.otherServices);
	const index = $derived(services.findIndex((s) => s.slug === service.slug));

	/** @param {string} name */
	function splitLast(name) {
		const words = name.trim().split(' ');
		const last = words.pop();
		return { rest: words.join(' '), last };
	}

	/** @type {HTMLElement} */
	let heroH1;
	/** @type {HTMLElement} */
	let deliverablesList;

	onMount(() => {
		if (reducedMotion()) return;

		const tl = gsap.timeline({ delay: 0.1 });
		tl.from('.hero .label', { opacity: 0, y: 16, duration: 0.8, ease: EASE }, 0);
		revealLines(heroH1, { delay: 0.15, stagger: 0.1 });
		tl.from('.hero-foot > *', { opacity: 0, y: 22, duration: 0.9, stagger: 0.1, ease: EASE }, 0.5);

		revealOnScroll('.deliverable-row', deliverablesList, { y: 30, stagger: 0.07 });
		revealOnScroll('.cross-row', '.cross-sell', { y: 26, stagger: 0.06 });
	});
</script>

<SEO
	title={service.name}
	description={service.tagline}
	url={`https://techgfxlimited.com/services/${service.slug}/`}
	keywords={`techgfx, ${service.short.toLowerCase()}, ${service.name.toLowerCase()}, UK digital agency`}
/>

<!-- ============ HERO (dark) ============ -->
<section class="hero section">
	<div class="container hero-grid">
		<p class="label">Service — {String(index + 1).padStart(2, '0')}</p>
		<h1 class="h2" bind:this={heroH1}>
			{#if splitLast(service.name).rest}
				{splitLast(service.name).rest}
				<span class="serif-accent">{splitLast(service.name).last}</span>
			{:else}
				<span class="serif-accent">{splitLast(service.name).last}</span>
			{/if}
		</h1>
		<div class="hero-foot">
			<div class="hero-foot-text">
				<p class="lead">{service.tagline}</p>
				<p class="price-line">
					from £{service.price.toLocaleString()} — indicative starting price
				</p>
			</div>
			<div class="hero-cta">
				<a href={`/pricing/?add=${service.slug}`} class="btn btn-solid" use:magnetic>
					Add to a quote <span class="arrow">→</span>
				</a>
				<a href="/contact/" class="btn btn-ghost" use:magnetic>Talk to us</a>
			</div>
		</div>
	</div>
</section>

<!-- ============ WHAT YOU GET (light) ============ -->
<section class="section chapter" data-theme="light">
	<div class="container">
		<p class="label">What you get</p>
		<ul class="deliverables-list" bind:this={deliverablesList}>
			{#each service.deliverables as item, i (item)}
				<li class="deliverable-row">
					<span class="d-idx">{String(i + 1).padStart(2, '0')}</span>
					<span class="d-text">{item}</span>
				</li>
			{/each}
		</ul>
		<p class="timeline-line">Typical timeline — {service.timeline}</p>
	</div>
</section>

<!-- ============ DESCRIPTION + CROSS-SELL (dark) ============ -->
<section class="section chapter">
	<div class="container">
		<p class="description">{service.description}</p>

		<div class="cross-sell">
			<p class="label">Other capabilities</p>
			<ul class="cross-list">
				{#each otherServices as other (other.slug)}
					<li class="cross-row">
						<a href={`/services/${other.slug}/`} class="cross-link">
							<span class="cross-name">{other.short}</span>
							<span class="cross-price">from £{other.price.toLocaleString()}</span>
							<span class="cross-arrow" aria-hidden="true">→</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<style>
	.hero {
		padding-top: clamp(8rem, 16vh, 11rem);
		padding-bottom: clamp(4rem, 8vh, 6rem);
	}

	.hero-grid {
		display: flex;
		flex-direction: column;
		gap: clamp(1.5rem, 3vh, 2.5rem);
	}

	.hero-foot {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		gap: 2.5rem;
		flex-wrap: wrap;
	}

	.hero-foot-text {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.price-line {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--fg-60);
	}

	.hero-cta {
		display: flex;
		gap: 0.9rem;
		flex-wrap: wrap;
	}

	/* ---------- chapters ---------- */
	.chapter {
		padding-block: clamp(5rem, 11vw, 8rem);
	}

	/* ---------- deliverables ---------- */
	.deliverables-list {
		list-style: none;
		margin: clamp(2rem, 4vw, 3.5rem) 0 0;
		padding: 0;
		border-top: 1px solid var(--line);
	}
	.deliverable-row {
		display: grid;
		grid-template-columns: 3.5rem 1fr;
		gap: 1.5rem;
		align-items: baseline;
		padding-block: clamp(1.4rem, 3vw, 2rem);
		border-bottom: 1px solid var(--line);
	}
	.d-idx {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--fg-40);
	}
	.d-text {
		font-size: 1.3rem;
		letter-spacing: -0.01em;
		line-height: 1.3;
	}

	.timeline-line {
		margin-top: 2rem;
		font-family: var(--font-mono);
		font-size: 0.78rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--fg-60);
	}

	/* ---------- description ---------- */
	.description {
		font-size: 1.35rem;
		line-height: 1.6;
		max-width: 30em;
		color: var(--fg-60);
	}

	/* ---------- cross-sell ---------- */
	.cross-sell {
		margin-top: clamp(4rem, 8vw, 6rem);
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
	.cross-list {
		list-style: none;
		margin: 0;
		padding: 0;
		border-top: 1px solid var(--line);
	}
	.cross-row {
		border-bottom: 1px solid var(--line);
	}
	.cross-link {
		display: grid;
		grid-template-columns: 1fr auto 2.5rem;
		align-items: baseline;
		gap: 1.5rem;
		padding-block: clamp(1.4rem, 3vw, 2rem);
		text-decoration: none;
		color: var(--fg);
	}
	.cross-name {
		font-size: clamp(1.4rem, 3vw, 2rem);
		font-weight: 500;
		letter-spacing: -0.02em;
		transition: color 0.4s var(--ease-out);
	}
	.cross-link:hover .cross-name {
		color: var(--accent);
	}
	.cross-price {
		font-family: var(--font-mono);
		font-size: 0.78rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--fg-60);
	}
	.cross-arrow {
		font-size: 1.3rem;
		justify-self: end;
		opacity: 0.35;
		transform: translateX(-6px);
		transition:
			transform 0.45s var(--ease-out),
			opacity 0.45s var(--ease-out);
	}
	.cross-link:hover .cross-arrow {
		opacity: 1;
		transform: translateX(0);
	}

	@media (max-width: 640px) {
		.deliverable-row {
			grid-template-columns: 2.4rem 1fr;
		}
		.cross-link {
			grid-template-columns: 1fr auto;
		}
		.cross-arrow {
			display: none;
		}
	}
</style>
