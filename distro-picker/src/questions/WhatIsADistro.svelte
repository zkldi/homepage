<script lang="ts">
	import Image from "../components/Image.svelte";
	import { IncrementQuestion } from "../stores/question";
</script>

<div class="col-12">
	<h3>What is a distro?</h3>
</div>
<div class="col-12">
	<h5>
		Before we pick a distro, it's worth knowing what one <i>really</i> is, and why you should care!
	</h5>
</div>
<div class="col-12 pt-4 long-description">
	<div class="row">
		<div class="col-12">
			When you install MacOS or Windows, you get all of the things you need to have a
			functional Desktop. Apple and Microsoft will bundle their own Software, Tools and
			Desktop Environment.
		</div>
		<div class="col-12 col-lg-6 offset-lg-3">
			<Image
				src="images/mac-default.png"
				alt="A default install of MacOS, with a desktop environment."
				tagline="Here's what you get with a default MacOS install..."
			/>
		</div>
		<div class="col-12">
			With Linux however, all of those tools are separate programs. If you were to install
			"Just Linux", you'd have to then acquire the rest of the desktop yourself!
		</div>
		<div class="col-12 col-lg-6 offset-lg-3">
			<Image
				src="images/shell.png"
				alt="An image of just an empty linux shell, with nothing happening."
			>
				... And here's an empty linux install, <span
					class="text-muted"
					data-toggle="tooltip"
					data-placement="right"
					title="Actually, I'm not even sure if you'd get to a shell like this. The point is that you don't get much, and certainly not a desktop!"
				>
					Kinda.
				</span>
			</Image>
		</div>
		<div class="col-12">
			To simplify <a target="_blank" href="https://www.linuxfromscratch.org/lfs/view/stable/"
				>this process</a
			>, Linux Distributions (Distros) were made. These bundle the Linux Operating System with
			a bunch of software and defaults.
		</div>
		<div class="col-12 col-lg-8 offset-lg-2">
			<Image
				src="images/ubuntu.jpg"
				alt="A default Ubuntu install, featuring a desktop."
				tagline="A default Ubuntu install."
			/>
		</div>
		<div class="col-12">
			A distro, then, is <b>some default software and default settings</b>.
			<br />
			You can run anything on any Distro, and
			<b>the look of any distro can be changed however much you like</b>!
		</div>
		<div class="col-12 col-lg-8 offset-lg-2">
			<Image
				src="images/modified-ubuntu.png"
				alt="Ubuntu running an entirely different desktop environment."
				tagline="The same Distro (Ubuntu), but running an entirely different desktop program!"
			/>
		</div>
		<div class="col-12 d-flex justify-content-center">
			<div class="btn btn-primary" on:click={IncrementQuestion}>Cool, now what?</div>
		</div>
	</div>
</div>

<style>
	.long-description {
		text-align: left;
	}
</style>
