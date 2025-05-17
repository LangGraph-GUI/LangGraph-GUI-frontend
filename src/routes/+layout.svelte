<!-- routes/+layout.svelte -->
<script>
	import '../app.css'; // Import global styles
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	// Theme settings (using signals for reactivity)
	const copyrightYear = new Date().getFullYear();
	const projectName = 'LangGraph-GUI';
	const copyrightOwner = 'HomunMage';
	const theme = writable({
		primaryColor: 'bg-gray-100',
		textColor: 'text-gray-600',
		borderColor: 'border-gray-300',
		linkColor: 'text-blue-500 hover:text-blue-700'
	});

	setContext('theme', theme); // Provide theme to descendants

	let { children } = $props(); // Svelte 5 props
</script>

<svelte:head>
	<link rel="icon" href="https://langgraph-gui.github.io/index.webp" />
</svelte:head>

<div class="flex min-h-screen flex-col">
	<main class="flex-grow">
		{@render children()}
	</main>

	<footer
		class="{$theme.primaryColor} py-0 text-center {$theme.borderColor} border-t text-sm {$theme.textColor}"
	>
		{projectName} © {copyrightYear}
		{copyrightOwner}
	</footer>
</div>
