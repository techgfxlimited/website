<script>
	import { onMount } from 'svelte';

	let { data } = $props();
	const service = $derived(data.service);
	const otherServices = $derived(data.otherServices);

	/** @type {HTMLElement} */
	let heroEl;
	/** @type {HTMLElement} */
	let listEl;

	onMount(() => {
		/** @type {any} */
		let ctx;

		(async () => {
			const gsap = (await import('gsap')).default;
			const { ScrollTrigger } = await import('gsap/ScrollTrigger');
			gsap.registerPlugin(ScrollTrigger);

			const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

			ctx = gsap.context(() => {
				gsap.from('.hero-anim', {
					opacity: 0,
					y: reduceMotion ? 0 : 30,
					duration: reduceMotion ? 0.01 : 0.8,
					stagger: reduceMotion ? 0 : 0.1,
					ease: 'power3.out'
				});

				gsap.from('.deliverable-item', {
					scrollTrigger: {
						trigger: listEl,
						start: 'top 85%',
						// complete on leave so a fast scroll past never strands items invisible
						toggleActions: 'play complete play complete'
					},
					opacity: 0,
					x: reduceMotion ? 0 : -20,
					duration: reduceMotion ? 0.01 : 0.5,
					stagger: reduceMotion ? 0 : 0.08,
					ease: 'power2.out'
				});

				gsap.from('.other-service-card', {
					scrollTrigger: {
						trigger: '.other-services-grid',
						start: 'top 90%',
						toggleActions: 'play complete play complete'
					},
					opacity: 0,
					y: reduceMotion ? 0 : 20,
					duration: reduceMotion ? 0.01 : 0.5,
					stagger: reduceMotion ? 0 : 0.06,
					ease: 'power2.out'
				});
			}); // unscoped: selectors live outside the hero element
		})();

		return () => {
			if (ctx) ctx.revert();
		};
	});
</script>

<svelte:head>
	<title>{service.name} — TechGFX Technologies</title>
	<meta name="description" content={service.description} />
</svelte:head>

<section class="service-hero" bind:this={heroEl}>
	<div class="container">
		<a href="/#services" class="back-link hero-anim">&larr; All services</a>

		<div class="hero-anim service-icon">{service.icon}</div>
		<h1 class="hero-anim">{service.name}</h1>
		<p class="tagline hero-anim">{service.tagline}</p>
		<div class="price-pill hero-anim">
			{service.priceNote} <strong>£{service.price.toLocaleString()}</strong>
		</div>

		<p class="description hero-anim">{service.description}</p>

		<div class="hero-anim cta-row">
			<a href="/pricing/" class="btn btn-primary">Add to quote</a>
			<a href="/contact/" class="btn btn-secondary">Talk to us</a>
		</div>
	</div>
</section>

<section class="section deliverables-section">
	<div class="container">
		<div class="deliverables-grid">
			<div class="deliverables-col">
				<h2>What's included</h2>
				<ul class="deliverables-list" bind:this={listEl}>
					{#each service.deliverables as item}
						<li class="deliverable-item glass">
							<span class="check">&#10003;</span>
							{item}
						</li>
					{/each}
				</ul>
			</div>

			<div class="timeline-col glass">
				<h3>Timeline</h3>
				<p class="timeline-value">{service.timeline}</p>
				<p class="timeline-note">
					Final scope and delivery dates are confirmed after a short discovery call.
				</p>
				<a href="/pricing/" class="btn btn-primary full-width">Build your quote</a>
			</div>
		</div>
	</div>
</section>

<section class="section other-services-section">
	<div class="container">
		<h2>Other services</h2>
		<div class="other-services-grid">
			{#each otherServices as other}
				<a href={`/services/${other.slug}/`} class="other-service-card glass">
					<span class="other-icon">{other.icon}</span>
					<span class="other-name">{other.name}</span>
				</a>
			{/each}
		</div>
	</div>
</section>

<style>
	.service-hero {
		padding: 9rem 0 4rem;
		max-width: 800px;
		margin: 0 auto;
	}

	.service-hero .container {
		max-width: 800px;
	}

	.back-link {
		display: inline-block;
		color: var(--color-text-muted);
		text-decoration: none;
		margin-bottom: 2rem;
		transition: color 0.3s ease;
	}

	.back-link:hover {
		color: var(--color-primary);
	}

	.service-icon {
		font-size: 3.5rem;
		margin-bottom: 1rem;
	}

	.service-hero h1 {
		font-size: clamp(2.25rem, 5vw, 3.5rem);
		margin-bottom: 1rem;
	}

	.tagline {
		font-size: 1.25rem;
		color: var(--color-text-muted);
		margin-bottom: 1.5rem;
	}

	.price-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.6rem 1.25rem;
		border-radius: var(--radius-full);
		background: rgba(99, 102, 241, 0.12);
		color: var(--color-text);
		font-size: 0.95rem;
		margin-bottom: 2rem;
	}

	.price-pill strong {
		color: var(--color-primary);
		font-size: 1.1rem;
	}

	.description {
		font-size: 1.1rem;
		margin-bottom: 2rem;
	}

	.cta-row {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.deliverables-grid {
		display: grid;
		grid-template-columns: 1.4fr 1fr;
		gap: 3rem;
	}

	.deliverables-col h2 {
		font-size: 1.75rem;
		margin-bottom: 1.5rem;
	}

	.deliverables-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
	}

	.deliverable-item {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		padding: 1rem 1.25rem;
		border-radius: var(--radius-md);
		color: var(--color-text);
	}

	.check {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background: var(--gradient-primary);
		color: white;
		font-size: 0.75rem;
		flex-shrink: 0;
	}

	.timeline-col {
		padding: 2rem;
		border-radius: var(--radius-lg);
		height: fit-content;
	}

	.timeline-col h3 {
		font-size: 1.2rem;
		margin-bottom: 1rem;
	}

	.timeline-value {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--color-primary);
		margin-bottom: 0.75rem;
	}

	.timeline-note {
		font-size: 0.9rem;
		margin-bottom: 1.5rem;
	}

	.full-width {
		width: 100%;
	}

	.other-services-section h2 {
		font-size: 1.75rem;
		margin-bottom: 2rem;
	}

	.other-services-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 1.25rem;
	}

	.other-service-card {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		padding: 1.25rem 1.5rem;
		border-radius: var(--radius-md);
		text-decoration: none;
		color: var(--color-text);
		transition: all 0.3s ease;
	}

	.other-service-card:hover {
		transform: translateY(-4px);
		border-color: rgba(99, 102, 241, 0.35);
	}

	.other-icon {
		font-size: 1.5rem;
	}

	.other-name {
		font-weight: 500;
	}

	@media (max-width: 768px) {
		.deliverables-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
