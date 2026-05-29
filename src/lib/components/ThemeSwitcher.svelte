<script lang="ts">
	import { fromStore } from 'svelte/store';
	import { theme } from '$lib/stores/theme';

	const themeValue = fromStore(theme);
	let isDark = $derived(themeValue.current === 'dark');

	function toggle(event: MouseEvent) {
		event.stopPropagation();
		event.preventDefault();
		theme.toggle(themeValue.current);
	}
</script>

<button
	type="button"
	aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
	aria-pressed={isDark}
	onclick={toggle}
	class="focus-ring relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-ink/12 bg-night/45 text-ink transition-colors duration-300 ease-out select-none hover:bg-night/65"
	style="touch-action: manipulation;"
>
	<span
		class="absolute text-xl text-lavender transition-all duration-500 ease-out"
		class:translate-y-0={!isDark}
		class:-translate-y-8={isDark}
		class:opacity-100={!isDark}
		class:opacity-0={isDark}
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
			<path
				fill="currentColor"
				d="M12.09 20.66a8.68 8.68 0 0 1-1.09-.07A8.8 8.8 0 0 1 3.41 13a8.71 8.71 0 0 1 6.83-9.67a1.23 1.23 0 0 1 1.27.48a1.27 1.27 0 0 1 .05 1.4a5.3 5.3 0 0 0-.66 3.47a5.24 5.24 0 0 0 4.38 4.38a5.19 5.19 0 0 0 3.47-.67a1.27 1.27 0 0 1 1.4.07a1.21 1.21 0 0 1 .48 1.26a8.7 8.7 0 0 1-8.54 6.94ZM10 5a7.25 7.25 0 1 0 9 9a6.74 6.74 0 0 1-9.61-5A6.75 6.75 0 0 1 10 5Z"
			/>
		</svg>
	</span>

	<span
		class="absolute text-xl text-lavender transition-all duration-500 ease-out"
		class:translate-y-8={!isDark}
		class:translate-y-0={isDark}
		class:opacity-0={!isDark}
		class:opacity-100={isDark}
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
			<path
				fill="currentColor"
				d="M12 17.75A5.75 5.75 0 1 1 17.75 12A5.76 5.76 0 0 1 12 17.75Zm0-10A4.25 4.25 0 1 0 16.25 12A4.26 4.26 0 0 0 12 7.75ZM12 5a.76.76 0 0 1-.75-.75v-1.5a.75.75 0 0 1 1.5 0v1.5A.76.76 0 0 1 12 5Zm0 17a.76.76 0 0 1-.75-.75v-1.5a.75.75 0 0 1 1.5 0v1.5A.76.76 0 0 1 12 22Zm9.25-9.25h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5Zm-17 0h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5Zm2.25-5.5A.74.74 0 0 1 6 7L4.91 6A.75.75 0 1 1 6 4.91L7 6a.75.75 0 0 1 0 1a.74.74 0 0 1-.5.25Zm12.06 12.06a.74.74 0 0 1-.53-.22L17 18a.75.75 0 0 1 1-1l1.09 1a.75.75 0 0 1 0 1.06a.74.74 0 0 1-.53.25ZM17.5 7.25A.74.74 0 0 1 17 7a.75.75 0 0 1 0-1l1-1.09A.75.75 0 1 1 19.09 6L18 7a.74.74 0 0 1-.5.25ZM5.44 19.31a.74.74 0 0 1-.53-.22a.75.75 0 0 1 0-1.06L6 17a.75.75 0 0 1 1 1l-1 1.09a.74.74 0 0 1-.56.22Z"
			/>
		</svg>
	</span>
</button>
