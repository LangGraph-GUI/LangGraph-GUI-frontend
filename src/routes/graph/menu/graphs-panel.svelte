<!-- routes/graph/menu/graphs-panel.svelte -->

<script lang="ts">
	import { onMount } from 'svelte';
	import { graphs, usingSubgraph } from '../flow/graphs.store.svelte';
	import { saveGraphs, loadGraphs, saveSubGraph, loadSubGraph } from '../flow/graphs-io.svelte';
	import {
		addSubGraph,
		renameSubGraph,
		removeSubGraph,
		CleanGraphs
	} from '../flow/graphs-algo.svelte';

	let isGraphsMenuOpen = $state(false);
	let graphsMenuRef: HTMLDivElement;

	let isSubGraphMenuOpen = $state(false);
	let subGraphMenuRef: HTMLDivElement;

	const handleAddSubGraph = () => {
		addSubGraph();
		closeMenus();
	};

	const handleRenameSubGraph = () => {
		renameSubGraph();
		closeMenus();
	};

	const handleRemoveSubGraph = () => {
		removeSubGraph();
		closeMenus();
	};

	const handleNewGraphs = () => {
		CleanGraphs();
		closeMenus();
	};

	const handleLoadGraphs = () => {
		loadGraphs();
		closeMenus();
	};

	const handleSaveGraphs = () => {
		saveGraphs();
		closeMenus();
	};

	const handleLoadSubGraph = () => {
		loadSubGraph();
		closeMenus();
	};

	const handleSaveSubGraph = () => {
		saveSubGraph();
		closeMenus();
	};

	const toggleGraphMenu = () => {
		isGraphsMenuOpen = !isGraphsMenuOpen;
		isSubGraphMenuOpen = false;
	};

	const toggleSubGraphMenu = () => {
		isSubGraphMenuOpen = !isSubGraphMenuOpen;
		isGraphsMenuOpen = false;
	};

	const closeMenus = () => {
		isGraphsMenuOpen = false;
		isSubGraphMenuOpen = false;
	};

	const handleSubgraphChange = (e: Event) => {
		usingSubgraph.set((e.target as HTMLSelectElement).value);
	};

	// Close menus when clicking outside
	onMount(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				graphsMenuRef &&
				!graphsMenuRef.contains(event.target as Node) &&
				subGraphMenuRef &&
				!subGraphMenuRef.contains(event.target as Node)
			) {
				closeMenus();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	});

	//Basic classes
	let classList =
		'bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded inline-flex items-center';
</script>

<nav class="z-20 flex items-center justify-center p-2">
	<div class="relative mr-2" bind:this={graphsMenuRef}>
		<button class={classList} onclick={toggleGraphMenu}>
			Graph
			<svg class="ml-2 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
				><path
					d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
				/></svg
			>
		</button>
		{#if isGraphsMenuOpen}
			<div class="dropdown-menu absolute left-0 z-10 mt-1">
				<button class="block w-full px-4 py-2 text-left" onclick={handleNewGraphs}
					>New Graphs</button
				>
				<button class="block w-full px-4 py-2 text-left" onclick={handleLoadGraphs}
					>Load Graphs</button
				>
				<button class="block w-full px-4 py-2 text-left" onclick={handleSaveGraphs}
					>Save Graphs</button
				>
			</div>
		{/if}
	</div>

	<div class="mr-2 rounded-md bg-white px-2 py-0">
		SubGraph:
		<select
			class="dropdown-menu ml-2 rounded border py-1"
			bind:value={$usingSubgraph}
			onchange={handleSubgraphChange}
			style="font-weight: bold; background-color: rgb(225, 225, 225);"
		>
			{#each Object.keys($graphs) as name (name)}
				<option value={name}>
					{name}
				</option>
			{/each}
		</select>
	</div>
	<div class="relative" bind:this={subGraphMenuRef}>
		<button class={classList} onclick={toggleSubGraphMenu}>
			...
			<svg class="ml-2 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
				><path
					d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
				/></svg
			>
		</button>
		{#if isSubGraphMenuOpen}
			<div class="dropdown-menu absolute left-0 z-10 mt-1">
				<button class="block w-full px-4 py-2 text-left" onclick={handleAddSubGraph}
					>Add Subgraph</button
				>
				<button class="block w-full px-4 py-2 text-left" onclick={handleLoadSubGraph}
					>Load Subgraph</button
				>
				<button class="block w-full px-4 py-2 text-left" onclick={handleSaveSubGraph}
					>Save Subgraph</button
				>
				{#if $usingSubgraph !== 'root'}
					<button class="block w-full px-4 py-2 text-left" onclick={handleRenameSubGraph}
						>Rename Subgraph</button
					>
					<button class="block w-full px-4 py-2 text-left" onclick={handleRemoveSubGraph}
						>Remove Subgraph</button
					>
				{/if}
			</div>
		{/if}
	</div>
</nav>

<style>
	.dropdown-menu {
		background-color: white;
		border: 1px solid #e2e8f0;
		border-radius: 0.25rem;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
		color: black;
	}

	.dropdown-menu button {
		color: black;
		background-color: white;
	}

	.dropdown-menu button:hover {
		background-color: #f3f4f6;
	}
</style>
