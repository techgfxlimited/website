import { error } from '@sveltejs/kit';
import { services } from '$lib/data/services.js';

export const prerender = true;

export function entries() {
	return services.map((s) => ({ slug: s.slug }));
}

export function load({ params }) {
	const service = services.find((s) => s.slug === params.slug);

	if (!service) {
		error(404, 'Service not found');
	}

	const otherServices = services.filter((s) => s.slug !== params.slug);

	return { service, otherServices };
}
