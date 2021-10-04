import {writable} from 'svelte/store';

export let ip = writable(null);
export let port = writable(null);