<script lang="ts">
	import ButtonSwitch from "./ButtonSwitch.svelte";

	import Image from "./Image.svelte";

	export let imgSrc: string;
	export let imgAlt: string;
	export let name: string;
	export let description: string;
	export let recommended: string[];
	export let value: boolean;
</script>

<div class="col-12 col-md-6">
	<Image src={imgSrc} alt={imgAlt}>
		<div class="card-title">{name}</div>
		<div class="card-text text-left">
			{description}
			<br />
			<h4>Recommended For</h4>
			<ul>
				{#each recommended as rec, i}
					<li>
						{#if i === 0}
							<b>{rec}</b>
						{:else}
							{rec}
						{/if}
					</li>
				{/each}
			</ul>
			<br />
			<span class="text-center">
				<slot />
			</span>
			<div class="d-flex justify-content-center mt-4" id="check-select">
				<ButtonSwitch bind:value>I like this.</ButtonSwitch>
			</div>
		</div>
	</Image>
</div>

<style>
	h4 {
		margin-top: 1rem;
		text-align: left;
	}

	ul {
		text-align: left;
	}

	.card-title {
		font-size: 2rem;
	}
</style>
