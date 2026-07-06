<script>
	import { onMount } from 'svelte';
	import { services } from '$lib/data/services.js';
	import { gsap, revealLines, revealOnScroll, magnetic, reducedMotion, EASE } from '$lib/motion.js';

	const info = [
		{ label: 'Location', value: 'Northampton, United Kingdom' },
		{ label: 'Phone', value: '+44 795 562 4268', href: 'tel:+447955624268' },
		{ label: 'Email', value: 'info@techgfxlimited.com', href: 'mailto:info@techgfxlimited.com', accent: true }
	];

	const socials = [
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/chukwuemeka-anyakora/' },
		{ label: 'Instagram', href: 'https://www.instagram.com/techgfx_' },
		{ label: 'GitHub', href: 'https://github.com/techgfxlimited' }
	];

	/** @type {HTMLElement} */
	let heroH1;

	onMount(() => {
		if (reducedMotion()) return;

		const tl = gsap.timeline({ delay: 0.1 });
		tl.from('.hero .label', { opacity: 0, y: 16, duration: 0.8, ease: EASE }, 0);
		revealLines(heroH1, { delay: 0.15, stagger: 0.1 });

		revealOnScroll('.info-row', '.info-list', { y: 20, stagger: 0.07 });
		revealOnScroll('.social-row', '.social-list', { y: 16, stagger: 0.06 });
		revealOnScroll('.field', '.contact-form', { y: 20, stagger: 0.05 });
	});
</script>

<svelte:head>
	<title>Contact — TechGFX</title>
	<meta
		name="description"
		content="Get in touch with TechGFX to discuss your website, app, or digital product idea."
	/>
</svelte:head>

<section class="hero section">
	<div class="container contact-grid">
		<div class="contact-left">
			<p class="label">Contact</p>
			<h1 class="display" bind:this={heroH1}>Say <span class="serif-accent">hello.</span></h1>

			<ul class="info-list">
				{#each info as item (item.label)}
					<li class="info-row">
						<span class="info-label">{item.label}</span>
						{#if item.href}
							<a href={item.href} class="info-value" class:accent={item.accent}>{item.value}</a>
						{:else}
							<span class="info-value">{item.value}</span>
						{/if}
					</li>
				{/each}
			</ul>

			<ul class="social-list">
				{#each socials as s (s.href)}
					<li class="social-row">
						<a href={s.href} target="_blank" rel="noopener">{s.label}</a>
					</li>
				{/each}
			</ul>
		</div>

		<form
			class="contact-form"
			action="https://formsubmit.co/info@techgfxlimited.com"
			method="POST"
		>
			<input type="hidden" name="_subject" value="New enquiry from techgfxlimited.com" />
			<input type="hidden" name="_captcha" value="false" />

			<div class="field">
				<label for="name">Name</label>
				<input type="text" id="name" name="name" required />
			</div>
			<div class="field">
				<label for="email">Email</label>
				<input type="email" id="email" name="email" required />
			</div>
			<div class="field">
				<label for="company">Company (optional)</label>
				<input type="text" id="company" name="company" />
			</div>
			<div class="field">
				<label for="service">Service interest</label>
				<select id="service" name="service">
					<option value="">Not sure yet</option>
					{#each services as service (service.slug)}
						<option value={service.name}>{service.name}</option>
					{/each}
				</select>
			</div>
			<div class="field">
				<label for="message">Message</label>
				<textarea id="message" name="message" rows="6" required></textarea>
			</div>

			<button type="submit" class="btn btn-solid full-width" use:magnetic>
				Send it <span class="arrow">→</span>
			</button>
		</form>
	</div>
</section>

<style>
	.hero {
		padding-top: clamp(8rem, 16vh, 11rem);
		padding-bottom: clamp(5rem, 10vh, 7rem);
	}

	.contact-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: clamp(3rem, 6vw, 6rem);
		align-items: start;
	}

	.contact-left {
		display: flex;
		flex-direction: column;
		gap: clamp(2rem, 4vw, 3rem);
	}

	/* ---------- info list ---------- */
	.info-list {
		list-style: none;
		margin: 0;
		padding: 0;
		border-top: 1px solid var(--line);
	}
	.info-row {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 1rem;
		padding-block: 1.1rem;
		border-bottom: 1px solid var(--line);
		font-family: var(--font-mono);
	}
	.info-label {
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: var(--fg-60);
	}
	.info-value {
		font-size: 0.9rem;
		letter-spacing: 0.02em;
		color: var(--fg);
		text-decoration: none;
		transition: color 0.35s var(--ease-out);
	}
	a.info-value:hover {
		color: var(--accent);
	}
	.info-value.accent {
		color: var(--accent);
	}

	/* ---------- socials ---------- */
	.social-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		gap: 1.75rem;
		flex-wrap: wrap;
	}
	.social-row a {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		text-decoration: none;
		color: var(--fg-60);
		transition: color 0.35s var(--ease-out);
	}
	.social-row a:hover {
		color: var(--accent);
	}

	/* ---------- form ---------- */
	.contact-form {
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
	}

	.full-width {
		width: 100%;
		margin-top: 0.5rem;
	}

	@media (max-width: 860px) {
		.contact-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
