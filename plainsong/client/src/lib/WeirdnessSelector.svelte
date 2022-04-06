<script lang="ts">
	import type { Weirdness } from "../types";
	import RecordWeirdnessIndicator from "./RecordWeirdnessIndicator.svelte";

	export let selectedWeirdnesses: Set<Weirdness> = new Set();
</script>

<div class="weirdness-container">
	{#each [0, 1, 2, 3] as w}
		<button
			on:click={() => {
				if (selectedWeirdnesses.has(w)) {
					selectedWeirdnesses.delete(w);
				} else {
					selectedWeirdnesses.add(w);
				}

				selectedWeirdnesses = selectedWeirdnesses;
			}}
			class={"weirdness " +
				(selectedWeirdnesses.has(w) ? "selected" : "not-selected")}
		>
			{#if w === 0}
				Not Spicy
			{:else}
				<RecordWeirdnessIndicator weirdness={w} />
			{/if}
		</button>
	{/each}
</div>

<style>
	.weirdness-container {
		display: flex;
		justify-content: center;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.weirdness {
		background-color: black;
		border: 1px solid gray;
		color: white;
		min-width: 6rem;
		font-size: medium !important;
	}

	.not-selected {
		opacity: 0.3;
	}
</style>
