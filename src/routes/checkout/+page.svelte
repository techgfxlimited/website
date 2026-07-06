<script>
	import { onMount } from 'svelte';
	import { services } from '$lib/data/services.js';

	// ponytail: swap for a real Stripe Payment Link before going live
	const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/REPLACE_ME';

	let ready = $state(false);
	/** @type {typeof services} */
	let selectedItems = $state([]);

	const total = $derived(selectedItems.reduce((sum, s) => sum + s.price, 0));

	onMount(() => {
		const params = new URLSearchParams(window.location.search);
		const itemsParam = params.get('items');
		const slugs = itemsParam ? itemsParam.split(',').filter(Boolean) : [];
		selectedItems = services.filter((s) => slugs.includes(s.slug));
		ready = true;

		(async () => {
			const gsap = (await import('gsap')).default;
			const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
			gsap.from('.checkout-anim', {
				opacity: 0,
				y: reduceMotion ? 0 : 24,
				duration: reduceMotion ? 0.01 : 0.7,
				stagger: reduceMotion ? 0 : 0.08,
				ease: 'power3.out'
			});
		})();
	});
</script>

<svelte:head>
	<title>Checkout — TechGFX Technologies</title>
	<meta
		name="description"
		content="Review your selected services and reserve your project with a deposit or book a scoping call."
	/>
</svelte:head>

<section class="checkout-hero">
	<div class="container">
		<h1 class="checkout-anim">Checkout</h1>
		<p class="checkout-anim subtitle">Review your selection before securing your slot.</p>
	</div>
</section>

<section class="section checkout-section">
	<div class="container narrow">
		{#if !ready}
			<div class="loading-placeholder"></div>
		{:else if selectedItems.length === 0}
			<div class="empty-state glass checkout-anim">
				<p>No services selected yet.</p>
				<a href="/pricing/" class="btn btn-primary">Back to pricing</a>
			</div>
		{:else}
			<div class="order-summary glass checkout-anim">
				<h2>Order summary</h2>
				<ul class="order-list">
					{#each selectedItems as item (item.slug)}
						<li>
							<div>
								<span class="item-name">{item.name}</span>
								<span class="item-note">{item.priceNote}</span>
							</div>
							<span class="item-price">£{item.price.toLocaleString()}</span>
						</li>
					{/each}
				</ul>
				<div class="order-total">
					<span>Total</span>
					<span class="total-value gradient-text">£{total.toLocaleString()}</span>
				</div>
				<p class="order-note">
					Indicative starting prices — final quote confirmed after scoping call. A deposit
					secures your project slot; the remainder is agreed during scoping.
				</p>
			</div>

			<div class="checkout-actions checkout-anim">
				<a href={STRIPE_PAYMENT_LINK} target="_blank" rel="noopener noreferrer" class="btn btn-primary full-width">
					Pay deposit with Stripe
				</a>
				<a href="/contact/" class="btn btn-secondary full-width">Or book a scoping call</a>
			</div>
		{/if}
	</div>
</section>

<style>
	.checkout-hero {
		padding: 9rem 0 2rem;
		text-align: center;
	}

	.checkout-hero h1 {
		font-size: clamp(2.25rem, 5vw, 3.25rem);
		margin-bottom: 1rem;
	}

	.subtitle {
		color: var(--color-text-muted);
		font-size: 1.1rem;
	}

	.narrow {
		max-width: 640px;
	}

	.loading-placeholder {
		min-height: 200px;
	}

	.empty-state {
		text-align: center;
		padding: 3rem 2rem;
		border-radius: var(--radius-lg);
	}

	.empty-state p {
		margin-bottom: 1.5rem;
	}

	.order-summary {
		padding: 2rem;
		border-radius: var(--radius-lg);
		margin-bottom: 2rem;
	}

	.order-summary h2 {
		font-size: 1.4rem;
		margin-bottom: 1.5rem;
	}

	.order-list {
		list-style: none;
		margin: 0 0 1.5rem;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.order-list li {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		padding-bottom: 1rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	}

	.item-name {
		display: block;
		font-weight: 600;
	}

	.item-note {
		display: block;
		font-size: 0.8rem;
		color: var(--color-text-muted);
	}

	.item-price {
		font-weight: 600;
		color: var(--color-primary);
	}

	.order-total {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-weight: 600;
		font-size: 1.1rem;
		margin-bottom: 1rem;
	}

	.total-value {
		font-size: 1.75rem;
		font-weight: 700;
	}

	.order-note {
		font-size: 0.85rem;
		color: var(--color-text-muted);
		margin: 0;
	}

	.checkout-actions {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.full-width {
		width: 100%;
	}
</style>
