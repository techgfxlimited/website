<script>
  import { onMount } from "svelte";
  import posthog from "posthog-js";
  let mounted = false;
  let scrollY;
  let headerVisible = false;

  onMount(() => {
    mounted = true;
  });

  function handleScroll(event) {
    scrollY = window.scrollY;
    headerVisible = scrollY > 100;
  }

  const services = [
    {
      title: "Web Application Design & Development",
      icon: "🌐",
      description: "Custom web solutions built with cutting-edge technologies",
    },
    {
      title: "Mobile App Development",
      icon: "📱",
      description: "Native and cross-platform apps for iOS and Android",
    },
    {
      title: "E-commerce Solutions",
      icon: "🛍️",
      description: "Custom platforms & seamless integrations",
    },
    {
      title: "Cloud & Infrastructure",
      icon: "☁️",
      description: "Secure cloud solutions and DevOps practices",
    },
    {
      title: "Branding & Graphic Design",
      icon: "🎨",
      description: "Compelling visual identities and UI/UX design",
    },
    {
      title: "IT Project Management",
      icon: "📊",
      description: "Expert guidance and project delivery",
    },
  ];
</script>

<svelte:window on:scroll={handleScroll} />

<svelte:head>
  <title>TechGFX Technologies - Innovative Tech Solutions</title>
</svelte:head>

<header class="header" class:visible={headerVisible}>
  <div class="container">
    <nav>
      <div class="logo-container">
        <img src="/favicon.png" alt="TechGFX" class="logo-image" />
        <div class="logo-text">TechGFX Technologies</div>
      </div>
      <ul class="nav-links">
        <li><a href="#services">Services</a></li>
        <li><a href="#why-us">Why Us</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </div>
</header>

<section class="hero">
  <div class="hero-background"></div>
  <div class="container">
    <div class="logo-hero">
      <img src="donut.webp" alt="TechGFX" class="hero-logo" />
    </div>
    <h1>Transform Your Business with Full-Cycle Tech Expertise</h1>
    <p>From concept to deployment, we deliver scalable digital solutions.</p>
    <a
      on:click={() => posthog.capture("contact_btn_clicked")}
      href="#contact"
      class="btn btn-primary">Schedule a Free Consultation</a
    >
  </div>
</section>

<section id="services" class="section services">
  <div class="container">
    <h2>Our Expertise</h2>
    <div class="services-grid">
      {#each services as service, i}
        <div class="service-card" style="animation-delay: {i * 0.1}s">
          <span class="service-icon">{service.icon}</span>
          <h3 class="mb-3">{service.title}</h3>
          <p>{service.description}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<section id="why-us" class="section why-us">
  <div class="container">
    <h2>Why Choose Us</h2>
    <div class="features-grid">
      <div class="feature">
        <h3 class="mb-3">10+ Years Industry Experience</h3>
        <p>Proven track record of successful project delivery</p>
      </div>
      <div class="feature">
        <h3 class="mb-3">Agile Development Process</h3>
        <p>Flexible and efficient project management</p>
      </div>
      <div class="feature">
        <h3 class="mb-3">24/7 Technical Support</h3>
        <p>Round-the-clock assistance for your needs</p>
      </div>
      <div class="feature">
        <h3 class="mb-3">Client-Centric Approach</h3>
        <p>Your success is our priority</p>
      </div>
    </div>
  </div>
</section>

<section id="contact" class="section contact">
  <div class="container">
    <h2>Get in Touch</h2>
    <div class="contact-content">
      <div class="contact-info">
        <p>📍 Northampton, United Kingdom</p>
        <a href="tel:+447955624268" class="link">📞 +44 795 562 4268</a>
        <a href="mailto:info@techgfxlimited.com" class="link"
          >✉️ info@techgfxlimited.com</a
        >
        <div class="social-links">
          <a
            href="https://www.linkedin.com/in/chukwuemeka-anyakora/"
            target="_blank"
            rel="noopener">LinkedIn</a
          >
          <a
            href="https://www.instagram.com/techgfx_"
            target="_blank"
            rel="noopener">Instagram</a
          >
          <a
            href="https://github.com/techgfxlimited"
            target="_blank"
            rel="noopener">GitHub</a
          >
        </div>
      </div>
    </div>
  </div>
</section>

<footer class="footer">
  <div class="container">
    <p>&copy; {new Date().getFullYear()} TechGFX Technologies Limited</p>
  </div>
</footer>

<style>
  :global(html) {
    scroll-behavior: smooth;
  }

  .link {
    color: white;
    text-decoration: none;
  }

  .mb-3 {
    margin-bottom: 1rem;
  }

  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding: 1rem 0;
    transform: translateY(-100%);
    transition: all 0.3s ease;
  }

  .header.visible {
    transform: translateY(0);
    background: rgba(18, 18, 18, 0.8);
    backdrop-filter: blur(20px);
  }

  .logo-container {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .logo-image {
    height: 40px;
    width: auto;
  }

  .hero-logo {
    height: 120px;
    width: auto;
    margin-bottom: 2rem;
    animation: logoFloat 6s ease-in-out infinite;
  }

  @keyframes logoFloat {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  .hero-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at 50% 50%,
      rgba(241, 155, 35, 0.15),
      rgba(231, 113, 152, 0.15),
      rgba(18, 18, 18, 0.9)
    );
    filter: blur(60px);
    z-index: -1;
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo-text {
    font-size: 1.5rem;
    font-weight: 700;
    background: linear-gradient(
      135deg,
      var(--color-primary),
      var(--color-secondary)
    );
    -webkit-background-clip: text;
    color: transparent;
  }

  .nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav-links a {
    color: var(--color-text);
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .nav-links a:hover {
    color: var(--color-primary);
  }

  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    padding: 6rem 0;
  }

  .hero h1 {
    font-size: 3.5rem;
    line-height: 1.2;
    margin-bottom: 1.5rem;
    max-width: 800px;
  }

  .hero p {
    font-size: 1.25rem;
    margin-bottom: 2rem;
    color: var(--color-text-muted);
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }

  .service-card {
    background: rgba(26, 26, 26, 0.5);
    backdrop-filter: blur(10px);
    padding: 2rem;
    border-radius: 1rem;
    transition: transform 0.3s ease;
    animation: fadeUp 0.6s ease forwards;
    opacity: 0;
  }

  .service-card:hover {
    transform: translateY(-5px);
  }

  .service-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    display: block;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }

  .feature {
    padding: 2rem;
    background: rgba(26, 26, 26, 0.5);
    backdrop-filter: blur(10px);
    border-radius: 1rem;
    transition: transform 0.3s ease;
  }

  .feature:hover {
    transform: translateY(-5px);
  }

  .contact-content {
    margin-top: 3rem;
    text-align: center;
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  .social-links {
    margin-top: 2rem;
    display: flex;
    gap: 1rem;
  }

  .social-links a {
    color: var(--color-text-muted);
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .social-links a:hover {
    color: var(--color-primary);
  }

  .footer {
    padding: 2rem 0;
    text-align: center;
    background: transparent;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    background: linear-gradient(
      135deg,
      var(--color-primary),
      var(--color-secondary)
    );
    -webkit-background-clip: text;
    color: transparent;
    text-align: center;
  }

  @media (max-width: 768px) {
    .hero h1 {
      font-size: 2.5rem;
    }

    .nav-links {
      display: none;
    }

    .hero-logo {
      height: 80px;
    }
  }
</style>
