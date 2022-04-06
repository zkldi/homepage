<script lang="ts">
	import type { FilterInstructions } from "../types";
	import WeirdnessSelector from "./WeirdnessSelector.svelte";
	import { getContext } from "svelte";
	import SpiceExplanation from "./SpiceExplanation.svelte";

	const { open } = getContext("simple-modal");

	export let filterInstructions: FilterInstructions;
</script>

<div class="filter-main">
	<WeirdnessSelector
		bind:selectedWeirdnesses={filterInstructions.weirdnesses}
	/>
</div>
<a href="#" on:click={() => open(SpiceExplanation)}>What do the chilies mean?</a
>

<style>
	.filter-main {
		display: flex;
		justify-content: center;
		margin-bottom: 1rem;
	}

	a {
		color: white;
	}
</style>
