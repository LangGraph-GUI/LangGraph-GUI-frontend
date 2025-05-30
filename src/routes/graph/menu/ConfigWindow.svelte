<!-- src/routes/graph/menu/ConfigWindow.svelte -->
<script lang="ts">
	import { get } from 'svelte/store';
	import { openConfigWindow, username, llmModel, apiKey } from './menu.store';

	// Initialize local copies from the stores
	let llmModelValue = $state(get(llmModel));
	let apiKeyValue = $state(get(apiKey));

	function handleSave() {
		// Update stores
		llmModel.set(llmModelValue);
		apiKey.set(apiKeyValue);
		// Persist for next load
		localStorage.setItem('llmModel', llmModelValue);
		localStorage.setItem('apiKey', apiKeyValue);
		// Close modal
		openConfigWindow.set(false);
	}

	function handleCancel() {
		openConfigWindow.set(false);
	}
</script>

{#if $openConfigWindow}
	<div class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center">
		<div class="w-96 rounded-lg bg-white p-6 shadow-lg">
			<h2 class="mb-4 text-xl font-semibold">Settings</h2>

			<!-- Username (read-only) -->
			<div class="mb-3">
				<label for="username" class="mb-1 block text-sm">Username:</label>
				<input
					type="text"
					id="username"
					bind:value={$username}
					readonly
					class="w-full cursor-not-allowed rounded border border-gray-300 bg-gray-100 p-2 text-gray-600"
				/>
			</div>

			<!-- LLM model -->
			<div class="mb-3">
				<label for="llmModel" class="mb-1 block text-sm">LLM model:</label>
				<input
					type="text"
					id="llmModel"
					bind:value={llmModelValue}
					class="w-full rounded border border-gray-300 p-2 focus:outline-none"
				/>
			</div>

			<!-- API Key -->
			<div class="mb-4">
				<label for="apiKey" class="mb-1 block text-sm">API key:</label>
				<input
					type="text"
					id="apiKey"
					bind:value={apiKeyValue}
					class="w-full rounded border border-gray-300 p-2 focus:outline-none"
				/>
			</div>

			<!-- Actions -->
			<div class="flex justify-end space-x-2">
				<button
					onclick={handleSave}
					class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
				>
					Save
				</button>
				<button
					onclick={handleCancel}
					class="rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700"
				>
					Cancel
				</button>
			</div>
		</div>
	</div>
{/if}
