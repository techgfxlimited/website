<script>
	import { onMount } from 'svelte';

	let scrolled = $state(false);
	let menuOpen = $state(false);

	const navLinks = [
		{ label: 'Services', href: '/#services' },
		{ label: 'Work', href: '/#work' },
		{ label: 'Pricing', href: '/pricing/' },
		{ label: 'Contact', href: '/contact/' }
	];

	onMount(() => {
		const onScroll = () => {
			scrolled = window.scrollY > 50;
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	function closeMenu() {
		menuOpen = false;
	}
</script>

<header class="header glass" class:scrolled>
	<div class="container bar">
		<a href="/" class="logo" onclick={closeMenu}>
			<img src="/favicon.png" alt="TechGFX" class="logo-image" />
			<span class="logo-text gradient-text">TechGFX</span>
		</a>

		<nav class="nav-links">
			{#each navLinks as link}
				<a href={link.href}>{link.label}</a>
			{/each}
		</nav>

		<button
			class="hamburger"
			class:open={menuOpen}
			aria-label="Toggle menu"
			aria-expanded={menuOpen}
			onclick={() => (menuOpen = !menuOpen)}
		>
			<span></span>
			<span></span>
			<span></span>
		</button>
	</div>
</header>

{#if menuOpen}
	<div class="mobile-menu">
		<nav>
			{#each navLinks as link}
				<a href={link.href} onclick={closeMenu}>{link.label}</a>
			{/each}
		</nav>
	</div>
{/if}

<style>
	.header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		background: transparent;
		border: none;
		border-bottom: 1px solid transparent;
		transition:
			background 0.4s cubic-bezier(0.4, 0, 0.2, 1),
			border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1),
			backdrop-filter 0.4s ease;
	}

	.header.scrolled {
		background: rgba(10, 10, 10, 0.75);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
	}

	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 1.1rem;
		padding-bottom: 1.1rem;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		text-decoration: none;
	}

	.logo-image {
		height: 34px;
		width: auto;
	}

	.logo-text {
		font-size: 1.35rem;
		font-weight: 700;
	}

	.nav-links {
		display: flex;
		gap: 2.25rem;
	}

	.nav-links a {
		color: var(--color-text);
		text-decoration: none;
		font-weight: 500;
		font-size: 0.95rem;
		position: relative;
		transition: color 0.3s ease;
	}

	.nav-links a::after {
		content: '';
		position: absolute;
		bottom: -4px;
		left: 0;
		width: 0;
		height: 2px;
		background: var(--gradient-primary);
		transition: width 0.3s ease;
	}

	.nav-links a:hover {
		color: var(--color-primary);
	}

	.nav-links a:hover::after {
		width: 100%;
	}

	.hamburger {
		display: none;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 5px;
		width: 42px;
		height: 42px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: var(--radius-md);
		cursor: pointer;
	}

	.hamburger span {
		display: block;
		width: 18px;
		height: 2px;
		background: var(--color-text);
		transition: all 0.3s ease;
	}

	.hamburger.open span:nth-child(1) {
		transform: translateY(7px) rotate(45deg);
	}

	.hamburger.open span:nth-child(2) {
		opacity: 0;
	}

	.hamburger.open span:nth-child(3) {
		transform: translateY(-7px) rotate(-45deg);
	}

	.mobile-menu {
		position: fixed;
		inset: 0;
		z-index: 999;
		background: rgba(10, 10, 10, 0.98);
		backdrop-filter: blur(20px);
		display: flex;
		align-items: center;
		justify-content: center;
		animation: fadeIn 0.25s ease-out;
	}

	.mobile-menu nav {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		text-align: center;
	}

	.mobile-menu a {
		color: var(--color-text);
		text-decoration: none;
		font-size: 1.75rem;
		font-weight: 600;
	}

	.mobile-menu a:hover {
		color: var(--color-primary);
	}

	@media (max-width: 768px) {
		.nav-links {
			display: none;
		}

		.hamburger {
			display: flex;
		}
	}
</style>
