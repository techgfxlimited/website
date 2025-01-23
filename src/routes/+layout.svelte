<script>
	import '../app.css';
	import posthog from 'posthog-js'
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	onMount(() => {
	if (browser) {
		posthog.init(
		'phc_LeeD9hLDGR5lEZiVHVCAWb3wofNaBhh07RvEGumBA2U',
		{ 
			api_host: 'https://eu.i.posthog.com',
			person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
			}
		);
	}
	return;
});
</script>

<div class="app">
	<slot />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>