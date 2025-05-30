<script lang="ts" module>
	// Import the `browser` object from '$app/environment'
	// This allows us to check if we're running in a browser environment.
	import { browser } from '$app/environment';

	export function OpenDoc() {
		// Check if we are in a browser environment.  Trying to use `window` server-side will crash.
		if (browser) {
			// Open a new tab and browse to the specified URL.
			window.open('https://langgraph-gui.github.io/', '_blank');
		} else {
			// Handle the case where we are not in a browser (e.g., server-side rendering).
			console.warn('Cannot open a new tab outside of a browser environment.');
		}
	}
</script>
