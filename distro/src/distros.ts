import type { Answers } from "./stores/answers";

export interface DistroInfo {
	name: string;
	url: string;
	internalName: string;
	description: string;
	tips?: string[];

	de: "GNOME" | "KDE Plasma" | "Cinnamon" | "XFCE" | null;
	// Creative stuff is pretty much the same on all distros.
	// The main reason that option exists is to give the adobe warning.
	workflow: {
		gaming: boolean;
		programming: boolean;
	};
	release: "point" | "rolling";
}

/**
 * This list of distros is fairly small, but I don't think I've made
 * any mistakes here. If you think I have, please open an issue.
 *
 * I've attempted to justify all of the more controversial decisions here.
 *
 * And yes, I know that all distros are acceptable for programming, and yes
 * I know all distros are acceptable for gaming with hacks and stuff. This
 * is about defaults, and the flags are for specialised uses. keep that in
 * mind!
 */
export const distros: DistroInfo[] = [
	{
		name: "Ubuntu",
		url: "https://ubuntu.com/download/desktop",
		internalName: "ubuntu",
		description:
			"Ubuntu is quite possibly the most well known Linux distribution, and one of the best tested. If you like the GNOME interface, and aren't looking to do anything too fancy, Ubuntu is perfect.",

		de: "GNOME",
		// Ubuntu is technically alright for both of these things, but
		// it is specialised for neither (which is the point of these flags).
		workflow: {
			gaming: false,
			programming: false,
		},
		release: "point",
	},
	{
		name: "Kubuntu",
		url: "https://kubuntu.org/getkubuntu/",
		internalName: "kubuntu",
		description:
			"Ubuntu is quite possibly the most well known Linux distribution. Kubuntu is all the goodness of Ubuntu, but with KDE Plasma instead of GNOME.",

		tips: [
			"If you're googling for a solution to something, you can have better luck searching for Ubuntu instead of Kubuntu. They're the same thing underneath!",
		],

		de: "KDE Plasma",
		workflow: {
			gaming: false,
			programming: false,
		},
		release: "point",
	},
	{
		name: "Linux Mint XFCE Edition",
		url: "https://linuxmint.com/download.php",
		internalName: "mint_xfce",
		description:
			"Linux Mint is a great distribution for beginners, providing a comfy, familiar design. The XFCE Edition is all the goodness of Linux Mint, but with the XFCE interface instead of Cinnamon.",

		tips: [
			"If you're googling for a solution to something, you can have better luck searching for Mint instead of Mint XFCE. They're the same thing underneath!",
		],

		de: "XFCE",
		workflow: {
			gaming: false,
			programming: false,
		},
		release: "point",
	},
	{
		name: "Linux Mint Cinnamon Edition",
		url: "https://linuxmint.com/download.php",
		internalName: "mint",
		description:
			"Linux Mint is a great distribution for beginners, providing a comfy, familiar design.",

		de: "Cinnamon",
		workflow: {
			gaming: false,
			programming: false,
		},
		release: "point",
	},
	{
		name: "Fedora Workstation",
		url: "https://getfedora.org/en/workstation/download/",
		internalName: "fedora",
		description:
			"Despite the name, Fedora isn't a tongue-in-cheek distribution. Fedora is the Open Source home counterpart to Red Hat Enterprise Linux, which is one of the most popular and well tested distributions for companies. This background makes it better suited for certain aspects of programming, but it's still good for everything else!",

		de: "GNOME",
		workflow: {
			gaming: false,
			programming: true,
		},
		release: "point",
	},
	{
		name: "Fedora Workstation KDE Edition",
		url: "https://spins.fedoraproject.org/en/kde/",
		internalName: "fedora_kde",
		description:
			"Despite the name, Fedora isn't a tongue-in-cheek distribution. Fedora is the Open Source home counterpart to Red Hat Enterprise Linux, which is one of the most popular and well tested distributions for companies. This background makes it better suited for certain aspects of programming, but it's still good for everything else! The KDE Edition comes with KDE instead of GNOME.",

		de: "KDE Plasma",
		workflow: {
			gaming: false,
			programming: true,
		},
		release: "point",
	},
	{
		name: "Fedora Workstation XFCE Edition",
		url: "https://spins.fedoraproject.org/en/xfce/",
		internalName: "fedora_xfce",
		description:
			"Despite the name, Fedora isn't a tongue-in-cheek distribution. Fedora is the Open Source home counterpart to Red Hat Enterprise Linux, which is one of the most popular and well tested distributions for companies. This background makes it better suited for certain aspects of programming, but it's still good for everything else! The XFCE Edition comes with XFCE instead of GNOME.",

		de: "XFCE",
		workflow: {
			gaming: false,
			programming: true,
		},
		release: "point",
	},
	{
		name: "Fedora Workstation Cinnamon Edition",
		url: "https://spins.fedoraproject.org/en/cinnamon/",
		internalName: "fedora_cinnamon",
		description:
			"Despite the name, Fedora isn't a tongue-in-cheek distribution. Fedora is the Open Source home counterpart to Red Hat Enterprise Linux, which is one of the most popular and well tested distributions for companies. This background makes it better suited for certain aspects of programming, but it's still good for everything else! The Cinnamon Edition comes with Cinnamon instead of GNOME.",

		de: "Cinnamon",
		workflow: {
			gaming: false,
			programming: true,
		},
		release: "point",
	},
	{
		name: "OpenSUSE Leap",
		url: "https://get.opensuse.org/leap",
		internalName: "opensuse_leap",
		description:
			"OpenSUSE is the Open Source home counterpart to SUSE Linux, a popular distribution for professional, enterprise use. Unlike other Distros, OpenSUSE's installer lets you pick the Desktop Interface you want! The Leap variant of OpenSUSE has a new release every 6 months.",

		de: null,
		workflow: {
			gaming: false,
			programming: true,
		},
		release: "point",
	},
	{
		name: "OpenSUSE Tumbleweed",
		url: "https://get.opensuse.org/tumbleweed",
		internalName: "opensuse_tumbleweed",
		description:
			"OpenSUSE is the Open Source home counterpart to SUSE Linux, a popular distribution for professional, enterprise use. Unlike other Distros, OpenSUSE's installer lets you pick the Desktop Interface you want! The Tumbleweed variant of OpenSUSE is rolling, and software is updated frequently.",

		de: null,
		workflow: {
			gaming: true,
			programming: true,
		},
		release: "rolling",
	},
	{
		name: "Manjaro GNOME",
		url: "https://manjaro.org/download",
		internalName: "manjaro_gnome",
		description:
			"Manjaro provides the power of Arch without the hassle. This distro has some of the best access to packages through the Arch User Repository and has comfortable and accessible workflow. This variant of Manjaro comes with a custom GNOME theme.",

		de: "GNOME",
		workflow: {
			gaming: true,
			programming: true,
		},
		release: "rolling",
	},
	{
		name: "Manjaro KDE Plasma",
		url: "https://manjaro.org/download",
		internalName: "manjaro_kde",
		description:
			"Manjaro provides the power of Arch without the hassle. This distro has some of the best access to packages through the Arch User Repository and has comfortable and accessible workflow. This variant of Manjaro comes with a custom KDE theme.",

		de: "KDE Plasma",
		workflow: {
			gaming: true,
			programming: true,
		},
		release: "rolling",
	},
	{
		name: "Manjaro XFCE",
		url: "https://manjaro.org/download",
		internalName: "manjaro_xfce",
		description:
			"Manjaro provides the power of Arch without the hassle. This distro has some of the best access to packages through the Arch User Repository and has comfortable and accessible workflow. This variant of Manjaro comes with a custom XFCE theme.",

		de: "XFCE",
		workflow: {
			gaming: true,
			programming: true,
		},
		release: "rolling",
	},
	{
		name: "Pop!_OS",
		url: "https://pop.system76.com/",
		internalName: "pop_os",
		description:
			"Pop!_OS is a stable, Ubuntu-Derived Distro with a focus on simplicity and easy gaming.",

		de: "GNOME",
		// Pop!_OS is the only "stable release" distro
		// I'd feel comfortable recommending for gaming.
		// I still don't really think stable release distros
		// are a good idea for gaming at the moment, but if
		// you had to pick one, this would be it.
		workflow: {
			gaming: true,
			programming: false,
		},
		release: "point",
	},
];

export function GetDistros(answers: Answers) {
	return distros.filter((d) => {
		if (d.release !== answers.release) {
			return false;
		}

		if (d.de && !answers.de[d.de]) {
			return false;
		}

		if (answers.workflow.gaming && !d.workflow.gaming) {
			return false;
		}

		if (answers.workflow.programming && !d.workflow.programming) {
			return false;
		}

		return true;
	});
}
