<script lang="ts">
	import { onMount } from "svelte";
	import DeChoice from "./components/DEChoice.svelte";
	import { distros } from "./distros";

	import AboutDistros from "./questions/AboutDistros.svelte";
	import Install from "./questions/Install.svelte";
	import ReleaseSchedule from "./questions/ReleaseSchedule.svelte";
	import Results from "./questions/Results.svelte";
	import UiQuestion from "./questions/UIQuestion.svelte";
	import WhatIsADistro from "./questions/WhatIsADistro.svelte";
	import Workflow from "./questions/Workflow.svelte";
	import { answers, CompressAnswers, DecompressAnswers } from "./stores/answers";
	import { selectedDistro } from "./stores/distro";
	import {
		currentQuestion,
		DecrementQuestion,
		GotoQuestion,
		IncrementQuestion,
		Questions,
	} from "./stores/question";

	const urlParams = new URLSearchParams(window.location.search);

	selectedDistro.subscribe((c) => {
		if (c) {
			urlParams.set("distro", c.internalName);
		}
	});

	window.onpopstate = (e) => {
		currentQuestion.set(Number(new URLSearchParams(window.location.search).get("q")));
	};

	let hasMounted = false;
	let fromUser: null | string = null;

	currentQuestion.subscribe((c) => {
		if (hasMounted) {
			urlParams.set("q", c.toString());

			window.history.pushState(
				{ question: c },
				document.title,
				window.location.origin + window.location.pathname + "?" + urlParams.toString()
			);

			window.scrollTo(0, 0);
		}
	});

	onMount(() => {
		const a = urlParams.get("answers");

		try {
			if (a) {
				answers.set(DecompressAnswers(a));
			}

			fromUser = urlParams.get("from");

			const distName = urlParams.get("distro");

			if (distName) {
				selectedDistro.set(distros.find((e) => e.internalName === distName) ?? null);
			}

			const question = urlParams.get("q");
			if (question) {
				currentQuestion.set(Number(question));
			}
		} catch (err) {
			// Handle wacky errors by just ignoring them.
			console.error(err);
		}

		hasMounted = true;
	});

	answers.subscribe((a) => {
		if (hasMounted) {
			urlParams.set("answers", CompressAnswers(a));
			window.history.replaceState(
				{},
				document.title,
				window.location.origin + window.location.pathname + "?" + urlParams.toString()
			);
		}
	});
</script>

<main>
	<h1>Linux Distro Picker</h1>
	<p>
		Hello! This is a simple Linux Distribution picker designed for linux newcomers.
		<br />
		If you're already a Linux expert, this site might not be for you.
	</p>

	<hr />

	<section id="question-container" class="container">
		<div class="row">
			{#if $currentQuestion === Questions.WhatIsADistro}
				<WhatIsADistro />
			{:else if $currentQuestion === Questions.AboutDistros}
				<AboutDistros />
			{:else if $currentQuestion === Questions.Workload}
				<Workflow />
			{:else if $currentQuestion === Questions.UI}
				<UiQuestion />
			{:else if $currentQuestion === Questions.ReleaseSchedule}
				<ReleaseSchedule />
			{:else if $currentQuestion === Questions.Results}
				{#if fromUser}
					<div class="col-12">
						<div class="alert alert-info">
							Loaded existing answers from {fromUser}!
							<br />
							<button
								class="btn btn-danger mt-2"
								on:click={() => (window.location.search = "")}
								>Wipe URL and start again.</button
							>
						</div>
					</div>
				{/if}
				<Results />
			{:else if $currentQuestion === Questions.Install}
				<Install />
			{:else}
				<p class="col-12">Let's start by asking a few questions.</p>
				<button class="btn btn-primary col-12" on:click={IncrementQuestion}
					>Let's Go!</button
				>
				<button class="btn btn-info col-12 mt-4" on:click={() => GotoQuestion(Questions.UI)}
					>I've used this site before, skip the intro!</button
				>
			{/if}
			<div class="col-12" style="margin-top: 5rem;">
				<button class="btn btn-outline-danger mt-8" on:click={DecrementQuestion}
					>Go back a question</button
				>
			</div>
		</div>
	</section>
	<footer>
		<hr />
		<div>
			Created by <a href="https://github.com/zkldi">zkldi</a>.
			<a href="https://github.com/zkldi/playground">Source Code</a>
		</div>
	</footer>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}

	footer {
		bottom: 0;
	}

	section {
		padding-bottom: 10rem;
	}

	h1 {
		color: #cc527a;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 300;
	}

	#question-container {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
