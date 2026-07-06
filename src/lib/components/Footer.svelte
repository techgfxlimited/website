<script>
	const year = new Date().getFullYear();

	const quickLinks = [
		{ label: 'Home', href: '/' },
		{ label: 'Services', href: '/#services' },
		{ label: 'Work', href: '/#work' },
		{ label: 'Pricing', href: '/pricing/' },
		{ label: 'Contact', href: '/contact/' }
	];
</script>

<footer class="footer">
	<div class="container grid">
		<div class="col brand">
			<div class="brand-name gradient-text">TechGFX</div>
			<p>
				A studio designing and building websites, apps, and digital products for ambitious
				businesses — from first sketch to production launch.
			</p>
		</div>

		<div class="col">
			<h4>Quick links</h4>
			<ul>
				{#each quickLinks as link}
					<li><a href={link.href}>{link.label}</a></li>
				{/each}
			</ul>
		</div>

		<div class="col">
			<h4>Contact</h4>
			<ul class="contact-list">
				<li>Northampton, United Kingdom</li>
				<li><a href="tel:+447955624268">+44 795 562 4268</a></li>
				<li><a href="mailto:info@techgfxlimited.com">info@techgfxlimited.com</a></li>
			</ul>
			<div class="socials">
				<a href="https://www.linkedin.com/in/chukwuemeka-anyakora/" target="_blank" rel="noopener">LinkedIn</a>
				<a href="https://www.instagram.com/techgfx_" target="_blank" rel="noopener">Instagram</a>
				<a href="https://github.com/techgfxlimited" target="_blank" rel="noopener">GitHub</a>
			</div>
		</div>
	</div>

	<div class="container">
		<p class="copyright">&copy; {year} TechGFX Technologies Limited. All rights reserved.</p>
	</div>
</footer>

<style>
	.footer {
		border-top: 1px solid rgba(255, 255, 255, 0.08);
		padding: 4rem 0 2rem;
		margin-top: auto;
	}

	.grid {
		display: grid;
		grid-template-columns: 1.4fr 1fr 1fr;
		gap: 3rem;
		margin-bottom: 3rem;
	}

	.brand-name {
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 1rem;
	}

	.col h4 {
		font-size: 1rem;
		margin-bottom: 1.25rem;
		color: var(--color-text);
	}

	.col ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.col a {
		color: var(--color-text-muted);
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.col a:hover {
		color: var(--color-primary);
	}

	.contact-list li {
		color: var(--color-text-muted);
	}

	.socials {
		display: flex;
		gap: 1.25rem;
		margin-top: 1.5rem;
		flex-wrap: wrap;
	}

	.socials a {
		font-size: 0.9rem;
		font-weight: 500;
	}

	.copyright {
		text-align: center;
		color: var(--color-text-muted);
		font-size: 0.875rem;
		margin: 0;
		padding-top: 2rem;
		border-top: 1px solid rgba(255, 255, 255, 0.05);
	}

	@media (max-width: 768px) {
		.grid {
			grid-template-columns: 1fr;
			gap: 2.5rem;
		}
	}
</style>
