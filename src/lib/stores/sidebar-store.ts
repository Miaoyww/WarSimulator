import { writable } from 'svelte/store';

export const leftBarPinned = writable<boolean>(false);
export const rightBarPinned = writable<boolean>(false);

