<!-- routes/graph/menu/sidebar.svelte -->
<script lang="ts">
	import { handleUpload, handleDownload, handleCleanCache } from './FileTransmit.svelte';
	import { openRunWindow, openSidebar, openConfigWindow } from './menu.store';

	let fileInput: HTMLInputElement;

	let contentOffset = $derived($openSidebar ? 0 : -200);

	function toggleMenu(e: MouseEvent) {
		e.preventDefault();
		openSidebar.update((v) => !v);
	}

	function triggerFileDialog(e: MouseEvent) {
		e.preventDefault();
		fileInput.click();
	}

	function triggerDownload(e: MouseEvent) {
		e.preventDefault();
		handleDownload();
	}

	function triggerCleanCache(e: MouseEvent) {
		e.preventDefault();
		handleCleanCache();
	}

	function triggerRun(e: MouseEvent) {
		e.preventDefault();
		openRunWindow.set(true);
	}

	function triggerConfig(e: MouseEvent) {
		e.preventDefault();
		openConfigWindow.set(true);
	}
</script>

<div
	class="fixed top-0 left-0 z-10 h-full w-52 transform bg-white shadow-lg
    transition-transform duration-300 ease-in-out"
	style="transform: translateX({contentOffset}px)"
>
	<button
		class="absolute top-4 -right-10 h-10 w-10 cursor-pointer rounded-l-md border border-gray-300 bg-white text-2xl leading-none"
		onclick={toggleMenu}>☰</button
	>

	<nav class="p-4">
		<ul class="space-y-2">
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

			<!-- Run Window -->
			<li>
				<a href="run" onclick={triggerRun} class="text-blue-600 hover:underline"> Run </a>
			</li>

			<!-- Config Window -->
			<li>
				<a href="run" onclick={triggerConfig} class="text-blue-600 hover:underline"> Config </a>
			</li>
		</ul>
	</nav>
</div>
