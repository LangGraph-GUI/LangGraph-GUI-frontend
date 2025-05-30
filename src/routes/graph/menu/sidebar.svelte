<!-- routes/graph/menu/sidebar.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { handleUpload } from './FileTransmit.svelte';

	// rune-mode props
	const { open, onToggle } = $props<{
		open: boolean;
		onToggle: () => void;
	}>();

	// grab your VITE_BACKEND_URL (optional logging)
	const backendUrl = import.meta.env.VITE_BACKEND_URL;
	onMount(() => {
		console.log('VITE_BACKEND_URL →', backendUrl);
	});

	// reference to the hidden file <input>
	let fileInput: HTMLInputElement;

	/** Prevent the default link behavior and open the file dialog */
	function triggerFileDialog(event: MouseEvent) {
		event.preventDefault();
		fileInput.click();
	}
</script>

<div
	class={`fixed top-0 left-0 z-10 h-full w-52 transform bg-white shadow-lg
    transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'}`}
>
	<button
		class="absolute top-4 -right-10 h-10 w-10 cursor-pointer rounded-l-md border border-gray-300 bg-white text-2xl leading-none"
		onclick={onToggle}>☰</button
	>

	<nav class="p-4">
		<ul class="list-none">
			<li class="mb-2">
				<!-- clicking this will open the file picker -->
				<a href="file-upload" onclick={triggerFileDialog} class="text-blue-600 hover:underline">
					File Upload
				</a>

				<!-- hidden file input that actually does the work -->
				<input type="file" multiple bind:this={fileInput} onchange={handleUpload} class="hidden" />
			</li>
			<li class="mb-2"><a href="#item2">Menu item 2</a></li>
			<li class="mb-2"><a href="#item3">Menu item 3</a></li>
			<li class="mb-2"><a href="#item4">Menu item 4</a></li>
		</ul>
	</nav>
</div>
