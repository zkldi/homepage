<script lang="ts">
	export let title: string;
</script>

<div class="card my-4">
	<div class="card-header">{title}</div>
	<div class="card-body">
		<slot />
	</div>
</div>

<style>
	.card-header {
		font-size: 2rem;
	}
</style>
