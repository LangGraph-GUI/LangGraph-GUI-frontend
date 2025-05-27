<!-- routes/graph/flow/nodes-control.svelte -->

<script lang="ts" module>
	import { get } from 'svelte/store';
	import { usingSubgraph, serial_numbers, currentNodes } from './graphs.store.svelte';
	import type { FlowNode } from './node-schema';

	export function AddNode(screen_x: number, screen_y: number): void {
		const key = get(usingSubgraph);
		let serial_number = serial_numbers.get(key) ?? 1;

		const newNode: FlowNode = {
			id: String(serial_number),
			type: 'textNode', // Or another default node type if you have one

			data: {
				name: 'New Node', // Or a more descriptive default name
				description: 'Enter description here', // Or a default description
				type: 'STEP'
			},
			position: { x: screen_x, y: screen_y }
		};

		serial_numbers.set(key, serial_number + 1);

		currentNodes.update((nodes) => [...nodes, newNode]);
	}
</script>
