<script lang="ts">
	import { flip } from 'svelte/animate';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import type { TransitionConfig } from 'svelte/transition';
	import type { Countdown } from '$lib/types';
	import { formatDate, getDayDiff } from '$lib/utils/date';

	let {
		countdowns = [],
		selectedId = null,
		onSelect
	}: {
		countdowns?: Countdown[];
		selectedId?: string | null;
		onSelect: (id: string) => void;
	} = $props();

	function listItemIn(
		node: Element,
		{ y = 38, rotate = 10, duration = 420, delay = 0 } = {}
	): TransitionConfig {
		return {
			delay,
			duration,
			easing: cubicOut,
			css: (t) => {
				const inv = 1 - t;
				const translateY = inv * y;
				const rotateX = inv * rotate;
				const scale = 0.965 + 0.035 * t;
				return `transform: translate3d(0, ${translateY}px, 0) rotateX(${rotateX}deg) scale(${scale}); opacity: ${t};`;
			}
		};
	}

	function listItemOut(
		node: Element,
		{ y = 46, rotate = 12, duration = 280 } = {}
	): TransitionConfig {
		return {
			duration,
			easing: cubicIn,
			css: (_t, u) => {
				const translateY = u * y;
				const rotateX = u * rotate;
				const scale = 1 - u * 0.04;
				const opacity = 1 - u;
				return `transform: translate3d(0, ${translateY}px, 0) rotateX(${rotateX}deg) scale(${scale}); opacity: ${opacity};`;
			}
		};
	}
</script>

<nav class="space-y-3" aria-label="Countdowns">
	{#each countdowns as countdown, index (countdown.id)}
		{@const days = getDayDiff(countdown.date)}
		<button
			type="button"
			class="focus-ring group flex w-full items-center justify-between gap-5 rounded-3xl border px-5 py-5 text-left backdrop-blur-2xl transition {selectedId ===
			countdown.id
				? 'border-ink/20 bg-night/85'
				: 'border-ink/12 bg-night/68 hover:border-ink/18 hover:bg-night/82'}"
			in:listItemIn={{ delay: index * 45 }}
			out:listItemOut
			animate:flip={{ duration: 280, easing: cubicOut }}
			onclick={() => onSelect(countdown.id)}
		>
			<span class="min-w-0">
				<span class="block truncate text-base font-semibold text-ink">
					{countdown.title}
				</span>
				<span class="mt-1 block truncate font-mono text-[0.68rem] text-ink/35 uppercase">
					{formatDate(countdown.date)}
				</span>
			</span>

			<span class="shrink-0 text-right">
				<span class="block font-display text-3xl text-ink/80">
					{days}
				</span>
				<span class="block text-[0.65rem] text-ink/35">days</span>
			</span>
		</button>
	{/each}
</nav>
