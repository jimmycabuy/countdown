<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type { Countdown } from '$lib/types';
	import { formatDate, getDayDiff, getStatus, getTimeLeft, padTimeUnit } from '$lib/utils/date';

	let {
		countdown,
		compact = false
	}: {
		countdown: Countdown;
		compact?: boolean;
	} = $props();

	let now = $state(new Date());
	let interval: ReturnType<typeof setInterval> | undefined;

	let status = $derived(getStatus(countdown.date, now));
	let diffDays = $derived(getDayDiff(countdown.date, now));
	let timeLeft = $derived(getTimeLeft(countdown.date, now));

	onMount(() => {
		interval = setInterval(() => {
			now = new Date();
		}, 1000);
	});

	onDestroy(() => {
		if (interval) clearInterval(interval);
	});
</script>

<div class={compact ? 'text-left' : 'text-center'}>
	{#if !compact}
		<p class="mb-5 font-sans text-[0.72rem] font-semibold text-ink/80 uppercase">
			{countdown.title}
		</p>
		<p class="mb-10 font-mono text-xs text-ink/45 uppercase">
			{formatDate(countdown.date)}
		</p>
	{/if}

	{#if status === 'past'}
		<div class={compact ? 'flex items-baseline gap-2' : ''}>
			<span
				class={compact
					? 'font-display text-4xl text-ink/40'
					: 'block font-display text-[clamp(6rem,18vw,14rem)] leading-none text-ink/35'}
			>
				{Math.abs(diffDays)}
			</span>
			<span
				class={compact
					? 'text-xs text-ink/25 uppercase'
					: 'mt-5 block text-xs text-ink/35 uppercase'}
			>
				day{Math.abs(diffDays) > 1 ? 's' : ''} ago
			</span>
		</div>
	{:else if status === 'today'}
		<div
			class={compact
				? 'font-display text-4xl'
				: 'font-display text-[clamp(5rem,16vw,12rem)] leading-none'}
		>
			today
		</div>
	{:else if timeLeft}
		<div>
			<div
				class={compact
					? 'font-display text-4xl text-ink'
					: 'font-display text-[5rem] leading-[0.86] text-ink'}
			>
				{timeLeft.days}
			</div>
			<p
				class={compact
					? 'mt-1 text-[0.65rem] text-ink/35 uppercase'
					: 'mt-8 text-sm text-ink/60 uppercase'}
			>
				days
			</p>

			{#if !compact}
				<div
					class="mx-auto mt-16 flex max-w-md grid-cols-3 flex-col items-center gap-3 text-center md:grid md:gap-10"
				>
					<div>
						<div class="font-display text-4xl text-ink/90 md:text-6xl">
							{padTimeUnit(timeLeft.hours)}
						</div>
						<div class="mt-3 font-mono text-[0.62rem] text-ink/40 uppercase">hours</div>
					</div>
					<div>
						<div class="font-display text-4xl text-ink/90 md:text-6xl">
							{padTimeUnit(timeLeft.minutes)}
						</div>
						<div class="mt-3 font-mono text-[0.62rem] text-ink/40 uppercase">minutes</div>
					</div>
					<div>
						<div class="font-display text-4xl text-ink/90 md:text-6xl">
							{padTimeUnit(timeLeft.seconds)}
						</div>
						<div class="mt-3 font-mono text-[0.62rem] text-ink/40 uppercase">seconds</div>
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>
