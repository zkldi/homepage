<script lang="ts">
	export let value: boolean;
	export let fn: (() => unknown) | null = null;

	$: cls = value ? "btn-success" : "btn-secondary";
</script>

<button
	class={"btn " + cls}
	on:click={() => {
		value = !value;

		if (fn) {
			fn();
		}
	}}><slot /></button
>
