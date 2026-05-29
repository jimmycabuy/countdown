import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

function isTheme(value: string | null): value is Theme {
	return value === 'light' || value === 'dark';
}

function getInitialTheme(): Theme {
	if (!browser) return 'dark';

	try {
		const storedTheme = localStorage.getItem(STORAGE_KEY);
		if (isTheme(storedTheme)) return storedTheme;

		return 'dark';
	} catch {
		return 'dark';
	}
}

function applyTheme(theme: Theme): void {
	if (!browser) return;

	const root = document.documentElement;
	root.classList.toggle('dark', theme === 'dark');
	root.dataset.theme = theme;
}

function createThemeStore() {
	const initialTheme = getInitialTheme();
	const { subscribe, set } = writable<Theme>(initialTheme);

	if (browser) {
		applyTheme(initialTheme);
	}

	function setTheme(nextTheme: Theme): void {
		set(nextTheme);
		if (!browser) return;

		localStorage.setItem(STORAGE_KEY, nextTheme);
		applyTheme(nextTheme);
	}

	return {
		subscribe,
		set: setTheme,
		toggle(currentTheme: Theme) {
			setTheme(currentTheme === 'dark' ? 'light' : 'dark');
		}
	};
}

export const theme = createThemeStore();
