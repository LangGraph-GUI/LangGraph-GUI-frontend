// src/routes/graph/flow/flow-position.store.ts
import { writable } from 'svelte/store';
import type { XYPosition } from '@xyflow/svelte';

// Initialize with a function that always returns {0,0}
export const screenToFlow = writable<(p: XYPosition) => XYPosition>(() => ({ x: 0, y: 0 }));
