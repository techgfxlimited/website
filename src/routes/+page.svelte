<script>
  import { onMount } from "svelte";
  import posthog from "posthog-js";
  import LightRays from "$lib/vendor/LightRays.svelte";
  import ServiceRows from "$lib/components/ServiceRows.svelte";
  import SEO from "$lib/components/SEO.svelte";
  import { services } from "$lib/data/services.js";
  import { products } from "$lib/data/products.js";
  import {
    gsap,
    revealLines,
    revealOnScroll,
    magnetic,
    countUp,
    reducedMotion,
    EASE,
  } from "$lib/motion.js";

  /** @type {HTMLElement} */
  let heroEl;

  // --- floating preview state ---
  /** @type {HTMLElement} */
  let previewEl;
  /** @type {HTMLImageElement} */
  let previewImg;
  let activeImage = $state('');
  let previewVisible = $state(false);
  /** @type {ReturnType<typeof gsap.quickTo> | null} */
  let xTo = null;
  /** @type {ReturnType<typeof gsap.quickTo> | null} */
  let yTo = null;

  /** @param {{ clientX: number; clientY: number }} e */
  function onProductEnter(e, /** @type {string} */ image) {
    activeImage = image;
    previewVisible = true;
    // snap to cursor immediately on first enter
    gsap.set(previewEl, { x: e.clientX, y: e.clientY });
    gsap.to(previewEl, { opacity: 1, scale: 1, duration: 0.4, ease: EASE, overwrite: true });
    // create smooth follow targets
    xTo = gsap.quickTo(previewEl, 'x', { duration: 0.5, ease: 'power3.out' });
    yTo = gsap.quickTo(previewEl, 'y', { duration: 0.5, ease: 'power3.out' });
  }

  /** @param {{ clientX: number; clientY: number }} e */
  function onProductMove(e) {
    if (xTo) xTo(e.clientX);
    if (yTo) yTo(e.clientY);
  }

  function onProductLeave() {
    gsap.to(previewEl, { opacity: 0, scale: 0.85, duration: 0.35, ease: EASE, overwrite: true });
    previewVisible = false;
    xTo = null;
    yTo = null;
  }

  const stats = [
    {
      value: 10,
      format: /** @param {number} n */ (n) => `${Math.round(n)}+`,
      label: "years building for the web",
    },
    {
      value: 50,
      format: /** @param {number} n */ (n) => `${Math.round(n)}+`,
      label: "projects shipped",
    },
    {
      value: 4,
      format: /** @param {number} n */ (n) =>
        String(Math.round(n)).padStart(2, "0"),
      label: "products live right now",
    },
    {
      value: 24,
      format: /** @param {number} n */ (n) => `${Math.round(n)}/7`,
      label: "support cover",
    },
  ];

  const steps = [
    {
      n: "01",
      t: "Scope",
      d: "A scoping call and a fixed quote inside a week. No discovery theatre.",
    },
    {
      n: "02",
      t: "Design",
      d: "Interface and brand direction in days — iterated with you, not presented at you.",
    },
    {
      n: "03",
      t: "Build",
      d: "Production code from week one. You watch it come together on a live URL.",
    },
    {
      n: "04",
      t: "Ship",
      d: "Launch, measure, support. We stay on after go-live — our name is on it too.",
    },
  ];

  const marqueeLabels = [
    'Websites', 'Web apps', 'Mobile apps', 'E-commerce',
    'Branding', 'Cloud & DevOps', 'Consulting',
  ];

  const rowItems = services.map((s) => ({
    href: `/services/${s.slug}/`,
    name: s.short,
    price: `from £${s.price.toLocaleString()}`,
  }));

  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "TechGFX",
    url: "https://techgfxlimited.com",
    logo: "https://techgfxlimited.com/favicon.png",
    description:
      "TechGFX is a UK digital product studio. Websites, web apps, mobile apps, e-commerce and branding — designed, built and shipped by one team.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Oxford",
      addressCountry: "GB",
    },
    telephone: "+447955624268",
    email: "info@techgfxlimited.com",
    sameAs: [
      "https://www.linkedin.com/in/chukwuemeka-anyakora/",
      "https://www.instagram.com/techgfx_",
      "https://github.com/techgfxlimited",
    ],
  };

  onMount(() => {
    if (reducedMotion()) return;

    // --- load choreography ---
    const tl = gsap.timeline({ delay: 0.15 });
    tl.from(
      ".hero .label",
      { opacity: 0, y: 16, duration: 0.8, ease: EASE },
      0.1,
    );
    revealLines(".hero h1", { delay: 0.25, stagger: 0.1 });
    tl.from(
      ".hero-foot > *",
      { opacity: 0, y: 24, duration: 0.9, stagger: 0.1, ease: EASE },
      0.7,
    );
    tl.from(".hero-rays", { opacity: 0, duration: 2, ease: "power2.out" }, 0.4);

    // --- scroll chapters ---
    for (const sel of ["#services", "#work", "#process"]) {
      const head = document.querySelector(`${sel} .section-head`);
      if (head)
        revealOnScroll(Array.from(head.children), head, {
          y: 28,
          stagger: 0.12,
        });
    }
    revealOnScroll(".service-rows-wrap", ".service-rows-wrap", { y: 40 });
    revealOnScroll(".product", ".products", { y: 48, stagger: 0.14 });
    revealOnScroll(".step", ".steps", { y: 36, stagger: 0.1 });
    revealOnScroll(".cta-inner > *", ".cta-band", { y: 32, stagger: 0.1 });

    document.querySelectorAll(".stat-value").forEach((el, i) => {
      if (el instanceof HTMLElement)
        countUp(el, stats[i].value, stats[i].format);
    });
  });
</script>

<SEO
  title="TechGFX — We design, build & ship digital products"
  description="TechGFX is a UK digital product studio. Websites, web apps, mobile apps, e-commerce and branding — designed, built and shipped by one team."
  url="https://techgfxlimited.com"
  schema={homeSchema}
/>

<!-- ============ HERO ============ -->
<section class="hero section">
  <div class="hero-rays" aria-hidden="true">
    <LightRays
      raysOrigin="top-center"
      raysColor="#d9f45b"
      raysSpeed={0.6}
      lightSpread={0.9}
      rayLength={1.6}
      fadeDistance={0.9}
      saturation={0.55}
      followMouse={true}
      mouseInfluence={0.06}
      noiseAmount={0.04}
      distortion={0.02}
    />
  </div>

  <div class="container hero-grid">
    <p class="label">Digital product studio — Oxford, UK</p>
    <h1 class="display">
      We design, build<br />
      &amp; <em class="serif-accent">ship</em> digital<br />
      products.
    </h1>
    <div class="hero-foot">
      <p class="lead">
        One team from first sketch to production. Websites, apps and the brand
        around them — live in weeks, not quarters.
      </p>
      <div class="hero-cta">
        <a
          href="/pricing/"
          class="btn btn-solid"
          use:magnetic
          onclick={() => posthog.capture("contact_btn_clicked")}
        >
          Build your quote <span class="arrow">→</span>
        </a>
        <a href="/#work" class="btn btn-ghost" use:magnetic
          >See what we've shipped</a
        >
      </div>
    </div>
  </div>

  <p class="scroll-hint" aria-hidden="true">( scroll )</p>
</section>

<!-- ============ MARQUEE DIVIDER ============ -->
<div class="strip" aria-hidden="true">
  <div class="strip-track">
    {#each [0, 1, 2, 3] as half (half)}
      <div class="strip-half">
        {#each marqueeLabels as label (label)}
          <span>{label}</span><span class="s-dot">✺</span>
        {/each}
      </div>
    {/each}
  </div>
</div>

<!-- ============ SERVICES ============ -->
<section id="services" class="section chapter" data-theme="light">
  <div class="container">
    <div class="section-head">
      <p class="label">01 — What we do</p>
      <h2 class="h2">
        Capabilities, <span class="serif-accent">priced honestly.</span>
      </h2>
    </div>
    <div class="service-rows-wrap">
      <ServiceRows items={rowItems} />
    </div>
    <p class="after-note">
      Every service has a page, a starting price and a scope —
      <a href="/pricing/">combine them into a quote</a> in about a minute.
    </p>
  </div>
</section>

<!-- ============ WORK ============ -->
<section id="work" class="section chapter">
  <div class="container">
    <div class="section-head">
      <p class="label">02 — Shipped</p>
      <h2 class="h2">
        Not mock-ups.<br /><span class="serif-accent">Live products.</span>
      </h2>
    </div>

    <div class="products">
      {#each products as p, i (p.url)}
        <a
          class="product"
          href={p.url}
          target="_blank"
          rel="noopener"
          onmouseenter={(e) => p.image && onProductEnter(e, p.image)}
          onmousemove={onProductMove}
          onmouseleave={onProductLeave}
        >
          <span class="p-idx">{String(i + 1).padStart(3, "0")}</span>
          <span class="p-name">{p.name}</span>
          <span class="p-meta">
            <span class="p-tag">{p.tag}</span>
            <span class="p-desc">{p.description}</span>
            <span class="p-visit">Visit site <span class="arrow">→</span></span>
          </span>
        </a>
      {/each}
    </div>

    <!-- floating preview (cursor-following) -->
    <div class="product-preview" bind:this={previewEl} aria-hidden="true">
      {#if activeImage}
        <img src={activeImage} alt="" bind:this={previewImg} />
      {/if}
    </div>
  </div>

  <!-- stats -->
  <div class="container stats">
    {#each stats as stat (stat.label)}
      <div class="stat">
        <span class="stat-value">0</span>
        <span class="stat-label">{stat.label}</span>
      </div>
    {/each}
  </div>
</section>

<!-- ============ PROCESS ============ -->
<section id="process" class="section chapter" data-theme="light">
  <div class="container">
    <div class="section-head">
      <p class="label">03 — How we work</p>
      <h2 class="h2">
        Four steps. <span class="serif-accent">No theatre.</span>
      </h2>
    </div>
    <div class="steps">
      {#each steps as step (step.n)}
        <div class="step">
          <span class="step-n">{step.n}</span>
          <h3>{step.t}</h3>
          <p>{step.d}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ============ CTA ============ -->
<section class="cta-band">
  <div class="container cta-inner">
    <h2 class="display">Let's <em class="serif-accent">price it.</em></h2>
    <p>
      Pick your services, watch the number add up, book the call. About a
      minute.
    </p>
    <a href="/pricing/" class="btn cta-btn" use:magnetic
      >Build your quote <span class="arrow">→</span></a
    >
  </div>
</section>

<style>
  /* ---------- hero ---------- */
  .hero {
    min-height: 100svh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: clamp(3rem, 6vh, 5rem);
    overflow: clip;
  }

  .hero-rays {
    position: absolute;
    inset: 0;
  }

  .hero-grid {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: clamp(1.5rem, 3vh, 2.5rem);
    width: 100%;
  }

  .hero h1 em {
    color: var(--accent);
  }

  .hero-foot {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 2.5rem;
    flex-wrap: wrap;
  }

  .hero-cta {
    display: flex;
    gap: 0.9rem;
    flex-wrap: wrap;
  }

  .scroll-hint {
    position: absolute;
    bottom: 1.4rem;
    left: 50%;
    transform: translateX(-50%);
    font-family: var(--font-mono);
    font-size: 0.68rem;
    letter-spacing: 0.22em;
    color: var(--fg-40);
    z-index: 2;
  }

  /* ---------- marquee strip ---------- */
  .strip {
    background: var(--accent);
    color: var(--ink);
    overflow: clip;
    padding-block: 0.9rem;
  }
  .strip-track {
    display: flex;
    width: max-content;
    /* linear is correct for a continuous marquee */
    animation: strip-scroll 24s linear infinite;
  }
  .strip-half {
    display: flex;
    align-items: center;
    gap: 2.25rem;
    padding-right: 2.25rem;
    font-weight: 500;
    font-size: 1.05rem;
    letter-spacing: -0.01em;
    white-space: nowrap;
  }
  .s-dot {
    font-size: 0.8em;
  }
  @keyframes strip-scroll {
    to {
      transform: translateX(-25%);
    }
  }

  /* ---------- chapters ---------- */
  .chapter {
    padding-block: clamp(5rem, 11vw, 10rem);
  }

  .section-head {
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    margin-bottom: clamp(2.5rem, 6vw, 5rem);
  }
  .section-head .h2 {
    max-width: 22ch;
  }

  .after-note {
    margin-top: 2rem;
    font-size: 0.95rem;
    color: var(--fg-60);
  }
  .after-note a {
    color: var(--fg);
    text-decoration-color: var(--accent);
    text-underline-offset: 4px;
  }

  /* ---------- products ---------- */
  .products {
    display: flex;
    flex-direction: column;
  }

  .product {
    display: grid;
    grid-template-columns: 4rem 1fr minmax(0, 38%);
    gap: 2rem;
    align-items: start;
    padding-block: clamp(2rem, 4vw, 3.25rem);
    border-top: 1px solid var(--line);
    text-decoration: none;
    color: var(--fg);
  }
  .product:last-child {
    border-bottom: 1px solid var(--line);
  }
  /* intentional grid break — even rows push right */
  .product:nth-child(even) {
    padding-left: clamp(0px, 6vw, 7rem);
  }

  .p-idx {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--fg-40);
    padding-top: 0.9rem;
  }

  .p-name {
    font-size: clamp(2.2rem, 6vw, 5rem);
    font-weight: 500;
    letter-spacing: -0.035em;
    line-height: 0.95;
    transition: color 0.4s var(--ease-out);
  }
  .product:hover .p-name {
    color: var(--accent);
  }

  .p-meta {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    align-items: flex-start;
  }
  .p-tag {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    padding: 0.35rem 0.8rem;
    border: 1px solid var(--line);
    border-radius: 999px;
    color: var(--fg-60);
  }
  .p-desc {
    color: var(--fg-60);
    font-size: 0.98rem;
    line-height: 1.55;
  }
  .p-visit {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--fg);
  }
  .p-visit .arrow {
    display: inline-block;
    transition: transform 0.45s var(--ease-out);
  }
  .product:hover .p-visit .arrow {
    transform: translateX(5px);
  }

  /* ---------- floating preview ---------- */
  .product-preview {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    pointer-events: none;
    opacity: 0;
    transform: scale(0.85);
    will-change: transform, opacity;
    /* offset so image sits above-right of cursor */
    translate: 24px -50%;
  }
  .product-preview img {
    display: block;
    max-width: 420px;
    max-height: 420px;
    width: auto;
    height: auto;
    border-radius: 8px;
    box-shadow:
      0 16px 48px rgba(0, 0, 0, 0.45),
      0 0 0 1px rgba(255, 255, 255, 0.06);
  }

  @media (max-width: 900px) {
    .product-preview {
      display: none;
    }
  }

  /* ---------- stats ---------- */
  .stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    margin-top: clamp(4rem, 8vw, 7rem);
    padding-top: 2.5rem;
    border-top: 1px solid var(--line);
  }
  .stat {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
  .stat-value {
    font-size: clamp(2.6rem, 5.5vw, 4.5rem);
    font-weight: 500;
    letter-spacing: -0.03em;
    line-height: 1;
    color: var(--accent);
    font-variant-numeric: tabular-nums;
  }
  .stat-label {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--fg-60);
  }

  /* ---------- process ---------- */
  .steps {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: var(--line);
    border: 1px solid var(--line);
  }
  .step {
    background: var(--bg);
    padding: 2rem 1.6rem 2.6rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .step-n {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--fg-40);
  }
  .step h3 {
    font-size: 1.55rem;
    letter-spacing: -0.02em;
  }
  .step p {
    color: var(--fg-60);
    font-size: 0.95rem;
    line-height: 1.6;
  }

  /* ---------- CTA band ---------- */
  .cta-band {
    background: var(--accent);
    color: var(--ink);
    padding-block: clamp(5rem, 12vw, 10rem);
  }
  .cta-inner {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
  }
  .cta-inner p {
    font-size: 1.1rem;
    max-width: 34em;
    color: rgba(11, 11, 13, 0.72);
  }
  .cta-btn {
    background: var(--ink);
    color: var(--paper);
  }
  .cta-btn:hover {
    background: var(--paper);
    color: var(--ink);
  }

  /* ---------- responsive ---------- */
  @media (max-width: 900px) {
    .steps {
      grid-template-columns: 1fr 1fr;
    }
    .stats {
      grid-template-columns: 1fr 1fr;
    }
    .product {
      grid-template-columns: 2.4rem 1fr;
    }
    .p-meta {
      grid-column: 2;
    }
    .product:nth-child(even) {
      padding-left: 0;
    }
  }
</style>
