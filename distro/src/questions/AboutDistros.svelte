<script lang="ts">
	import Image from "../components/Image.svelte";
	import { IncrementQuestion } from "../stores/question";
</script>

<div class="col-12">
	<h3>A bit more on Distros.</h3>
</div>
<div class="col-12 pt-4 long-description">
	<div class="row">
		<div class="col-12">
			<h4>How many Distros are there?</h4>
			<br />
			Although there are <b>lots</b> of Linux Distros, almost all of them descend from 5 or so
			major Distros. This guide will only cover the larger Distros, as you'll find it easier to
			find support online for the better tested Distros.
		</div>
		<div class="col-12 col-lg-8 offset-lg-2">
			<Image src="images/ltt-guide.png" alt="A list of various Linux Distros."
				>This list from Linus Tech Tips shows quite a lot of distros, and where they've all
				came from. As you can see, A lot of them are based on the same distros!

				<span class="text-muted"
					>Errata: Red Hat is based on Fedora, not the other way around.</span
				>
			</Image>
		</div>
		<div class="col-12">
			<h4>Installing Software</h4>
			<br />
			Installing software is done differently on Linux versus Windows and MacOS.
			<br />
			Most software is installed through your distros <b>Package Manager</b>. The Distro
			developers will package software and make it available here. This is different to
			Windows, where you would google around for <code>.exe</code>'s to run.
			<br />
			This is quite similar to an app store, but with more freedom!
		</div>
		<div class="col-12 col-lg-8 offset-lg-2">
			<Image
				src="images/fedora-package.png"
				alt="An image of the package manager UI for Fedora."
				tagline="The package manager UI for Fedora."
			/>
		</div>
		<div class="col-12">
			This makes things like uninstalling and updating software a more predictable experience.
			However, sometimes your <b>Package Manager</b> might not have the Software you're looking
			for, or may have an older version. We'll talk more about Software later.
		</div>
		<div class="col-12 d-flex justify-content-center mt-4">
			<div class="btn btn-primary" on:click={IncrementQuestion}>
				Ok, ask me some questions!
			</div>
		</div>
	</div>
</div>

<style>
	.long-description {
		text-align: left;
	}

	h4 {
		text-align: center;
	}
</style>
