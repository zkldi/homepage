export enum Weirdness {
	NOT_WEIRD = 0,
	SORTA_WEIRD,
	WEIRD,
	VERY_WEIRD,
}

export interface RecMD {
	id: string;
	info: {
		artist: string;
		title: string;
		album: string;
		art_path: string;
		tags: string[];
		listen: string;
		weirdness: Weirdness;
		loved: boolean;
	};
	last_changed: number;
	about: string;
}

export interface FilterInstructions {
	weirdnesses: Set<Weirdness>;
	excludedGenres: string[];
}
