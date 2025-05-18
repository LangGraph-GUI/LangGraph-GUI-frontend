// lib/graph/node-data.ts

export interface JsonNodeData {
	uniq_id: string;
	name: string;
	description: string;
	nexts: string[];
	type?: string;
	tool: string;
	true_next: string | null;
	false_next: string | null;
	ext: {
		pos_x?: number;
		pos_y?: number;
		width?: number;
		height?: number;
		info?: string | null;
	};
}

import type { Node } from '@xyflow/svelte';

export type FlowNodeData = {
	label: string;
	name: string;
	description: string;
};

export type FlowNode = Node<FlowNodeData>;
