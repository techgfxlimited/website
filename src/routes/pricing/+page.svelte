<script>
	import { onMount, untrack } from 'svelte';
	import { goto } from '$app/navigation';
	import { services } from '$lib/data/services.js';

	/** @type {Set<string>} */
	let selected = $state(new Set());
	let totalEl;
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

	onMount(() => {
		(async () => {
			const gsap = (await import('gsap')).default;
			gsapInstance = gsap;

			const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

			gsap.from('.pricing-hero-anim', {
				opacity: 0,
				y: reduceMotion ? 0 : 30,
				duration: reduceMotion ? 0.01 : 0.8,
				stagger: reduceMotion ? 0 : 0.1,
				ease: 'power3.out'
			});

			gsap.from('.service-select-card', {
				opacity: 0,
				y: reduceMotion ? 0 : 24,
				duration: reduceMotion ? 0.01 : 0.6,
				stagger: reduceMotion ? 0 : 0.07,
				delay: reduceMotion ? 0 : 0.2,
				ease: 'power3.out'
			});
		})();
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
	<title>Pricing & Quote Builder — TechGFX Technologies</title>
	<meta
		name="description"
		content="Select the services you need and get an instant indicative quote from TechGFX Technologies."
	/>
</svelte:head>

<section class="pricing-hero">
	<div class="container">
		<h1 class="pricing-hero-anim">Build your quote</h1>
		<p class="pricing-hero-anim subtitle">
			Pick the services you're interested in. We'll put together an indicative price instantly —
			no forms, no waiting.
		</p>
	</div>
</section>

<section class="section pricing-section">
	<div class="container pricing-layout">
		<div class="services-col">
			{#each services as service (service.slug)}
				<label class="service-select-card glass" class:active={selected.has(service.slug)}>
					<input
						type="checkbox"
						checked={selected.has(service.slug)}
						onchange={() => toggle(service.slug)}
					/>
					<span class="checkbox-visual" aria-hidden="true"></span>
					<span class="service-select-icon">{service.icon}</span>
					<span class="service-select-body">
						<span class="service-select-name">{service.name}</span>
						<span class="service-select-tagline">{service.tagline}</span>
					</span>
					<span class="service-select-price">£{service.price.toLocaleString()}</span>
				</label>
			{/each}
		</div>

		<aside class="summary-panel glass">
			<h2>Your quote</h2>

			{#if selectedServices.length === 0}
				<p class="empty-summary">No services selected yet. Choose from the list.</p>
			{:else}
				<ul class="summary-list">
					{#each selectedServices as s (s.slug)}
						<li>
							<span>{s.name}</span>
							<span>£{s.price.toLocaleString()}</span>
						</li>
					{/each}
				</ul>
			{/if}

			<div class="summary-total">
				<span>Total</span>
				<span class="total-value" bind:this={totalEl}>£{displayedTotal.toLocaleString()}</span>
			</div>

			<p class="summary-note">
				Indicative starting prices — final quote confirmed after scoping call.
			</p>

			<button class="btn btn-primary full-width" disabled={selected.size === 0} onclick={proceed}>
				Proceed to checkout
			</button>
		</aside>
	</div>
</section>

<style>
	.pricing-hero {
		padding: 9rem 0 2rem;
		text-align: center;
	}

	.pricing-hero h1 {
		font-size: clamp(2.25rem, 5vw, 3.5rem);
		margin-bottom: 1rem;
	}

	.subtitle {
		font-size: 1.15rem;
		max-width: 560px;
		margin: 0 auto;
	}

	.pricing-layout {
		display: grid;
		grid-template-columns: 1.6fr 1fr;
		gap: 2.5rem;
		align-items: start;
	}

	.services-col {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.service-select-card {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1.25rem 1.5rem;
		border-radius: var(--radius-lg);
		cursor: pointer;
		transition: all 0.3s ease;
		position: relative;
	}

	.service-select-card:hover {
		border-color: rgba(99, 102, 241, 0.3);
	}

	.service-select-card.active {
		border-color: var(--color-primary);
		box-shadow: 0 0 0 1px var(--color-primary), var(--shadow-glow);
	}

	.service-select-card input {
		position: absolute;
		opacity: 0;
		width: 1px;
		height: 1px;
	}

	.checkbox-visual {
		width: 22px;
		height: 22px;
		border-radius: var(--radius-sm);
		border: 2px solid rgba(255, 255, 255, 0.25);
		flex-shrink: 0;
		position: relative;
		transition: all 0.25s ease;
	}

	.service-select-card.active .checkbox-visual {
		background: var(--gradient-primary);
		border-color: transparent;
	}

	.service-select-card.active .checkbox-visual::after {
		content: '\2713';
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-size: 0.8rem;
	}

	.service-select-icon {
		font-size: 1.75rem;
		flex-shrink: 0;
	}

	.service-select-body {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		flex: 1;
		min-width: 0;
	}

	.service-select-name {
		font-weight: 600;
	}

	.service-select-tagline {
		font-size: 0.875rem;
		color: var(--color-text-muted);
	}

	.service-select-price {
		font-weight: 700;
		color: var(--color-primary);
		white-space: nowrap;
	}

	.summary-panel {
		position: sticky;
		top: 6.5rem;
		padding: 2rem;
		border-radius: var(--radius-lg);
	}

	.summary-panel h2 {
		font-size: 1.4rem;
		margin-bottom: 1.25rem;
	}

	.empty-summary {
		color: var(--color-text-muted);
		font-size: 0.95rem;
	}

	.summary-list {
		list-style: none;
		margin: 0 0 1.25rem;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.summary-list li {
		display: flex;
		justify-content: space-between;
		font-size: 0.9rem;
		color: var(--color-text-muted);
	}

	.summary-total {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 1.25rem;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		margin-bottom: 0.75rem;
		font-weight: 600;
	}

	.total-value {
		font-size: 1.75rem;
		font-weight: 700;
		background: var(--gradient-primary);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.summary-note {
		font-size: 0.8rem;
		color: var(--color-text-muted);
		margin-bottom: 1.5rem;
	}

	.full-width {
		width: 100%;
	}

	@media (max-width: 900px) {
		.pricing-layout {
			grid-template-columns: 1fr;
		}

		.summary-panel {
			position: static;
		}
	}

	@media (max-width: 480px) {
		.service-select-card {
			flex-wrap: wrap;
		}

		.service-select-price {
			margin-left: auto;
		}
	}
</style>
