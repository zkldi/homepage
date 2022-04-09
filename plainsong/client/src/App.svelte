<script lang="ts">
	import Filters from "./lib/Filters.svelte";
	import Modal from "svelte-simple-modal";

	import RecordShelves from "./lib/RecordShelves.svelte";
	import { FilterInstructions, Weirdness } from "./types";

	const fetchingData = fetch(
		import.meta.env.DEV
			? "src/assets/parsed-recmds.json"
			: "assets/parsed-recmds.json"
	).then((r) => r.json());

	const DEFAULT_FILTER_INSTRUCTIONS: FilterInstructions = {
		excludedGenres: [],
		weirdnesses: new Set([Weirdness.NOT_WEIRD, Weirdness.SORTA_WEIRD]),
	};

	let filterInstructions = DEFAULT_FILTER_INSTRUCTIONS;
</script>

<Modal>
	<main>
		<h1>plainsong</h1>
		<p>
			Here's all of my favourite music. Maybe you'll find some stuff here
			you like too!
			<br />
			Clicking on any record will open a new tab for you to listen to it in.
		</p>

		<hr />

		<Filters bind:filterInstructions />

		<hr />

		{#await fetchingData}
			<p>Fetching Records...</p>
		{:then response}
			<h1>10/10s</h1>
			<p>
				The stuff here is all stuff I <i>really</i> love. All of these are
				perfect in my opinion.
			</p>
			<RecordShelves
				records={response.recs.filter((e) => e.info.loved)}
				{filterInstructions}
			/>
			<hr />
			<h1>9/10s</h1>
			<p>
				I love all the stove here too, 9/10 is still immensely positive!
			</p>
			<RecordShelves
				records={response.recs.filter((e) => !e.info.loved)}
				{filterInstructions}
			/>
		{:catch err}
			<p>Couldn't fetch records. That sucks.</p>
		{/await}
	</main>
</Modal>

<style>
	:root {
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
			Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
		background: #141414;
		color: white;
	}

	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}

	h1 {
		text-transform: uppercase;
		font-size: 3rem;
		font-weight: 100;
		line-height: 1.1;
		margin: 2rem auto;
	}

	p {
		margin: 1rem auto;
		line-height: 1.35;
	}

	@media (min-width: 480px) {
		h1 {
			max-width: none;
		}

		p {
			max-width: none;
		}
	}
</style>
