<script lang="ts">
	import type { FilterInstructions, RecMD } from "../types";
	import Record from "./Record.svelte";

	export let records: RecMD[];
	export let filterInstructions: FilterInstructions;

	$: filteredRecords = records.filter((r) =>
		filterInstructions.weirdnesses.has(r.info.weirdness)
	);
</script>

<div class="records-main">
	{#each filteredRecords as record}
		<Record {record} />
	{/each}
	{#if filteredRecords.length === 0}
		<p>
			Looks like you've filtered everything out. Try messing with the
			buttons above.
		</p>
	{/if}
</div>

<style>
	.records-main {
		display: flex;
		justify-content: center;
		gap: 30px;
		flex-wrap: wrap;
		margin-top: 4rem;
		margin-bottom: 1.5rem;
	}

	@media (min-width: 860px) {
		.records-main {
			margin-left: 5rem;
			margin-right: 5rem;
		}
	}
</style>
