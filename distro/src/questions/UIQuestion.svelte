<script lang="ts">
	import DeChoice from "../components/DEChoice.svelte";
	import { answers } from "../stores/answers";
	import { IncrementQuestion } from "../stores/question";

	import Question from "./Question.svelte";

	const deChoices = $answers.de;

	$: selections = Object.entries(deChoices)
		.filter(([k, v]) => v)
		.map((e) => e[0]);
</script>

<Question title="Look & Feel" description="Which of these do you like the look of?">
	<div class="row">
		<DeChoice
			imgSrc="images/fedora-gnome40.png"
			imgAlt="An image of Fedora running GNOME 40."
			name="GNOME"
			description="GNOME is a desktop that is modern, simple, and beautifully fluid to use. The GNOME Team also create a lot of desktop applications, making this a very comprehensive desktop."
			recommended={[
				"Mac Users",
				"Laptop Users, due to great touchpad integration",
				"People who want an all-in-one desktop experience",
			]}
			bind:value={deChoices.GNOME}
		>
			Note that pictures don't really do this desktop justice.
			<br />
			You can see it in action
			<a target="_blank" href="https://youtu.be/6wqb-j4GBVE?t=206">Here</a>.</DeChoice
		>
		<DeChoice
			imgSrc="images/kde-plasma522.png"
			imgAlt="An image of an unknown Distro running KDE Plasma 5.22."
			name="KDE Plasma"
			description="KDE Plasma is a Windows-like UI, with a focus on complete customisation and user-friendliness. The KDE Team also create a lot of desktop applications, making this a very comprehensive desktop."
			recommended={[
				"Windows Users",
				"People who like having the option to customise everything",
				"People who want an all-in-one desktop experience",
			]}
			bind:value={deChoices["KDE Plasma"]}
		>
			You can see it in action
			<a target="_blank" href="https://youtu.be/Mr9TkovpaME?t=201">Here</a>, or check out the
			excellent
			<a target="_blank" href="https://kde.org/plasma-desktop/">KDE Plasma Site</a>.</DeChoice
		>

		<DeChoice
			imgSrc="images/mint-cinnamon.png"
			imgAlt="An image of Linux Mint running cinnamon."
			name="Cinnamon"
			description="Cinnamon is a Windows-like UI, with a focus on user-friendliness and cleanliness."
			recommended={["Windows Users"]}
			bind:value={deChoices.Cinnamon}
		>
			You can see it in action
			<a target="_blank" href="https://www.youtube.com/watch?v=Rh5Q8zCZyzk">Here</a
			>.</DeChoice
		>

		<DeChoice
			imgSrc="images/manjaro-xfce.png"
			imgAlt="An image of Manjaro running XFCE."
			name="XFCE"
			description="XFCE is a Windows-like UI, with a focus on minimalism and running on lighter hardware."
			recommended={[
				"Windows Users",
				"People with weaker/older PCs, due to its great performance",
			]}
			bind:value={deChoices.XFCE}
		>
			You can see it in action
			<a target="_blank" href="https://youtu.be/I6WgT7JkkQk?t=200">Here</a>.</DeChoice
		>
	</div>
	<div class="row">
		<div class="col-12">
			<h4>You've Selected:</h4>
		</div>
		<div class="col-12">
			{selections.length === 0
				? "Nothing, you should pick atleast one!"
				: selections.join(", ") + "."}
		</div>
		<div class="col-12 mt-2">
			<button
				on:click={() => {
					answers.update((x) => ({ ...x, de: deChoices }));

					IncrementQuestion();
				}}
				class="btn btn-primary"
				disabled={selections.length === 0}
			>
				Ok, I've picked what I like.
			</button>
		</div>
	</div>
</Question>
