<script>
	import { onMount } from 'svelte';
	import { services } from '$lib/data/services.js';
	import SEO from '$lib/components/SEO.svelte';
	import { gsap, revealLines, revealOnScroll, magnetic, reducedMotion, EASE } from '$lib/motion.js';

	// ponytail: swap for a real Stripe Payment Link before going live
	const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/REPLACE_ME';

	let ready = $state(false);
	/** @type {typeof services} */
	let selectedItems = $state([]);

	const total = $derived(selectedItems.reduce((sum, s) => sum + s.price, 0));

	/** @type {HTMLElement} */
	let heroH1;

	onMount(() => {
		const params = new URLSearchParams(window.location.search);
		const itemsParam = params.get('items');
		const slugs = itemsParam ? itemsParam.split(',').filter(Boolean) : [];
		selectedItems = services.filter((s) => slugs.includes(s.slug));
		ready = true;

		if (reducedMotion()) return;

		const tl = gsap.timeline({ delay: 0.1 });
		tl.from('.hero .label', { opacity: 0, y: 16, duration: 0.8, ease: EASE }, 0);
		revealLines(heroH1, { delay: 0.15, stagger: 0.1 });

		requestAnimationFrame(() => {
			revealOnScroll('.order-row', '.order-summary', { y: 22, stagger: 0.06 });
			gsap.from('.checkout-actions > *', {
				opacity: 0,
				y: 20,
				duration: 0.8,
				stagger: 0.08,
				delay: 0.4,
				ease: EASE
			});
		});
	});
</script>

<SEO
	title="Checkout"
	description="Review your selected services and reserve your project with a deposit or book a scoping call."
	url="https://techgfxlimited.com/checkout/"
/>

<section class="hero section">
	<div class="container hero-grid">
		<p class="label">Checkout</p>
		<h1 class="h2" bind:this={heroH1}>Almost <span class="serif-accent">there.</span></h1>
	</div>
</section>

<section class="section chapter">
	<div class="container narrow">
		{#if !ready}
			<div class="loading-placeholder"></div>
		{:else if selectedItems.length === 0}
			<div class="empty-state">
				<p class="empty-note">( nothing here yet )</p>
				<a href="/pricing/" class="btn btn-ghost" use:magnetic>Back to pricing</a>
			</div>
		{:else}
			<div class="order-summary">
				<p class="label">Order summary</p>
				<ul class="order-list">
					{#each selectedItems as item (item.slug)}
						<li class="order-row">
							<span class="item-name">{item.name}</span>
							<span class="item-note">starting from</span>
							<span class="item-price">£{item.price.toLocaleString()}</span>
						</li>
					{/each}
				</ul>
				<div class="order-total">
					<span class="total-label">Total</span>
					<span class="total-value">£{total.toLocaleString()}</span>
				</div>
				<p class="order-note">
					Indicative starting prices — final quote confirmed after scoping call. A deposit
					secures your project slot; the remainder is agreed during scoping.
				</p>
			</div>

			<div class="checkout-actions">
				<a
					href={STRIPE_PAYMENT_LINK}
					target="_blank"
					rel="noopener noreferrer"
					class="btn btn-solid full-width"
					use:magnetic
				>
					Pay deposit with Stripe <span class="arrow">→</span>
				</a>
				<a href="/contact/" class="btn btn-ghost full-width" use:magnetic>
					Book a scoping call instead
				</a>
			</div>
		{/if}
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

	.narrow {
		max-width: 760px;
	}

	.loading-placeholder {
		min-height: 200px;
	}

	/* ---------- empty state ---------- */
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1.5rem;
		padding-block: clamp(3rem, 8vw, 5rem);
		border-top: 1px solid var(--line);
		border-bottom: 1px solid var(--line);
	}
	.empty-note {
		font-family: var(--font-mono);
		font-size: 0.9rem;
		letter-spacing: 0.06em;
		color: var(--fg-60);
	}

	/* ---------- order summary ---------- */
	.order-summary {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.order-list {
		list-style: none;
		margin: 0;
		padding: 0;
		border-top: 1px solid var(--line);
	}
	.order-row {
		display: grid;
		grid-template-columns: 1fr auto auto;
		align-items: baseline;
		gap: 1rem;
		padding-block: clamp(1.1rem, 2.5vw, 1.6rem);
		border-bottom: 1px solid var(--line);
	}
	.item-name {
		font-size: 1.15rem;
		letter-spacing: -0.01em;
	}
	.item-note {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--fg-40);
	}
	.item-price {
		font-family: var(--font-mono);
		font-size: 0.9rem;
		color: var(--fg-60);
		white-space: nowrap;
	}

	.order-total {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		padding-top: 0.5rem;
	}
	.total-label {
		font-family: var(--font-mono);
		font-size: 0.78rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--fg-60);
	}
	.total-value {
		font-size: clamp(2rem, 4vw, 2.75rem);
		font-weight: 500;
		letter-spacing: -0.03em;
		color: var(--accent);
		font-variant-numeric: tabular-nums;
	}

	.order-note {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		line-height: 1.7;
		color: var(--fg-40);
	}

	/* ---------- actions ---------- */
	.checkout-actions {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-top: clamp(2.5rem, 5vw, 3.5rem);
	}

	.full-width {
		width: 100%;
	}

	@media (max-width: 640px) {
		.order-row {
			grid-template-columns: 1fr auto;
		}
		.item-note {
			grid-column: 1;
		}
	}
</style>
