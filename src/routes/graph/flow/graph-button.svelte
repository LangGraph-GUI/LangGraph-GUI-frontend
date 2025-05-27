<!-- routes/graph/flow/graph-button.svelte -->
<script lang="ts">
	import { AddNode } from './nodes-control.svelte';

	// get child content via snippet
	let { children } = $props();
	let menu = $state<{
		show: boolean;
		x: number;
		y: number;
		type: 'node' | 'edge' | 'canvas';
		elementId: string | null;
	}>({
		show: false,
		x: 0,
		y: 0,
		type: 'canvas',
		elementId: null
	});

	function handleContextMenu(event: MouseEvent) {
		event.preventDefault();

		// detect node via data-id attribute
		const Object = (event.target as HTMLElement).closest('[data-id]');
		if (Object) {
			const obj_id = Object.getAttribute('data-id');
			if (obj_id) {
				if (obj_id.startsWith('xy-edge')) {
					menu = {
						show: true,
						x: event.clientX,
						y: event.clientY,
						type: 'edge',
						elementId: obj_id
					};
				} else {
					menu = {
						show: true,
						x: event.clientX,
						y: event.clientY,
						type: 'node',
						elementId: obj_id
					};
				}
			}
		} else {
			menu = {
				show: true,
				x: event.clientX,
				y: event.clientY,
				type: 'canvas',
				elementId: null
			};
		}
	}

	function onAddNode() {
		AddNode(menu.x, menu.y);
		console.log('Add Node clicked');
		menu = { ...menu, show: false };
	}

	function onRemoveNode() {
		// TODO: implement remove node functionality
		console.log(`Remove Node clicked for node ${menu.elementId}`);
		menu = { ...menu, show: false };
	}

	function onRemoveEdge() {
		// TODO: implement remove edge functionality
		console.log(`Remove Edge clicked for edge ${menu.elementId}`);
		menu = { ...menu, show: false };
	}

	function handleClickOutside(event: MouseEvent) {
		if (menu.show) {
			const menuElement = document.querySelector('.context-menu');
			if (menuElement && !menuElement.contains(event.target as Node)) {
				menu = { ...menu, show: false };
			}
		}
	}

	$effect(() => {
		window.addEventListener('click', handleClickOutside);
		return () => {
			window.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<div class="canvas-container" role="application" oncontextmenu={handleContextMenu}>
	{@render children()}
	{#if menu.show}
		<div class="context-menu" role="menu" style="top: {menu.y}px; left: {menu.x}px;">
			{#if menu.type === 'node'}
				<button type="button" role="menuitem" onclick={onRemoveNode}>Remove Node</button>
			{:else if menu.type === 'edge'}
				<button type="button" role="menuitem" onclick={onRemoveEdge}>Remove Edge</button>
			{:else}
				<button type="button" role="menuitem" onclick={onAddNode}>Add Node</button>
			{/if}
		</div>
	{/if}
</div>

<style>
	.canvas-container {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.context-menu {
		position: absolute;
		background: white;
		border: 1px solid #888;
		padding: 0.5em;
		z-index: 10;
		border-radius: 4px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	}
	.context-menu button {
		display: block;
		width: 100%;
		padding: 0.5em;
		border: none;
		background: none;
		text-align: left;
		cursor: pointer;
	}
	.context-menu button:hover {
		background: #f0f0f0;
	}
</style>
