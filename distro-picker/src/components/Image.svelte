<script lang="ts">
	export let src: string;
	export let alt: string;
	export let tagline: string | undefined = undefined;
</script>

<div class="card my-4">
	<img
		class="card-img-top"
		{src}
		{alt}
		on:click={() => {
			window.open(src, "_blank");
		}}
	/>
	<div class="card-body">
		<p class="card-text">
			{#if typeof tagline === "string"}
				{tagline}
			{:else}
				<slot />
			{/if}
		</p>
	</div>
</div>

<style>
	img {
		width: 100%;
	}

	img:hover {
		opacity: 0.9;
	}
</style>
