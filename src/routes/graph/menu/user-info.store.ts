// routes/graph/menu/user-info.store.ts
import { writable } from 'svelte/store';

export const username = writable<string>('unknown');
