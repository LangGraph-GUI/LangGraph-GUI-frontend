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
};

export type FlowNode = Node<FlowNodeData>;

export function JsonNodeToSvelteNode(json: JsonNodeData): FlowNode {
	return {
		id: json.uniq_id,
		data: {
			name: json.name,
			label: json.description
		} as FlowNodeData,
		position: {
			x: json.ext.pos_x ?? 0,
			y: json.ext.pos_y ?? 0
		}
	};
}

export function SvelteNodeToJsonNode(node: FlowNode): JsonNodeData {
	return {
		uniq_id: node.id,
		name: node.data.name,
		description: node.data.label,
		nexts: [],
		type: undefined,
		tool: '',
		true_next: null,
		false_next: null,
		ext: {
			pos_x: node.position.x,
			pos_y: node.position.y,
			width: undefined,
			height: undefined,
			info: null
		}
	};
}
