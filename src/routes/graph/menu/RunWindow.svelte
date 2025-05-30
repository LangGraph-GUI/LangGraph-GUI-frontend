<!-- src/routes/graph/menu/RunWindow.svelte -->
<script lang="ts">
	import { openRunWindow, username, llmModel, apiKey } from './menu.store';
	import { get } from 'svelte/store';
	import { graphs } from '../flow/graphs.store.svelte';

	import type { ExportedGraph } from '../flow/graphs-algo.svelte';
	import { GraphsToJson } from '../flow/graphs-algo.svelte';

	const SERVER_URL = import.meta.env.VITE_BACKEND_URL;

	// local UI state
	let isRunning = $state(false);
	let responseMessage = $state('');

	async function handleRun() {
		isRunning = true;
		responseMessage = '';

		try {
			// 1. serialize your graphs
			const gm = get(graphs);
			const workflowJsonArray: ExportedGraph[] = GraphsToJson(gm);
			const jsonString = JSON.stringify(workflowJsonArray, null, 2);

			// 2. wrap in a File object
			const blob = new Blob([jsonString], { type: 'application/json' });
			const workflowFile = new File([blob], 'workflow.json', {
				type: 'application/json'
			});

			// 3. put it in FormData under "files"
			const formData = new FormData();
			formData.append('files', workflowFile);

			// 4. POST to your existing upload endpoint
			const user = get(username);
			let res = await fetch(`${SERVER_URL}/upload/${encodeURIComponent(user)}`, {
				method: 'POST',
				body: formData
			});

			if (!res.ok) {
				// parse server error payload if it sent JSON
				let errMsg = res.statusText;
				try {
					const err = await res.json();
					errMsg = err.error || errMsg;
				} catch (err) {
					responseMessage = err instanceof Error ? err.message : `${err}`;
				}
				throw new Error(`Upload failed: ${errMsg}`);
			}

			// 5. now call /run with JSON payload
			const payload = {
				username: user,
				llm_model: get(llmModel),
				api_key: get(apiKey)
			};

			res = await fetch(`${SERVER_URL}/run/${encodeURIComponent(user)}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			});

			if (!res.ok || !res.body) {
				const text = await res.text();
				throw new Error(`Run failed: ${text || res.statusText}`);
			}

			// 6. stream the response
			const reader = res.body.getReader();
			const decoder = new TextDecoder();
			let done = false;
			let buffer = '';

			while (!done) {
				const { value, done: doneReading } = await reader.read();
				done = doneReading;
				if (value) {
					buffer += decoder.decode(value, { stream: true });
					// update UI as chunks arrive
					responseMessage = buffer;
				}
			}

			// final decode (in case any remains)
			buffer += decoder.decode();
			responseMessage = buffer;
		} catch (err) {
			responseMessage = err instanceof Error ? err.message : `${err}`;
		} finally {
			isRunning = false;
		}
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
