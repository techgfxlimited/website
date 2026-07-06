<script>
	import { onMount } from 'svelte';
	import posthog from 'posthog-js';
	import { services } from '$lib/data/services.js';
	import { products } from '$lib/data/products.js';

	/** @type {HTMLElement} */
	let heroEl;
	/** @type {HTMLElement} */
	let headlineEl;
	/** @type {HTMLElement} */
	let sceneWrapEl;
	/** @type {HTMLImageElement} */
	let donutEl;
	/** @type {HTMLElement} */
	let servicesGridEl;
	/** @type {HTMLElement} */
	let workGridEl;
	/** @type {HTMLElement} */
	let statsEl;

	const stats = [
		{ value: 10, suffix: '+', label: 'years experience' },
		{ value: 50, suffix: '+', label: 'projects delivered' },
		{ value: 4, suffix: '', label: 'products live' },
		{ value: 24, suffix: '/7', label: 'support' }
	];

	onMount(() => {
		/** @type {any} */
		let ctx;
		let cleanupMouse = () => {};

		(async () => {
			const gsap = (await import('gsap')).default;
			const { ScrollTrigger } = await import('gsap/ScrollTrigger');
			gsap.registerPlugin(ScrollTrigger);

			const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

			ctx = gsap.context(() => {
				// Hero headline split-word entrance
				const words = headlineEl.querySelectorAll('.word');
				gsap.set(words, { yPercent: 110, opacity: 0 });

				if (reduceMotion) {
					gsap.set(words, { yPercent: 0, opacity: 1 });
				} else {
					gsap.to(words, {
						yPercent: 0,
						opacity: 1,
						duration: 1,
						ease: 'power4.out',
						stagger: 0.06,
						delay: 0.2
					});
				}

				gsap.from('.hero-sub, .hero-cta, .hero-scene', {
					opacity: 0,
					y: 30,
					duration: 0.9,
					ease: 'power3.out',
					stagger: 0.12,
					delay: reduceMotion ? 0 : 0.6
				});

				// Idle floating + rotation on the 3D scene
				if (!reduceMotion && donutEl) {
					gsap.to(donutEl, {
						y: -18,
						duration: 3.2,
						ease: 'sine.inOut',
						yoyo: true,
						repeat: -1
					});
					gsap.to(donutEl, {
						rotationZ: 8,
						duration: 5,
						ease: 'sine.inOut',
						yoyo: true,
						repeat: -1
					});
				}

				// Background glow orbs drifting
				if (!reduceMotion) {
					gsap.utils.toArray('.orb').forEach((orb, i) => {
						gsap.to(orb, {
							x: i % 2 === 0 ? 60 : -60,
							y: i % 2 === 0 ? -40 : 40,
							duration: 8 + i * 2,
							ease: 'sine.inOut',
							yoyo: true,
							repeat: -1
						});
					});
				}

				// Scroll reveals via onEnter callbacks: toggleActions-based from() tweens
				// never play when an anchor jump scrolls past the section in one tick
				/** @type {[string, Element, { x?: number, y?: number, stagger: number }][]} */
				const reveals = [
					['.service-card', servicesGridEl, { y: 40, stagger: 0.1 }],
					['.product-card', workGridEl, { x: -30, y: 20, stagger: 0.12 }]
				];
				reveals.forEach(([sel, trigger, fromVars]) => {
					gsap.set(sel, { opacity: 0, ...fromVars, stagger: 0 });
					ScrollTrigger.create({
						trigger,
						start: 'top 85%',
						once: true,
						onEnter: () =>
							gsap.to(sel, {
								opacity: 1,
								x: 0,
								y: 0,
								duration: 0.7,
								stagger: fromVars.stagger,
								ease: 'power3.out'
							})
					});
				});

				// Stats count-up
				gsap.utils.toArray('.stat-number').forEach((el) => {
					const target = Number(el.dataset.value);
					const counter = { val: 0 };
					ScrollTrigger.create({
						trigger: statsEl,
						start: 'top 85%',
						once: true,
						onEnter: () => {
							gsap.to(counter, {
								val: target,
								duration: 1.6,
								ease: 'power2.out',
								onUpdate: () => {
									el.textContent = Math.round(counter.val).toString();
								}
							});
						}
					});
				});

				// CTA band reveal (same onEnter pattern as above)
				gsap.set('.cta-band-inner', { opacity: 0, y: 30 });
				ScrollTrigger.create({
					trigger: '.cta-band',
					start: 'top 90%',
					once: true,
					onEnter: () =>
						gsap.to('.cta-band-inner', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
				});
			}); // unscoped: context animates selectors across the whole page, not just the hero

			// Mouse-move parallax tilt on hero scene
			if (!reduceMotion && sceneWrapEl && donutEl) {
				const rotX = gsap.quickTo(donutEl, 'rotationX', { duration: 0.6, ease: 'power3.out' });
				const rotY = gsap.quickTo(donutEl, 'rotationY', { duration: 0.6, ease: 'power3.out' });

				/** @param {MouseEvent} e */
				const onMove = (e) => {
					const rect = sceneWrapEl.getBoundingClientRect();
					const px = (e.clientX - rect.left) / rect.width - 0.5;
					const py = (e.clientY - rect.top) / rect.height - 0.5;
					rotY(px * 30);
					rotX(-py * 30);
				};

				window.addEventListener('mousemove', onMove);
				cleanupMouse = () => window.removeEventListener('mousemove', onMove);
			}
		})();

		return () => {
			cleanupMouse();
			if (ctx) ctx.revert();
		};
	});

	function handlePrimaryCta() {
		posthog.capture('contact_btn_clicked');
	}
</script>

<svelte:head>
	<title>TechGFX Technologies — Digital Products That Move</title>
	<meta
		name="description"
		content="TechGFX designs and builds websites, web apps, mobile apps, e-commerce and cloud solutions for ambitious businesses. From concept to launch."
	/>
</svelte:head>

<section class="hero" bind:this={heroEl}>
	<div class="orb orb-1"></div>
	<div class="orb orb-2"></div>

	<div class="container hero-grid">
		<div class="hero-copy">
			<h1 class="hero-headline" bind:this={headlineEl}>
				<span class="line"
					><span class="word">We</span> <span class="word">design</span>
					<span class="word">&amp;</span></span
				>
				<span class="line"
					><span class="word">build</span> <span class="word">digital</span></span
				>
				<span class="line"
					><span class="word gradient-text">products</span>
					<span class="word gradient-text">that</span>
					<span class="word gradient-text">move.</span></span
				>
			</h1>
			<p class="hero-sub">
				A studio for websites, web apps, mobile apps, and brand systems — built with craft,
				shipped on time.
			</p>
			<div class="hero-cta">
				<a href="/pricing/" class="btn btn-primary" onclick={handlePrimaryCta}>Build your quote</a>
				<a href="#work" class="btn btn-secondary">See our work</a>
			</div>
		</div>

		<div class="hero-scene">
			<div class="scene-wrap" bind:this={sceneWrapEl}>
				<img src="/donut.webp" alt="TechGFX" class="donut" bind:this={donutEl} />
			</div>
		</div>
	</div>
</section>

<section id="services" class="section services-section">
	<div class="container">
		<div class="section-header">
			<h2>What we do</h2>
			<p class="section-subtitle">Six ways we help you ship better digital products.</p>
		</div>

		<div class="services-grid" bind:this={servicesGridEl}>
			{#each services as service}
				<a href={`/services/${service.slug}/`} class="service-card glass">
					<div class="service-icon">{service.icon}</div>
					<h3>{service.name}</h3>
					<p>{service.tagline}</p>
					<div class="service-price">from £{service.price.toLocaleString()}</div>
					<div class="card-glow"></div>
				</a>
			{/each}
		</div>
	</div>
</section>

<section id="work" class="section work-section">
	<div class="container">
		<div class="section-header">
			<h2>Products we've built</h2>
			<p class="section-subtitle">A few things we've shipped and still maintain.</p>
		</div>

		<div class="work-grid" bind:this={workGridEl}>
			{#each products as product}
				<a
					href={product.url}
					target="_blank"
					rel="noopener noreferrer"
					class="product-card glass"
				>
					<span class="product-tag">{product.tag}</span>
					<h3>{product.name}</h3>
					<p>{product.description}</p>
					<span class="product-link">Visit site &rarr;</span>
				</a>
			{/each}
		</div>
	</div>
</section>

<section class="stats-strip" bind:this={statsEl}>
	<div class="container stats-grid">
		{#each stats as stat}
			<div class="stat">
				<div class="stat-value">
					<span class="stat-number" data-value={stat.value}>0</span>{stat.suffix}
				</div>
				<div class="stat-label">{stat.label}</div>
			</div>
		{/each}
	</div>
</section>

<section class="cta-band">
	<div class="container cta-band-inner">
		<h2 class="cta-heading gradient-text">Have an idea? Let's price it.</h2>
		<div class="cta-actions">
			<a href="/pricing/" class="btn btn-primary">Build your quote</a>
			<a href="/contact/" class="cta-secondary-link">Or get in touch &rarr;</a>
		</div>
	</div>
</section>

<style>
	.hero {
		min-height: 100vh;
		display: flex;
		align-items: center;
		position: relative;
		overflow: hidden;
		padding: 8rem 0 4rem;
	}

	.orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(90px);
		pointer-events: none;
		z-index: 0;
	}

	.orb-1 {
		width: 500px;
		height: 500px;
		top: 10%;
		left: -5%;
		background: radial-gradient(circle, rgba(99, 102, 241, 0.25), transparent 70%);
	}

	.orb-2 {
		width: 450px;
		height: 450px;
		bottom: 0%;
		right: -5%;
		background: radial-gradient(circle, rgba(236, 72, 153, 0.2), transparent 70%);
	}

	.hero-grid {
		display: grid;
		grid-template-columns: 1.1fr 0.9fr;
		align-items: center;
		gap: 3rem;
		position: relative;
		z-index: 1;
	}

	.hero-headline {
		font-size: clamp(2.5rem, 5.5vw, 4.5rem);
		line-height: 1.08;
		margin-bottom: 1.5rem;
		background: none;
		-webkit-text-fill-color: var(--color-text);
	}

	.line {
		display: block;
		overflow: hidden;
	}

	.word {
		display: inline-block;
		will-change: transform, opacity;
	}

	.hero-sub {
		font-size: clamp(1.05rem, 1.6vw, 1.25rem);
		color: var(--color-text-muted);
		max-width: 480px;
		margin-bottom: 2.25rem;
	}

	.hero-cta {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.hero-scene {
		display: flex;
		align-items: center;
		justify-content: center;
		perspective: 1000px;
	}

	.scene-wrap {
		perspective: 1000px;
		width: 100%;
		max-width: 420px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.donut {
		width: 100%;
		max-width: 360px;
		height: auto;
		filter: drop-shadow(0 20px 60px rgba(99, 102, 241, 0.35));
		transform-style: preserve-3d;
		will-change: transform;
	}

	/* Services */
	.section-header {
		text-align: center;
		margin-bottom: 3.5rem;
	}

	.section-header h2 {
		font-size: clamp(2.25rem, 4vw, 3.25rem);
		margin-bottom: 0.75rem;
	}

	.section-subtitle {
		font-size: 1.15rem;
		color: var(--color-text-muted);
	}

	.services-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.75rem;
	}

	.service-card {
		display: block;
		padding: 2.25rem;
		border-radius: var(--radius-lg);
		position: relative;
		overflow: hidden;
		color: var(--color-text);
		text-decoration: none;
		transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.service-card:hover {
		transform: translateY(-8px);
		border-color: rgba(99, 102, 241, 0.35);
		box-shadow: 0 20px 40px -20px rgba(99, 102, 241, 0.4);
	}

	.service-card:hover .card-glow {
		opacity: 1;
	}

	.card-glow {
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at 30% 20%, rgba(99, 102, 241, 0.15), transparent 70%);
		opacity: 0;
		transition: opacity 0.4s ease;
		pointer-events: none;
	}

	.service-icon {
		font-size: 2.5rem;
		margin-bottom: 1.25rem;
	}

	.service-card h3 {
		font-size: 1.25rem;
		margin-bottom: 0.5rem;
	}

	.service-card p {
		margin-bottom: 1.25rem;
	}

	.service-price {
		font-weight: 600;
		color: var(--color-primary);
		font-size: 0.95rem;
	}

	/* Work */
	.work-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.75rem;
	}

	.product-card {
		display: block;
		padding: 2.25rem;
		border-radius: var(--radius-lg);
		text-decoration: none;
		color: var(--color-text);
		transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
		position: relative;
	}

	.product-card:hover {
		transform: translateY(-6px);
		border-color: rgba(236, 72, 153, 0.35);
		box-shadow: 0 20px 40px -20px rgba(236, 72, 153, 0.35);
	}

	.product-tag {
		display: inline-block;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding: 0.3rem 0.75rem;
		border-radius: var(--radius-full);
		background: rgba(99, 102, 241, 0.15);
		color: var(--color-primary);
		margin-bottom: 1rem;
	}

	.product-card h3 {
		font-size: 1.3rem;
		margin-bottom: 0.5rem;
	}

	.product-link {
		display: inline-block;
		margin-top: 0.5rem;
		font-weight: 600;
		color: var(--color-secondary);
	}

	/* Stats strip */
	.stats-strip {
		padding: 4rem 0;
		border-top: 1px solid rgba(255, 255, 255, 0.06);
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 2rem;
		text-align: center;
	}

	.stat-value {
		font-size: clamp(2.25rem, 4vw, 3rem);
		font-weight: 700;
		background: var(--gradient-primary);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.stat-label {
		color: var(--color-text-muted);
		margin-top: 0.5rem;
		font-size: 0.95rem;
	}

	/* CTA band */
	.cta-band {
		padding: clamp(4rem, 10vw, 8rem) 0;
		text-align: center;
	}

	.cta-heading {
		font-size: clamp(2.25rem, 5vw, 3.75rem);
		margin-bottom: 2rem;
	}

	.cta-actions {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;
		flex-wrap: wrap;
	}

	.cta-secondary-link {
		color: var(--color-text-muted);
		text-decoration: none;
		font-weight: 500;
		transition: color 0.3s ease;
	}

	.cta-secondary-link:hover {
		color: var(--color-primary);
	}

	@media (max-width: 900px) {
		.hero-grid {
			grid-template-columns: 1fr;
			text-align: center;
		}

		.hero-cta {
			justify-content: center;
		}

		.hero-sub {
			margin-left: auto;
			margin-right: auto;
		}

		.hero-scene {
			order: -1;
		}

		.donut {
			max-width: 240px;
		}

		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 480px) {
		.hero {
			padding: 7rem 0 3rem;
		}
	}
</style>
