<script lang="ts">
	import { GetDistros } from "../distros";
	import { answers } from "../stores/answers";
	import { selectedDistro } from "../stores/distro";
	import { IncrementQuestion } from "../stores/question";

	const distros = GetDistros($answers);

	const specialist = [];
	if ($answers.workflow.gaming) {
		specialist.push("Gaming");
	}
	if ($answers.workflow.programming) {
		specialist.push("Programming");
	}
	if ($answers.workflow.creative) {
		specialist.push("Creative Stuff");
	}

	const specialistStr = specialist.length ? specialist.join(", ") : "None";

	const name = new URLSearchParams(window.location.search).get("from") || "you";
</script>

<div class="col-12">
	<div class="row">
		<div class="col-12">
			We've found {distros.length}
			{distros.length === 1 ? "distro" : "distros"}.
		</div>

		{#if distros.length === 0}
			<div class="col-12 my-2">
				Well. That shouldn't happen! <a href="https://github.com/zkldi/playground/issues"
					>You should let me know about this case</a
				>.
			</div>
		{/if}

		{#each distros as distro}
			<div class="col-12 my-2">
				<div class="card">
					<img
						class="card-img-top"
						src={`images/distro/main/${distro.internalName}.png`}
						alt={`A screenshot of ${distro.name}`}
					/>
					<div class="card-header">
						{distro.name}
					</div>
					<div class="card-body">
						<div class="row text-center align-items-center">
							<div class="col-12 col-md-2">
								<img
									src={`images/distro/icons/${distro.internalName}.png`}
									alt={`${distro.name}'s Logo`}
									width="100%"
								/>
							</div>
							<div class="col-12 col-md-10">
								<div class="row">
									<div class="col-12">
										<!-- Lazy hack for proper spacing. Maybe do this properly. -->
										<!-- If some XSS gets in here I'm going to be quite sad. -->
										{@html distro.description.replace(/(\.|!) /g, "$1<br />")}
										{#if distro.internalName.startsWith("opensuse")}
											<hr />
											<b
												>NOTE: The desktop in the picture above is KDE
												Plasma, but OpenSUSE lets you choose the Desktop
												Environment in the installer.</b
											>
										{/if}
										{#if distro.tips}
											<hr />
											<h4>Tips</h4>
											<ul>
												{#each distro.tips as tip}
													<li>{tip}</li>
												{/each}
											</ul>
										{/if}
									</div>
									<div class="col-12">
										<hr />
										<a
											class="check-it-out-btn btn btn-primary float-right"
											href={distro.url}
											target="_blank">Check it out. (Opens in new tab.)</a
										>
									</div>
									<div class="col-12 mt-4">
										<button
											class="btn btn-info float-right"
											on:click={() => {
												selectedDistro.set(distro);
												IncrementQuestion();
											}}>I like it, How can I install/test it?</button
										>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/each}
		<div class="col-12 my-2">
			<div class="card">
				<div class="card-header">More Stuff</div>
				<div class="card-body">
					<div class="row align-items-center">
						<div class="col-12 col-lg-4">
							<button
								class="btn btn-info"
								on:click={async () => {
									const name = prompt("Username?");
									await navigator.clipboard.writeText(
										window.location.href + "&from=" + name
									);
									alert("Copied the URL to your clipboard.");
								}}>Share your results with others.</button
							>
							<button
								class="btn btn-danger"
								on:click={() => (window.location.search = "")}
							>
								Start again.
							</button>
						</div>
						<div class="col-12 col-lg-8">
							<h4>What {name} picked.</h4>
							<hr />
							<h5>
								Desktop Environment: {Object.entries($answers.de)
									.filter(([k, v]) => v)
									.map((e) => e[0])
									.join(", ")}.
							</h5>
							<h5>Specialist Workflows: {specialistStr}.</h5>
							<h5>
								Release Type: {$answers.release === "rolling"
									? "Rolling Release"
									: "Point Release"}.
							</h5>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.card-img-top {
		object-fit: cover;
	}

	.card-header {
		font-size: 3rem;
	}

	li {
		text-align: left;
	}

	.check-it-out-btn {
		position: relative;
		top: 0;
		bottom: 100px;
	}
</style>
