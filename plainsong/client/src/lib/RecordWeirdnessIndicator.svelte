<script lang="ts">
	import type { Weirdness } from "src/types";

	export let weirdness: Weirdness;
</script>

<span class={`weirdness-${weirdness}`}>
	{"🌶".repeat(weirdness)}
</span>

<style>
	span {
		font-size: small;
	}

	.weirdness-1 {
		color: palegreen;
	}

	.weirdness-2 {
		font-size: medium;
		color: palegoldenrod;
	}

	.weirdness-3 {
		font-size: large;
		color: palevioletred;
	}
</style>
