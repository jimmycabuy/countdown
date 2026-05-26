export type Countdown = {
	id: string;
	title: string;
	date: string;
	createdAt: string;
};

export type CountdownStatus = 'future' | 'today' | 'past';

export type TimeLeft = {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
};
