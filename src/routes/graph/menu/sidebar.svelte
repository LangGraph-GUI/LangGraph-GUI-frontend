<!-- routes/graph/menu/sidebar.svelte -->
<script lang="ts">
	// Receive the open state and a toggle callback from the parent
	export let open: boolean;
	export let onToggle: () => void;
	import { usingSubgraph } from '../flow/graph-store.svelte'; // Import the store
	import { saveGraph, loadGraph } from './json-io.svelte';
</script>

<div class="sidebar {open ? 'open' : ''}">
	<button class="toggle-btn" on:click={onToggle}>☰</button>
	<nav>
		<ul>
			<li><a href="#item1">Menu item 1</a></li>
			<li><a href="#item2">Menu item 2</a></li>
			<li><a href="#item3">Menu item 3</a></li>
			<li>
				<button on:click={() => usingSubgraph.set('default')}>Default Graph</button>
			</li>
			<li>
				<button on:click={() => usingSubgraph.set('anotherKey')}>Another Graph</button>
			</li>
			<li>
				<button on:click={saveGraph}>Save Graph</button>
			</li>
			<li>
				<button on:click={loadGraph}>Load Graph</button>
			</li>
		</ul>
	</nav>
</div>

<style>
	.sidebar {
		position: absolute;
		top: 0;
		left: 0;
		width: 200px;
		height: 100%;
		background: #fff;
		box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
		transform: translateX(-200px);
		transition: transform 0.3s ease;
		z-index: 10;
	}
	.sidebar.open {
		transform: translateX(0);
	}
	.toggle-btn {
		position: absolute;
		top: 16px;
		right: -40px;
		width: 40px;
		height: 40px;
		background: #fff;
		border: 1px solid #ccc;
		border-radius: 4px 0 0 4px;
		font-size: 24px;
		line-height: 1;
		cursor: pointer;
	}
	nav ul {
		list-style: none;
		padding: 1rem;
	}
	nav li + li {
		margin-top: 0.5rem;
	}
	button {
		cursor: pointer; /* Makes the button appear clickable */
		padding: 0.5rem 1rem; /* Adds some padding for better appearance */
		border: 1px solid #ccc; /* Optional: Adds a border */
		border-radius: 4px; /* Optional: Rounds the corners */
		background-color: #f0f0f0; /* Optional:  A subtle background color */
	}
</style>
