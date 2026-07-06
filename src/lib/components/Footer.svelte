<script>
	import { magnetic } from '$lib/motion.js';
	import { services } from '$lib/data/services.js';

	const year = new Date().getFullYear();

	const socials = [
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/chukwuemeka-anyakora/' },
		{ label: 'Instagram', href: 'https://www.instagram.com/techgfx_' },
		{ label: 'GitHub', href: 'https://github.com/techgfxlimited' }
	];
</script>

<footer>
	<div class="container cta-row">
		<p class="label">Next step</p>
		<h2 class="h2">
			Have an idea <span class="serif-accent">worth building?</span>
		</h2>
		<a href="mailto:info@techgfxlimited.com" class="email-link" use:magnetic={0.15}>
			info@techgfxlimited.com <span class="arrow">→</span>
		</a>
	</div>

	<div class="container cols">
		<nav aria-label="Footer">
			<p class="col-title">Menu</p>
			<a href="/">Home</a>
			<a href="/#work">Work</a>
			<a href="/pricing/">Pricing</a>
			<a href="/contact/">Contact</a>
		</nav>
		<nav aria-label="Services">
			<p class="col-title">Services</p>
			{#each services as s (s.slug)}
				<a href="/services/{s.slug}/">{s.name}</a>
			{/each}
		</nav>
		<div>
			<p class="col-title">Elsewhere</p>
			{#each socials as s (s.href)}
				<a href={s.href} target="_blank" rel="noopener">{s.label}</a>
			{/each}
			<p class="addr">Northampton, United Kingdom<br />+44 795 562 4268</p>
		</div>
	</div>

	<div class="giant" aria-hidden="true">TECHGFX</div>

	<div class="container legal">
		<span>© {year} TechGFX Technologies Limited</span>
		<span>Designed &amp; built in-house</span>
	</div>
</footer>

<style>
	footer {
		background: var(--ink);
		color: var(--paper);
		overflow: clip;
		border-top: 1px solid rgba(242, 239, 234, 0.08);
	}

	.cta-row {
		padding-block: clamp(4rem, 9vw, 8rem) clamp(3rem, 6vw, 5rem);
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
		align-items: flex-start;
	}

	.email-link {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		font-size: clamp(1.2rem, 2.6vw, 2rem);
		font-weight: 500;
		letter-spacing: -0.02em;
		text-decoration: none;
		color: var(--accent);
	}
	.email-link .arrow {
		transition: transform 0.45s var(--ease-out);
	}
	.email-link:hover .arrow {
		transform: translateX(8px);
	}

	.cols {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 2rem;
		padding-block: 2.5rem 4rem;
		border-top: 1px solid rgba(242, 239, 234, 0.08);
	}
	.cols nav,
	.cols div {
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
	}
	.col-title {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		text-transform: uppercase;
		letter-spacing: 0.18em;
		color: rgba(242, 239, 234, 0.45);
		margin-bottom: 0.5rem;
	}
	.cols a {
		text-decoration: none;
		color: rgba(242, 239, 234, 0.75);
		font-size: 0.95rem;
		width: fit-content;
		transition: color 0.35s var(--ease-out);
	}
	.cols a:hover {
		color: var(--accent);
	}
	.addr {
		margin-top: 1rem;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		line-height: 1.8;
		color: rgba(242, 239, 234, 0.45);
	}

	/* viewport-filling wordmark, cropped at the baseline */
	.giant {
		font-weight: 700;
		font-size: clamp(4rem, 16.5vw, 16rem);
		letter-spacing: -0.045em;
		line-height: 0.72;
		text-align: center;
		color: rgba(242, 239, 234, 0.08);
		user-select: none;
		transform: translateY(0.08em);
		white-space: nowrap;
	}

	.legal {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
		padding-block: 1.5rem;
		border-top: 1px solid rgba(242, 239, 234, 0.08);
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.08em;
		color: rgba(242, 239, 234, 0.4);
	}

	@media (max-width: 720px) {
		.cols {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
