import { writable, Writable } from "svelte/store";

export enum Questions {
	Intro,
	// Experience,
	WhatIsADistro,
	AboutDistros,
	UI,
	Workload,
	ReleaseSchedule,
	Results,
	Install,
}
export const currentQuestion: Writable<Questions> = writable(Questions.Intro);

export function IncrementQuestion() {
	currentQuestion.update((x) => x + 1);
}

export function DecrementQuestion() {
	currentQuestion.update((x) => x - 1);
}

export function GotoQuestion(q: Questions) {
	currentQuestion.set(q);
}
