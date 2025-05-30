// routes/graph/menu/menu.store.ts

import { writable } from 'svelte/store';

export const openSidebar = writable(false);
export const openRunWindow = writable(false);
export const openConfigWindow = writable(false);

export const username = writable<string>('unknown');
export const llmModel = writable<string>('gemma3');
export const apiKey = writable<string>('type your key');
