<!-- routes/graph/flow/graph-panel.svelte -->

<script lang="ts">
	import { onMount } from 'svelte';
	import { saveGraphs, loadGraphs } from './json-io.svelte';

	let isGraphMenuOpen = false;
	let isSubGraphMenuOpen = false;
	let graphMenuRef: HTMLDivElement;
	let subGraphMenuRef: HTMLDivElement;

	// Dummy data for subgraphs (replace with your actual data)
	let subGraphs = [{ graphName: 'root' }, { graphName: 'Graph 1' }, { graphName: 'Graph 2' }];
	let currentGraphName = 'root';

	const handleAddGraph = () => {
		// Implement your logic here (currently does nothing)
		closeMenus();
	};

	const handleRenameGraph = () => {
		// Implement your logic here (currently does nothing)
		closeMenus();
	};

	const handleRemoveGraph = () => {
		// Implement your logic here (currently does nothing)
		closeMenus();
	};

	const handleSelectGraph = (graphName: string) => {
		currentGraphName = graphName; // Update the selected graph (no actual functionality)
		closeMenus();
	};

	const handleNewGraphs = () => {
		// Implement your logic here (currently does nothing)
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
		// Implement your logic here (currently does nothing)
		closeMenus();
	};

	const handleSaveSubGraph = () => {
		// Implement your logic here (currently does nothing)
		closeMenus();
	};

	const toggleGraphMenu = () => {
		isGraphMenuOpen = !isGraphMenuOpen;
		isSubGraphMenuOpen = false;
	};

	const toggleSubGraphMenu = () => {
		isSubGraphMenuOpen = !isSubGraphMenuOpen;
		isGraphMenuOpen = false;
	};

	const closeMenus = () => {
		isGraphMenuOpen = false;
		isSubGraphMenuOpen = false;
	};

	// Close menus when clicking outside
	onMount(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				graphMenuRef &&
				!graphMenuRef.contains(event.target as Node) &&
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
	<div class="relative mr-2" bind:this={graphMenuRef}>
		<button class={classList} on:click={toggleGraphMenu}>
			Graph
			<svg class="ml-2 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
				><path
					d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
				/></svg
			>
		</button>
		{#if isGraphMenuOpen}
			<div class="dropdown-menu absolute left-0 z-10 mt-1">
				<button class="block w-full px-4 py-2 text-left" on:click={handleNewGraphs}
					>New Graphs</button
				>
				<button class="block w-full px-4 py-2 text-left" on:click={handleLoadGraphs}
					>Load Graphs</button
				>
				<button class="block w-full px-4 py-2 text-left" on:click={handleSaveGraphs}
					>Save Graphs</button
				>
			</div>
		{/if}
	</div>

	<div class="mr-2">
		SubGraph:
		<select
			class="dropdown-menu ml-2 rounded border py-0"
			bind:value={currentGraphName}
			on:change={() => handleSelectGraph(currentGraphName)}
			style="font-weight: bold;"
		>
			{#each subGraphs as graph}
				<option
					key={graph.graphName}
					value={graph.graphName}
					style="font-weight: {graph.graphName === currentGraphName ? 'bold' : 'normal'};"
				>
					{graph.graphName}
				</option>
			{/each}
		</select>
	</div>
	<div class="relative" bind:this={subGraphMenuRef}>
		<button class={classList} on:click={toggleSubGraphMenu}>
			...
			<svg class="ml-2 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
				><path
					d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
				/></svg
			>
		</button>
		{#if isSubGraphMenuOpen}
			<div class="dropdown-menu absolute left-0 z-10 mt-1">
				<button class="block w-full px-4 py-2 text-left" on:click={handleAddGraph}
					>Add Subgraph</button
				>
				<button class="block w-full px-4 py-2 text-left" on:click={handleLoadSubGraph}
					>Load Subgraph</button
				>
				<button class="block w-full px-4 py-2 text-left" on:click={handleSaveSubGraph}
					>Save Subgraph</button
				>
				{#if currentGraphName !== 'root'}
					<button class="block w-full px-4 py-2 text-left" on:click={handleRenameGraph}
						>Rename Subgraph</button
					>
					<button class="block w-full px-4 py-2 text-left" on:click={handleRemoveGraph}
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
