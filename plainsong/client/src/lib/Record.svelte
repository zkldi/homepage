<script lang="ts">
	import type { RecMD } from "src/types";
	import RecordGraphic from "../assets/record.png";
	import FallbackSleeve from "../assets/fallback_sleeve.png";
	import RecordWeirdnessIndicator from "./RecordWeirdnessIndicator.svelte";

	function TruncateTo(str: string, len: number) {
		if (str.length < len) {
			return str;
		}

		return `${str.slice(0, len - 3)}...`;
	}

	export let record: RecMD;

	let hovered = false;

	function HandleImgLoadErr() {
		console.log("erred on" + record.info.title);

		if (this.src !== FallbackSleeve) {
			this.src = FallbackSleeve;
		}
	}

	$: listenUrl = `https://www.youtube.com/results?search_query=${(
		record.info.artist +
		" " +
		record.info.title
	).replace(/ /g, "+")}`;
</script>

<div class="record">
	<div
		class="record-sleeve"
		on:mouseenter={() => (hovered = true)}
		on:mouseleave={() => (hovered = false)}
		target="_blank"
		on:click={() => window.open(listenUrl, "_blank")}
	>
		<img
			class="record-sleeve-graphic"
			width="100%"
			height="100%"
			on:error={HandleImgLoadErr}
			src={record.info.art_path}
			alt={"no image: " + record.info.title}
		/>
		<img
			class={`record-inner-spinny ${
				hovered ? " record-inner-slideout" : "record-inner"
			}`}
			src={RecordGraphic}
			width="100%"
			height="100%"
			alt={"record"}
		/>
	</div>

	<h4>{record.info.title}</h4>
	<h5>{TruncateTo(record.info.artist, 50)}</h5>
	<RecordWeirdnessIndicator weirdness={record.info.weirdness} />
</div>

<style>
	.record-sleeve {
		width: 8rem;
		height: 8rem;
		margin-right: auto;
		margin-left: auto;
		margin-bottom: 0.4rem;
		transition: cubic-bezier(0.075, 0.82, 0.165, 1);
		transition-duration: 1s;
		z-index: 3;
	}

	/* large devices */
	@media (min-width: 480px) {
		.record-sleeve {
			width: 13rem;
			height: 13rem;
		}

		.record-sleeve:hover {
			/* width: 14rem;
			height: 14rem; */
			cursor: pointer;
		}

		.record {
			max-width: 14rem;
		}
	}

	.record-sleeve-graphic {
		box-shadow: 1px 5px 10px 3px black;
	}

	.record-inner-slideout {
		position: relative;
		z-index: -1;
		transform: translate(0px -18rem);
		transition: cubic-bezier(0.19, 0.3, 0.22, 1);
		transition-duration: 1s;
	}

	.record-inner {
		position: relative;
		z-index: -1;
		transform: translate(0px -13rem);
		transition: cubic-bezier(0.19, 0.3, 0.22, 1);
		transition-duration: 1s;
	}

	@keyframes rotating {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.record-inner-spinny {
		animation: rotating 10s linear infinite;
	}

	@media (max-width: 480px) {
		.record-inner-spinny {
			display: none;
		}

		.record {
			max-width: 8rem;
		}
	}

	h4 {
		margin: 0;
		width: 100%;
		overflow-x: clip;
		margin-bottom: 0.1rem;
	}

	h5 {
		margin: 0;
		width: 100%;
		overflow-x: clip;

		opacity: 0.5;
	}
</style>
