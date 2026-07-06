// Single source of truth for TechGFX services.
// Prices are indicative starting points — edit freely as offers change.
export const services = [
	{
		slug: 'website',
		short: 'Websites',
		name: 'Website Design & Development',
		icon: '🌐',
		tagline: 'Fast, beautiful websites that convert visitors into customers.',
		price: 2500,
		priceNote: 'starting from',
		description:
			'We design and build responsive, high-performance websites tailored to your brand. From marketing sites to content-driven platforms, every build is optimised for speed, SEO, and conversions.',
		deliverables: [
			'Custom UI/UX design in Figma',
			'Responsive build for mobile, tablet & desktop',
			'On-page SEO & performance optimisation',
			'CMS integration (headless or traditional)',
			'Analytics & tracking setup',
			'Post-launch support window'
		],
		timeline: '3-6 weeks depending on scope'
	},
	{
		slug: 'web-app',
		short: 'Web apps',
		name: 'Web Application Development',
		icon: '🧩',
		tagline: 'Custom web apps engineered for scale and reliability.',
		price: 6000,
		priceNote: 'starting from',
		description:
			'We architect and build bespoke web applications — dashboards, internal tools, customer portals — using modern frameworks. Built API-first so your product can grow without a rewrite.',
		deliverables: [
			'Technical discovery & architecture plan',
			'Custom UI component library',
			'Backend API & database design',
			'Authentication & role-based access',
			'CI/CD pipeline & cloud deployment',
			'Documentation & handover'
		],
		timeline: '6-12 weeks depending on scope'
	},
	{
		slug: 'mobile-app',
		short: 'Mobile apps',
		name: 'Mobile App Development',
		icon: '📱',
		tagline: 'Native-feel apps for iOS and Android from one codebase.',
		price: 7500,
		priceNote: 'starting from',
		description:
			'We design and develop cross-platform mobile apps that feel native, ship fast, and are easy to maintain. From MVP to App Store launch, we handle the full product lifecycle.',
		deliverables: [
			'UX wireframes & UI design system',
			'Cross-platform build (iOS & Android)',
			'Push notifications & offline support',
			'App Store & Play Store submission',
			'Crash reporting & analytics integration',
			'Ongoing maintenance plan'
		],
		timeline: '8-14 weeks depending on scope'
	},
	{
		slug: 'ecommerce',
		short: 'E-commerce',
		name: 'E-commerce Solutions',
		icon: '🛍️',
		tagline: 'Online stores built to sell, not just to look good.',
		price: 4500,
		priceNote: 'starting from',
		description:
			'We build custom e-commerce experiences with seamless checkout, inventory management, and payment integrations — designed to maximise conversion at every step of the funnel.',
		deliverables: [
			'Storefront design & UX for conversion',
			'Payment gateway integration (Stripe & more)',
			'Product & inventory management setup',
			'Order fulfilment & shipping workflows',
			'Discounts, bundles & upsell logic',
			'Launch checklist & training'
		],
		timeline: '4-8 weeks depending on scope'
	},
	{
		slug: 'branding',
		short: 'Branding',
		name: 'Branding, Logo & Graphic Design',
		icon: '🎨',
		tagline: 'A visual identity your audience remembers.',
		price: 900,
		priceNote: 'starting from',
		description:
			'We craft distinctive brand identities — logo, colour system, typography, and templates — so your business looks credible and consistent everywhere it shows up.',
		deliverables: [
			'Logo design & variations',
			'Colour palette & typography system',
			'Brand guidelines document',
			'Social media & marketing templates',
			'Business card & stationery design',
			'Source files in all formats'
		],
		timeline: '2-4 weeks depending on scope'
	},
	{
		slug: 'cloud',
		short: 'Cloud & DevOps',
		name: 'Cloud & DevOps',
		icon: '☁️',
		tagline: 'Infrastructure that scales quietly in the background.',
		price: 3000,
		priceNote: 'starting from',
		description:
			'We design and manage cloud infrastructure, CI/CD pipelines, and monitoring so your systems stay fast, secure, and available — without you having to think about servers.',
		deliverables: [
			'Cloud architecture design (AWS/GCP/Azure)',
			'CI/CD pipeline setup',
			'Containerisation & orchestration',
			'Monitoring, logging & alerting',
			'Security hardening & backups',
			'Cost optimisation review'
		],
		timeline: '2-6 weeks depending on scope'
	}
];

export default services;
