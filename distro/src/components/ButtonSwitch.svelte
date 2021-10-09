<script lang="ts">
	export let value: boolean;

	$: cls = value ? "btn-success" : "btn-secondary";
</script>

<button class={"btn " + cls} on:click={() => (value = !value)}><slot /></button>
