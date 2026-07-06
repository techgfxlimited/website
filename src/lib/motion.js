// Shared motion primitives. Client-side only — call from onMount.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };

export const EASE = 'expo.out';

export const reducedMotion = () =>
	typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** @type {import('lenis').default | null} */
let lenis = null;

/** Start Lenis smooth scroll, driven by the GSAP ticker. Returns a destroy fn. */
export async function initSmoothScroll() {
	if (reducedMotion()) return () => {};
	const Lenis = (await import('lenis')).default;
	lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1 });
	lenis.on('scroll', ScrollTrigger.update);
	/** @param {number} time */
	const raf = (time) => lenis?.raf(time * 1000);
	gsap.ticker.add(raf);
	gsap.ticker.lagSmoothing(0);
	return () => {
		gsap.ticker.remove(raf);
		lenis?.destroy();
		lenis = null;
	};
}

/** @param {string | HTMLElement} target */
export function scrollTo(target) {
	if (lenis) lenis.scrollTo(target, { duration: 1.2 });
	else if (typeof target === 'string') document.querySelector(target)?.scrollIntoView();
	else target.scrollIntoView();
}

/**
 * Split element text into masked lines and reveal them.
 * @param {HTMLElement | string} el
 * @param {{ delay?: number, stagger?: number, trigger?: boolean, duration?: number }} [opts]
 * @returns {SplitText | null}
 */
export function revealLines(el, opts = {}) {
	if (reducedMotion()) return null;
	const { delay = 0, stagger = 0.09, trigger = false, duration = 1.1 } = opts;
	const split = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'line' });
	gsap.fromTo(
		split.lines,
		{ yPercent: 115 },
		{
			yPercent: 0,
			duration,
			stagger,
			delay,
			ease: EASE,
			...(trigger
				? { scrollTrigger: { trigger: /** @type {any} */ (el), start: 'top 88%', once: true } }
				: {})
		}
	);
	return split;
}

/**
 * Reveal-once helper that survives anchor jumps past the trigger.
 * @param {string | Element | Element[]} targets
 * @param {Element | string} trigger
 * @param {object} fromVars
 */
export function revealOnScroll(targets, trigger, fromVars = {}) {
	if (reducedMotion()) return;
	const { stagger = 0.08, y = 36, ...rest } = /** @type {any} */ (fromVars);
	gsap.set(targets, { opacity: 0, y, ...rest });
	ScrollTrigger.create({
		trigger: /** @type {any} */ (trigger),
		start: 'top 88%',
		once: true,
		onEnter: () =>
			gsap.to(targets, { opacity: 1, y: 0, x: 0, duration: 0.9, stagger, ease: EASE })
	});
}

/**
 * Magnetic hover — Svelte action. use:magnetic or use:magnetic={0.35}
 * @param {HTMLElement} node
 * @param {number} [strength]
 */
export function magnetic(node, strength = 0.3) {
	if (reducedMotion() || window.matchMedia('(hover: none)').matches) return;
	const xTo = gsap.quickTo(node, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.4)' });
	const yTo = gsap.quickTo(node, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.4)' });
	/** @param {MouseEvent} e */
	const move = (e) => {
		const r = node.getBoundingClientRect();
		xTo((e.clientX - r.left - r.width / 2) * strength);
		yTo((e.clientY - r.top - r.height / 2) * strength);
	};
	const leave = () => {
		xTo(0);
		yTo(0);
	};
	node.addEventListener('mousemove', move);
	node.addEventListener('mouseleave', leave);
	return {
		destroy() {
			node.removeEventListener('mousemove', move);
			node.removeEventListener('mouseleave', leave);
		}
	};
}

/**
 * Count up a number when it scrolls into view.
 * @param {HTMLElement} el
 * @param {number} target
 * @param {(n: number) => string} [format]
 */
export function countUp(el, target, format = (n) => String(Math.round(n))) {
	if (reducedMotion()) {
		el.textContent = format(target);
		return;
	}
	const counter = { val: 0 };
	ScrollTrigger.create({
		trigger: el,
		start: 'top 92%',
		once: true,
		onEnter: () =>
			gsap.to(counter, {
				val: target,
				duration: 1.8,
				ease: 'expo.out',
				onUpdate: () => (el.textContent = format(counter.val))
			})
	});
}
