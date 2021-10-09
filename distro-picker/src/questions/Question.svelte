<script lang="ts">
	export let title: string;
	export let description: string;
</script>

<div class="question-header row">
	<div class="question-title col-12">
		{title}
	</div>
	<div class="question-desc col-12">
		{description}
	</div>
	<div class="col-12 mt-4">
		<slot />
	</div>
</div>

<style>
	.question-title {
		font-size: 3em;
	}
</style>
