<!-- routes/graph/flow/nodes-control.svelte -->
<script lang="ts" module>
	import { get } from 'svelte/store';
	import { usingSubgraph, serial_numbers, currentNodes } from './graphs.store.svelte';
	import type { FlowNode } from './node-schema';
	import { screenToFlow } from '../flow/flow-position.store';

	export function AddNode(screen_x: number, screen_y: number): void {
		// This will never be null—at worst it's our fallback that returns {0,0}
		const ScreenToFlow = get(screenToFlow);
		const { x, y } = ScreenToFlow({ x: screen_x, y: screen_y });

		const key = get(usingSubgraph);
		const serial = serial_numbers.get(key) ?? 1;

		const newNode: FlowNode = {
			id: String(serial),
			type: 'textNode',
			data: {
				name: 'New Node',
				description: 'Enter description here',
				type: 'STEP'
			},
			position: { x, y }
		};

		serial_numbers.set(key, serial + 1);
		currentNodes.update((nodes) => [...nodes, newNode]);
	}
</script>
