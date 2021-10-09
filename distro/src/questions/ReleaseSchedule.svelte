<script lang="ts">
	import Card from "../components/Card.svelte";
	import { answers } from "../stores/answers";
	import { IncrementQuestion } from "../stores/question";
	import Question from "./Question.svelte";
</script>

<Question title="Update Schedule" description="How do you want your distro to be updated?">
	<div class="row">
		<div class="col-12 col-lg-6">
			<Card title="Point Release">
				Most software will be updated in large updates, typically twice a year.
				<br />

				This is not recommended if you like using things as soon as they come out.

				{#if $answers.workflow.gaming && !$answers.de.GNOME}
					<div class="alert alert-danger">
						The only Point Release Gaming distro I'm comfortable recommending uses <b
							>GNOME</b
						>, which you have not selected.<br />
						As warned before, Linux Gaming is only <i>just</i> really finding its feet, so
						Point Releases aren't there yet.
					</div>
				{/if}

				{#if $answers.workflow.programming && $answers.workflow.gaming && $answers.de.GNOME}
					<div class="alert alert-danger">
						At the moment, there are no distros in this category that satisfy your
						criteria.
						<br />
						As mentioned before, Gaming on Linux is really only just getting there.
						<br />
						We'll definitely see better Point Releases for gaming in the future!
					</div>
				{/if}

				<hr />
				<button
					class="btn btn-primary mt-2"
					on:click={() => {
						answers.update((x) => ({ ...x, release: "point" }));
						IncrementQuestion();
					}}
					disabled={($answers.workflow.gaming && !$answers.de.GNOME) ||
						($answers.workflow.gaming && $answers.workflow.programming)}>Select</button
				>
			</Card>
		</div>
		<div class="col-12 col-lg-6">
			<Card title="Rolling Release">
				Software will be updates will be available for download as soon as they are ready,
				so you do not have to wait for a major update to get the latest version of specific
				software.
				<br />
				This can come with less system stability.
				<br />
				This is recommended if you want to work with some of the latest software, and get shiny
				stuff as soon as it comes out!
				{#if $answers.workflow.gaming}
					<div class="alert alert-info mt-2">
						Since you said you were gaming, this is probably the better choice. Gaming
						on Linux is an ongoing project, and cutting edge packages can be important!
					</div>
				{/if}
				<hr />
				<button
					class="btn btn-primary"
					on:click={() => {
						answers.update((x) => ({ ...x, release: "rolling" }));
						IncrementQuestion();
					}}>Select</button
				>
			</Card>
		</div>
	</div>
</Question>
