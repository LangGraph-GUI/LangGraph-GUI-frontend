<!-- routes/graph/menu/sidebar.svelte -->
<script lang="ts">
	import { handleUpload, handleDownload, handleCleanCache } from './FileTransmit.svelte';

	// rune-mode props
	const { open, onToggle } = $props<{
		open: boolean;
		onToggle: () => void;
	}>();

	// file-input ref for uploads
	let fileInput: HTMLInputElement;

	// open file dialog
	function triggerFileDialog(e: MouseEvent) {
		e.preventDefault();
		fileInput.click();
	}

	// download workspace ZIP
	function triggerDownload(e: MouseEvent) {
		e.preventDefault();
		handleDownload();
	}

	// clean server cache
	function triggerCleanCache(e: MouseEvent) {
		e.preventDefault();
		handleCleanCache();
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
		<ul class="list-none space-y-2">
			<!-- Upload -->
			<li>
				<a href="upload" onclick={triggerFileDialog} class="text-blue-600 hover:underline">
					File Upload
				</a>
				<input type="file" multiple bind:this={fileInput} onchange={handleUpload} class="hidden" />
			</li>

			<!-- Download -->
			<li>
				<a href="download" onclick={triggerDownload} class="text-blue-600 hover:underline">
					Download Workspace
				</a>
			</li>

			<!-- Clean Cache -->
			<li>
				<a href="clean" onclick={triggerCleanCache} class="text-blue-600 hover:underline">
					Clean Cache
				</a>
			</li>
		</ul>
	</nav>
</div>
