import { writable, Writable } from "svelte/store";
import type { DistroInfo } from "../distros";

export const selectedDistro: Writable<DistroInfo | null> = writable(null);
