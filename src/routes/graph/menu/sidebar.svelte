<!-- routes/graph/menu/sidebar.svelte -->
<script lang="ts">
	import { handleUpload, handleDownload, handleCleanCache } from './FileTransmit.svelte';
	import { openRunWindow, openSidebar, openConfigWindow } from './menu.store';
	import { OpenDoc } from '../../doc/open-doc.svelte';

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

	function triggerDoc(e: MouseEvent) {
		e.preventDefault();
		OpenDoc();
	}
</script>

<div class="relative flex min-h-screen">
	{#if !$openSidebar}
		<button
			class="absolute top-4 left-4 z-20 rounded-md border border-gray-300 bg-white p-2 shadow hover:bg-gray-100 focus:outline-none"
			onclick={toggleMenu}>☰</button
		>
	{/if}

	<!-- SLIDING SIDEBAR -->
	<div
		class="fixed top-0 left-0 z-10 h-full w-52 bg-white shadow-lg transition-transform duration-300 ease-in-out"
		style="transform: translateX({contentOffset}px);"
	>
		<!-- CLOSE BUTTON -->
		<div class="flex justify-end p-4">
			<button
				class="rounded-md border border-gray-300 bg-white p-1 shadow-sm hover:bg-gray-50 focus:outline-none"
				onclick={toggleMenu}>«</button
			>
		</div>

		<!-- NAV -->
		<nav class="space-y-3 px-4">
			<!-- Upload -->
			<div>
				<button
					class="w-full rounded bg-blue-300 px-3 py-2 text-left text-white hover:bg-blue-400"
					onclick={triggerFileDialog}>File Upload</button
				>
				<input type="file" multiple bind:this={fileInput} onchange={handleUpload} class="hidden" />
			</div>

			<!-- Download -->
			<button
				class="w-full rounded bg-blue-300 px-3 py-2 text-left text-white hover:bg-blue-400"
				onclick={triggerDownload}>Download Workspace</button
			>

			<!-- Clean Cache -->
			<button
				class="w-full rounded bg-blue-300 px-3 py-2 text-left text-white hover:bg-blue-400"
				onclick={triggerCleanCache}>Clean Cache</button
			>

			<!-- Run -->
			<button
				class="w-full rounded bg-purple-400 px-3 py-2 text-left text-white hover:bg-purple-500"
				onclick={triggerRun}>Run</button
			>

			<!-- Config -->
			<button
				class="w-full rounded bg-gray-300 px-3 py-2 text-left text-white hover:bg-gray-400"
				onclick={triggerConfig}>Config</button
			>

			<!-- Documentation -->
			<button
				class="w-full rounded bg-gray-300 px-3 py-2 text-left text-white hover:bg-gray-400"
				onclick={triggerDoc}>Documentation</button
			>
		</nav>
	</div>

	<!-- MAIN CONTENT: shifts over when sidebar opens -->
	<div class="content-area flex-1" style="margin-left: {$openSidebar ? '200px' : '0'};"></div>
</div>

<style>
	/* Smooth content shift when sidebar opens/closes */
	.content-area {
		transition: margin-left 0.3s ease-in-out;
	}
</style>
