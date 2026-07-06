<script>
	import { onMount } from 'svelte';
	import { services } from '$lib/data/services.js';

	const contactCards = [
		{ icon: '📍', label: 'Location', value: 'Northampton, United Kingdom' },
		{ icon: '📞', label: 'Phone', value: '+44 795 562 4268', href: 'tel:+447955624268' },
		{ icon: '✉️', label: 'Email', value: 'info@techgfxlimited.com', href: 'mailto:info@techgfxlimited.com' }
	];

	onMount(() => {
		(async () => {
			const gsap = (await import('gsap')).default;
			const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

			gsap.from('.contact-anim', {
				opacity: 0,
				y: reduceMotion ? 0 : 26,
				duration: reduceMotion ? 0.01 : 0.7,
				stagger: reduceMotion ? 0 : 0.08,
				ease: 'power3.out'
			});
		})();
	});
</script>

<svelte:head>
	<title>Contact — TechGFX Technologies</title>
	<meta
		name="description"
		content="Get in touch with TechGFX Technologies to discuss your website, app, or digital product idea."
	/>
</svelte:head>

<section class="contact-hero">
	<div class="container">
		<h1 class="contact-anim">Let's talk</h1>
		<p class="contact-anim subtitle">
			Tell us about your project and we'll get back to you within one business day.
		</p>
	</div>
</section>

<section class="section contact-section">
	<div class="container">
		<div class="contact-cards contact-anim">
			{#each contactCards as card}
				<div class="contact-card glass">
					<div class="contact-icon">{card.icon}</div>
					<h3>{card.label}</h3>
					{#if card.href}
						<a href={card.href}>{card.value}</a>
					{:else}
						<p>{card.value}</p>
					{/if}
				</div>
			{/each}
		</div>

		<form
			class="contact-form glass contact-anim"
			action="https://formsubmit.co/info@techgfxlimited.com"
			method="POST"
		>
			<input type="hidden" name="_subject" value="New enquiry from techgfxlimited.com" />
			<input type="hidden" name="_captcha" value="false" />

			<div class="form-row">
				<div class="form-group">
					<label for="name">Name</label>
					<input type="text" id="name" name="name" required />
				</div>
				<div class="form-group">
					<label for="email">Email</label>
					<input type="email" id="email" name="email" required />
				</div>
			</div>

			<div class="form-row">
				<div class="form-group">
					<label for="company">Company <span class="optional">(optional)</span></label>
					<input type="text" id="company" name="company" />
				</div>
				<div class="form-group">
					<label for="service">Service interest</label>
					<select id="service" name="service">
						<option value="">Not sure yet</option>
						{#each services as service}
							<option value={service.name}>{service.name}</option>
						{/each}
					</select>
				</div>
			</div>

			<div class="form-group">
				<label for="message">Message</label>
				<textarea id="message" name="message" rows="6" required></textarea>
			</div>

			<button type="submit" class="btn btn-primary full-width">Send message</button>
		</form>
	</div>
</section>

<style>
	.contact-hero {
		padding: 9rem 0 2rem;
		text-align: center;
	}

	.contact-hero h1 {
		font-size: clamp(2.25rem, 5vw, 3.25rem);
		margin-bottom: 1rem;
	}

	.subtitle {
		color: var(--color-text-muted);
		font-size: 1.1rem;
		max-width: 500px;
		margin: 0 auto;
	}

	.contact-cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 1.5rem;
		margin-bottom: 3rem;
	}

	.contact-card {
		padding: 2rem;
		border-radius: var(--radius-lg);
		text-align: center;
		transition: all 0.3s ease;
	}

	.contact-card:hover {
		transform: translateY(-5px);
		border-color: rgba(99, 102, 241, 0.3);
	}

	.contact-icon {
		font-size: 2.25rem;
		margin-bottom: 0.75rem;
	}

	.contact-card h3 {
		font-size: 1.1rem;
		margin-bottom: 0.5rem;
	}

	.contact-card a,
	.contact-card p {
		color: var(--color-text-muted);
		text-decoration: none;
		margin: 0;
	}

	.contact-card a:hover {
		color: var(--color-primary);
	}

	.contact-form {
		max-width: 720px;
		margin: 0 auto;
		padding: 2.5rem;
		border-radius: var(--radius-lg);
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.form-group label {
		font-size: 0.9rem;
		font-weight: 500;
		color: var(--color-text);
	}

	.optional {
		color: var(--color-text-muted);
		font-weight: 400;
	}

	.form-group input,
	.form-group select,
	.form-group textarea {
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: var(--radius-md);
		padding: 0.75rem 1rem;
		color: var(--color-text);
		font-family: inherit;
		font-size: 0.95rem;
		transition: border-color 0.3s ease;
	}

	.form-group input:focus,
	.form-group select:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: var(--color-primary);
	}

	.form-group textarea {
		resize: vertical;
	}

	.full-width {
		width: 100%;
	}

	@media (max-width: 640px) {
		.form-row {
			grid-template-columns: 1fr;
		}

		.contact-form {
			padding: 1.75rem;
		}
	}
</style>
