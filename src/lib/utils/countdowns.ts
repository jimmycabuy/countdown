import type { Countdown } from '$lib/types';
import { getDayDiff } from '$lib/utils/date';

export function sortCountdowns(countdowns: Countdown[], now = new Date()): Countdown[] {
	return [...countdowns].sort((a, b) => {
		const diffA = getDayDiff(a.date, now);
		const diffB = getDayDiff(b.date, now);

		if (diffA === 0 && diffB !== 0) return -1;
		if (diffB === 0 && diffA !== 0) return 1;
		if (diffA >= 0 && diffB >= 0) return diffA - diffB;
		if (diffA < 0 && diffB < 0) return diffB - diffA;

		return diffA >= 0 ? -1 : 1;
	});
}

export function createCountdown(title: string, date: string): Countdown {
	return {
		id: crypto.randomUUID(),
		title: title.trim(),
		date,
		createdAt: new Date().toISOString()
	};
}
