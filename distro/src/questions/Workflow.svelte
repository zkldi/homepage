<script lang="ts">
	import ButtonSwitch from "../components/ButtonSwitch.svelte";
	import Image from "../components/Image.svelte";
	import { answers } from "../stores/answers";
	import { IncrementQuestion } from "../stores/question";
	import Question from "./Question.svelte";

	let kaliIsNotASensibleDailyDriver = false;

	const workflow = $answers.workflow;

	let casualProgramming = false;
	let casualGaming = false;
</script>

<Question title="Workload" description="Will you be doing any of these things with your PC?">
	<div class="row">
		<div class="col-12">
			All Linux Distros can do all things, but some are better out of the box than others.
			This question helps me select something that is better tailored towards these <i
				>specialised</i
			>
			flows.
			<br />
			(Select all that apply.)
		</div>
		<div class="col-12 col-lg-6">
			<Image src="images/manjaro-gaming.png" alt="A picture of ULTRAKILL running on Linux.">
				<ButtonSwitch bind:value={casualGaming} fn={() => (workflow.gaming = false)}
					>I'll be doing a bit of Gaming.</ButtonSwitch
				>
				<br />
				<ButtonSwitch bind:value={workflow.gaming} fn={() => (casualGaming = false)}
					>I'll be doing a lot of Gaming on latest, online games.</ButtonSwitch
				>
			</Image>
		</div>
		<div class="col-12 col-lg-6">
			<Image
				src="images/manjaro-programming.png"
				alt="A picture of various programming tools running on Linux."
			>
				<ButtonSwitch
					bind:value={casualProgramming}
					fn={() => (workflow.programming = false)}
				>
					I'll be doing some Programming.
				</ButtonSwitch>
				<br />
				<ButtonSwitch
					bind:value={workflow.programming}
					fn={() => (casualProgramming = false)}
					>I will primarily be doing Programming.</ButtonSwitch
				>
			</Image>
		</div>
		<div class="col-12 col-lg-6">
			<Image src="images/linux-krita.png" alt="A picture of Krita running on Linux.">
				<ButtonSwitch bind:value={workflow.creative}
					>I'll be doing Creative Stuff (Art, video, etc.)</ButtonSwitch
				>
			</Image>
		</div>
		<div class="col-12 col-lg-6">
			<Image src="images/omgh4xxor.png" alt="A picture of Krita running on Linux.">
				<ButtonSwitch bind:value={kaliIsNotASensibleDailyDriver}
					>I'll be doing Cyber Security Stuff.</ButtonSwitch
				>
			</Image>
		</div>
		<div class="col-12 col-lg-6 offset-lg-3">
			<Image src="images/general-work.png" alt="A picture of Krita running on Linux.">
				<!-- This switch doesn't do anything, all the Distros on this list are great for this.
					However, it'll make people interact with the picker more!
				-->
				<ButtonSwitch value={false}
					>I'll be doing some general work -- web browsing, emails, etc.</ButtonSwitch
				>
			</Image>
		</div>
		<div class="col-12">
			{#if kaliIsNotASensibleDailyDriver}
				<div class="alert alert-warning">
					You might have heard about <b>Kali Linux</b>. It is important to note that Kali
					Linux is <b>NOT</b> a sensible Distro to use for your main PC. It is meant to be
					carried around on a USB stick and plugged in for quick purposes.
					<br />
					While Kali is not a bad Distro, it is an incredibly specialised one, and not for
					beginners. Read
					<a target="_blank" href="https://unix.meta.stackexchange.com/a/5361"
						>this post</a
					>
					for more information.
					<br />
					<b>If you have to ask, you should NOT use Kali!</b>
				</div>
			{/if}
			{#if workflow.gaming || casualGaming}
				<div class="alert alert-warning">
					Linux gaming has came a long way, but it is still <b>not perfect</b>. I highly
					recommend signing in on
					<a href="https://www.protondb.com" target="_blank">ProtonDB</a>, which will tell
					you what games you own that you can or can't play on Linux.
					<br />
					If any of the games unavailable on there are deal breakers, that's okay! Linux Gaming
					isn't all the way there yet. You could always Dual Boot with Windows (Don't worry,
					we'll go over how to do that), or just not make the leap yet.
					<br />
					This is because most AAA developers do not currently care for supporting Linux.
				</div>
			{/if}
			{#if workflow.creative}
				<div class="alert alert-warning">
					The entire Adobe suite of tools are <b>NOT</b> available on Linux.
					<br />
					If you work with these tools professionally, or are extremely used to them, this
					might be a deal breaker.
					<br />
					If you don't need the Adobe suite, you should be okay. It's worth noting that tools
					like <b>OBS</b> work flawlessly on Linux.
				</div>
			{/if}
			{#if workflow.programming}
				<div class="alert alert-info">
					The programming option is for people who will be primarily programming with
					their computer. If you just have a passing interest in programming, uncheck it.
					<br />
					The reason for this is that, well, it's Linux. It's always going to be good for programming!
					That option just makes sure we select a programmer-tailored Distro.
				</div>
			{/if}
		</div>
		<div class="col-12">
			<button
				class="btn btn-primary"
				on:click={() => {
					answers.update((x) => ({ ...x, workflow }));
					IncrementQuestion();
				}}>Continue</button
			>
		</div>
	</div>
</Question>

<style>
	.alert-warning > a {
		color: black;
	}
</style>
