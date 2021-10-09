import { writable, Writable } from "svelte/store";

export interface Answers {
	de: {
		GNOME: boolean;
		"KDE Plasma": boolean;
		Cinnamon: boolean;
		XFCE: boolean;
	};
	workflow: {
		gaming: boolean;
		programming: boolean;
		creative: boolean;
	};
	release: "rolling" | "point" | null;
}

export const answers: Writable<Answers> = writable({
	de: {
		GNOME: false,
		"KDE Plasma": false,
		Cinnamon: false,
		XFCE: false,
	},
	workflow: {
		gaming: false,
		programming: false,
		creative: false,
	},
	release: null,
});

function BoolTo01(bool: boolean) {
	return bool ? "1" : "0";
}

/**
 * Really simple and stupid method for making a compressible answer
 * thing.
 */
export function CompressAnswers(answers: Answers): string {
	let str = "";

	str += BoolTo01(answers.de.GNOME);
	str += BoolTo01(answers.de["KDE Plasma"]);
	str += BoolTo01(answers.de.Cinnamon);
	str += BoolTo01(answers.de.XFCE);

	str += BoolTo01(answers.workflow.gaming);
	str += BoolTo01(answers.workflow.programming);
	str += BoolTo01(answers.workflow.creative);

	str += answers.release === "point" ? "P" : answers.release === "rolling" ? "R" : "N";

	return str;
}

function e(str: string) {
	return str === "1";
}

/**
 * Reverses Compress Answers.
 */
export function DecompressAnswers(cmp: string): Answers {
	return {
		de: {
			GNOME: e(cmp[0]),
			"KDE Plasma": e(cmp[1]),
			Cinnamon: e(cmp[2]),
			XFCE: e(cmp[3]),
		},
		workflow: {
			gaming: e(cmp[4]),
			programming: e(cmp[5]),
			creative: e(cmp[6]),
		},
		release: cmp[7] === "P" ? "point" : cmp[7] === "R" ? "rolling" : null,
	};
}
