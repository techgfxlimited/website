<script>
  import { pageVisible } from "$lib/visibility";

  let {
    title = "TechGFX — We design, build & ship digital products",
    description = "TechGFX is a UK digital product studio. Websites, web apps, mobile apps, e-commerce and branding — designed, built and shipped by one team.",
    url = "https://techgfxlimited.com",
    image = "/favicon.png",
    type = "website",
    keywords = "techgfx, digital product studio, web design, web development, mobile app development, e-commerce, branding, UK, Oxford",
    schema = null,
  } = $props();

  const siteName = "TechGFX";
  const fullTitle = $derived(
    title.includes(siteName) ? title : `${title} | ${siteName}`,
  );
  const displayTitle = $derived(
    $pageVisible ? fullTitle : "Let's build something great →",
  );
  const schemaMarkup = $derived(
    schema
      ? `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}<\/script>`
      : "",
  );
</script>

<svelte:head>
  <title>{displayTitle}</title>
  <meta name="description" content={description} />
  <meta name="keywords" content={keywords} />

  <!-- Open Graph -->
  <meta property="og:site_name" content={siteName} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={url} />
  <meta property="og:image" content={image} />
  <meta property="og:type" content={type} />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />

  <!-- Canonical -->
  <link rel="canonical" href={url} />

  <!-- Schema.org JSON-LD -->
  {#if schema}
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html schemaMarkup}
  {/if}
<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "xpmu4kzenb");
</script>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-VL6FMWHB46"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-VL6FMWHB46');
</script>

</svelte:head>
