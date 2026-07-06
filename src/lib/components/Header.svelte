<script>
	import { page } from '$app/state';
	import { magnetic } from '$lib/motion.js';

	let scrolled = $state(false);
	let open = $state(false);

	const links = [
		{ href: '/#services', text: 'Services' },
		{ href: '/#work', text: 'Work' },
		{ href: '/pricing/', text: 'Pricing' },
		{ href: '/contact/', text: 'Contact' }
	];

	$effect(() => {
		// close the overlay on navigation
		page.url.pathname;
		open = false;
	});

	function onScroll() {
		scrolled = window.scrollY > 40;
	}
</script>

<svelte:window onscroll={onScroll} />

<header class:scrolled class:open>
	<div class="bar">
		<a href="/" class="wordmark" aria-label="TechGFX home">
			TechGFX<sup>®</sup>
		</a>

		<nav class="desktop-nav" aria-label="Primary">
			{#each links as link (link.href)}
				<a href={link.href}>{link.text}</a>
			{/each}
		</nav>

		<div class="right">
			<a href="/pricing/" class="btn btn-solid cta" use:magnetic>Start a project</a>
			<button
				class="burger"
				aria-expanded={open}
				aria-label={open ? 'Close menu' : 'Open menu'}
				onclick={() => (open = !open)}
			>
				<span></span>
				<span></span>
			</button>
		</div>
	</div>

	<div class="overlay" aria-hidden={!open}>
		<nav aria-label="Mobile">
			{#each links as link, i (link.href)}
				<a href={link.href} style="transition-delay: {open ? 80 + i * 60 : 0}ms">{link.text}</a>
			{/each}
		</nav>
		<div class="overlay-foot">
			<a href="mailto:info@techgfxlimited.com">info@techgfxlimited.com</a>
			<span>Northampton, UK</span>
		</div>
	</div>
</header>

<style>
	header {
		position: fixed;
		inset: 0 0 auto 0;
		z-index: 100;
	}

	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 var(--gutter);
		height: 76px;
		transition:
			background-color 0.5s var(--ease-out),
			border-color 0.5s var(--ease-out);
		border-bottom: 1px solid transparent;
	}

	.scrolled .bar {
		background: rgba(11, 11, 13, 0.72);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border-bottom-color: rgba(242, 239, 234, 0.08);
	}

	.wordmark {
		font-weight: 700;
		font-size: 1.25rem;
		letter-spacing: -0.02em;
		text-decoration: none;
		color: var(--paper);
		z-index: 2;
		position: relative;
	}
	.wordmark sup {
		font-family: var(--font-mono);
		font-size: 0.55em;
		font-weight: 400;
		color: var(--accent);
		margin-left: 2px;
	}

	.desktop-nav {
		display: flex;
		gap: 2.25rem;
	}
	.desktop-nav a {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.16em;
		text-decoration: none;
		color: rgba(242, 239, 234, 0.7);
		position: relative;
		transition: color 0.35s var(--ease-out);
	}
	.desktop-nav a::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: -5px;
		height: 1px;
		width: 100%;
		background: var(--accent);
		transform: scaleX(0);
		transform-origin: right;
		transition: transform 0.45s var(--ease-out);
	}
	.desktop-nav a:hover {
		color: var(--paper);
	}
	.desktop-nav a:hover::after {
		transform: scaleX(1);
		transform-origin: left;
	}

	.right {
		display: flex;
		align-items: center;
		gap: 1rem;
		z-index: 2;
		position: relative;
	}

	.cta {
		padding: 0.75rem 1.5rem;
		font-size: 0.85rem;
	}

	.burger {
		display: none;
		flex-direction: column;
		justify-content: center;
		gap: 6px;
		width: 44px;
		height: 44px;
		background: none;
		border: 1px solid rgba(242, 239, 234, 0.2);
		border-radius: 999px;
		padding: 0 11px;
	}
	.burger span {
		display: block;
		height: 1.5px;
		background: var(--paper);
		transition: transform 0.45s var(--ease-out);
	}
	.open .burger span:first-child {
		transform: translateY(3.75px) rotate(45deg);
	}
	.open .burger span:last-child {
		transform: translateY(-3.75px) rotate(-45deg);
	}

	/* fullscreen mobile overlay */
	.overlay {
		position: fixed;
		inset: 0;
		background: var(--ink);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 8rem var(--gutter) 3rem;
		clip-path: inset(0 0 100% 0);
		transition:
			clip-path 0.7s var(--ease-in-out),
			visibility 0s 0.7s;
		visibility: hidden;
	}
	.open .overlay {
		clip-path: inset(0 0 0% 0);
		visibility: visible;
		transition: clip-path 0.7s var(--ease-in-out);
	}
	.overlay nav {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.overlay nav a {
		font-size: clamp(2.6rem, 10vw, 4rem);
		font-weight: 500;
		letter-spacing: -0.03em;
		text-decoration: none;
		color: var(--paper);
		opacity: 0;
		transform: translateY(24px);
		transition:
			opacity 0.6s var(--ease-out),
			transform 0.6s var(--ease-out);
	}
	.open .overlay nav a {
		opacity: 1;
		transform: translateY(0);
	}
	.overlay-foot {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		letter-spacing: 0.1em;
		color: rgba(242, 239, 234, 0.55);
	}
	.overlay-foot a {
		color: var(--accent);
		text-decoration: none;
	}

	@media (max-width: 860px) {
		.desktop-nav,
		.cta {
			display: none;
		}
		.burger {
			display: flex;
		}
	}
</style>
