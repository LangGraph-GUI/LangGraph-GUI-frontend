<!-- src/routes/graph/menu/RunWindow.svelte -->
<script lang="ts">
	import { openRunWindow } from './menu.store';

	// local UI state
	let isRunning = false;
	let responseMessage = '';

	// stub handlers
	function handleRun() {
		// …your run/upload logic here…
	}

	function handleLeave() {
		openRunWindow.set(false);
	}
</script>

{#if $openRunWindow}
	<div class="bg-opacity-50 fixed inset-0 z-11 flex items-center justify-center">
		<div class="flex h-4/5 w-4/5 flex-col rounded bg-white p-5 shadow-md">
			<h2 class="mb-4 text-lg font-bold">Run Script</h2>

			<div class="mb-4 flex justify-end">
				<button
					onclick={handleRun}
					disabled={isRunning}
					class={`mr-2 rounded px-4 py-2 font-bold text-white ${
						isRunning ? 'cursor-not-allowed bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'
					}`}
				>
					Run
				</button>
				<button
					onclick={handleLeave}
					disabled={isRunning}
					class={`rounded px-4 py-2 font-bold text-white ${
						isRunning ? 'cursor-not-allowed bg-gray-400' : 'bg-orange-500 hover:bg-orange-700'
					}`}
				>
					Leave
				</button>
			</div>

			<div class="mt-4 flex-1 overflow-y-auto rounded bg-gray-100 p-2">
				<pre class="whitespace-pre-wrap text-black">{responseMessage}</pre>
			</div>
		</div>
	</div>
{/if}
