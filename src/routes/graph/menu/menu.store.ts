// routes/graph/menu/menu.store.ts

import { writable } from 'svelte/store';

export const openSidebar = writable(false);
export const openRunWindow = writable(false);
export const username = writable<string>('unknown');
