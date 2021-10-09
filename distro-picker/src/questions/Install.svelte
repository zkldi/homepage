<script lang="ts">
	import { selectedDistro } from "../stores/distro";

	const distro = $selectedDistro!;
</script>

<div class="col-12">
	<div class="alert alert-warning">
		The below instructions are for Windows. I do not have a Mac infront of me to verify other
		instructions, but they can be found online.
		<br />
		It's a similar process.
	</div>
</div>

<div class="col-12">
	<h1>Test it first!</h1>
	<div class="card">
		<div class="card-header">Do you have a spare ~8GB USB?</div>
		<div class="card-body">
			If you have a spare USB with that capacity (or more), you can flash the distro onto a
			'Live USB'.
			<br />
			This allows you to test everything in full without installing it to any disks!
			<br />
			<b
				>Performance will be slightly worse, as USBs are going to probably be slower than
				your internal drives, but this is still fine for testing!</b
			>
			<hr />
			<ol>
				<li>
					Go to <a href={distro.url} target="_blank">{distro.url}</a>, and acquire the ISO
					file.
				</li>
				<li>
					Plug the USB in to your PC. <b
						>This USB will be formatted, and all content on it will be lost. Make sure
						you're OK with that.</b
					>
				</li>
				<li>
					Install <a href="https://www.balena.io/etcher/" target="_blank">Balena Etcher</a
					>.
				</li>
				<li>Flash the USB stick with the ISO you just downloaded.</li>
				<li>
					That's it! Keep the USB plugged in and reboot your PC. If you don't boot into {distro.name},
					you'll have to enter your BIOS as you boot, and select the USB drive as the boot
					option. This is typically achieved by spamming Delete, F11 or some other key.
				</li>
				<li>Try out your Linux distro!</li>
			</ol>
		</div>
	</div>
	<div class="card">
		<div class="card-header">I don't have a USB.</div>
		<div class="card-body">
			You'll need one to install Linux, but it's still possible to test out a Distro without a
			USB.
			<br />
			<b
				>Note: Performance for this will be horrific versus native hardware, and is only a
				good idea for getting the gist of Linux. Not much else.</b
			>
			<hr />
			<ol>
				<li>
					Go to <a href={distro.url} target="_blank">{distro.url}</a>, and acquire the ISO
					file. You're almost certainly looking for the x86_64 version, if there's an
					option.
				</li>
				<li>
					Download virtual machine software. I recommend <a
						href="https://www.virtualbox.org/">Virual Box</a
					>
				</li>
				<li>Create a new virtual machine with the ISO file as the disk image.</li>
				<li>Try out your Linux distro!</li>
			</ol>
		</div>
	</div>
	<div class="card">
		<div class="card-header">I can't run a VM well enough.</div>
		<div class="card-body">
			No worries, running anything in a VM is sluggish, and requires a decent amount of
			processing power. There is a third alternative.
			<b
				>Again, performance of this is questionable and dependent on your internet. Real
				Linux <i>is</i>
				faster!</b
			>
			<hr />
			<ol>
				<li>
					Go to <a href="https://distrotest.net" target="_blank">https://distrotest.net</a
					>
				</li>
				<li>Find the distro you want to try out.</li>
				<li>You can access it over the internet in a browser!</li>
			</ol>
		</div>
	</div>
</div>

<div class="col-12">
	<h1>I like it! Now what.</h1>
	<div class="alert alert-danger">
		If you're installing Linux at the same time as installing Windows, read this.
		<br />
		Windows has
		<b>ABSOLUTELY NO REGARD</b> for other operating systems on the same PC as itself, and may
		decide to completely replace your Linux bootloader with itself after a Windows update.
		<br />
		This is fixable quite easily, but is still a massive pain. You should backup your data before
		performing any disk-sensitive operation.
	</div>
	<div class="alert alert-warning">
		Disk Resize operations have the rare chance to cause loss of data. Back up your data before
		attempting any of this.
	</div>
	<div class="card">
		<div class="card-header">I have a spare drive I want to install Linux to.</div>
		<div class="card-body">
			<ol>
				<li>Launch the Linux Live USB you created.</li>
				<li>While booted into it, select the Install To Disk option.</li>
				<li>Select the disk you want to install to.</li>
				<li>You're now a proud user of {distro.name}!</li>
				<li>
					(Optional) If you're dualbooting this with Windows, you can switch Operating
					Systems using the GRUB interface in Linux (Should work out of the box!), or by
					entering the BIOS and booting from the other drive.
				</li>
			</ol>
		</div>
	</div>
	<div class="card">
		<div class="card-header">I have spare space on the same drive as my Windows drive.</div>
		<div class="card-body">
			If you only have one drive you want to install Operating Systems on, this is a nice way
			of doing it.
			<hr />

			<ol>
				<li>Open Disk Management.</li>
				<li>Find the drive you wish to install Linux on.</li>
				<li>
					Right click on the Windows partition, which should be taking up most of the
					drive.
				</li>
				<li>Resize it down so you have atleast 64GB of free space for Linux.</li>
				<li>You can use more space if you want, of course.</li>
				<li>Launch the Linux Live USB you created.</li>
				<li>While booted into it, select the Install To Disk option.</li>
				<li>Select the partition you created in windows!</li>
				<li>You're now a proud user of {distro.name}!</li>
				<li>
					(Optional) If you're dualbooting this with Windows, you can switch Operating
					Systems using the GRUB interface in Linux (Should work out of the box!), or by
					entering the BIOS and booting from the other drive.
				</li>
			</ol>
		</div>
	</div>
</div>

<div class="col-12">
	<h1>Important Advice</h1>
	<ul>
		<li>
			If you have an NVIDIA Graphics Card, install the proprietary drivers. Sadly, NVIDIA do
			not release much info about their graphics cards, so there is no Open Source
			implementation.
			<br />
			The
			<a href="https://en.wikipedia.org/wiki/Nouveau_(software)" target="_blank">Nouveau</a>
			team have worked on an Open Source reverse-engineered implementation of an NVIDIA driver,
			which is a very difficult task. It's a very impressive project, but it is sadly too unstable
			to use regularly, and is incapable of gaming (I get 10fps in CSGO with my 660Ti).
			<br />
			If you use AMD, there are perfectly functional Open Source drivers that will come with your
			Distro!
		</li>
	</ul>
</div>

<div class="col-12">
	<h1>Cool Software</h1>
	<h4>
		I have not been paid or influenced to put anything here, this is just stuff I think is good.
	</h4>
	<h4>
		Remember, to install software, you should check your Package Manager first, then the web!
	</h4>
	<ul>
		<li>
			<a href="https://flameshot.org/" target="_blank">Flameshot</a>. It's a great equivalent
			to Snipping Tool/ShareX.
		</li>
		<li>
			<a href="https://tauonmusicbox.rocks/" target="_blank">Tauon Music Player</a>. If you're
			like me and you like music installed on your machine, this is a gorgeous Linux music
			player.
		</li>
		<li>
			<a href="https://lutris.net/" target="_blank">Lutris</a>. If you're gaming on Linux,
			you'll want this. It manages all the compatibility things, and works as a universal game
			launcher!
		</li>
	</ul>
</div>

<div class="col-12">
	<h1>That's everything!</h1>
	<h3>Thanks for using my tool.</h3>
	<button class="btn btn-danger" on:click={() => (window.location.search = "")}
		>Go back to start?</button
	>
</div>

<style>
	ol,
	li {
		text-align: left;
	}

	.card {
		margin-top: 2rem;
		margin-bottom: 2rem;
	}

	.card-header {
		font-size: x-large;
	}
</style>
