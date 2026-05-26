<script lang="ts">
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
</script>

<nav class="space-y-3" aria-label="Countdowns">
	{#each countdowns as countdown, index (countdown.id)}
		{@const days = getDayDiff(countdown.date)}
		<button
			type="button"
			class="focus-ring group flex w-full animate-scaleIn items-center justify-between gap-5 rounded-3xl border px-5 py-5 text-left opacity-0 backdrop-blur-2xl transition {selectedId ===
			countdown.id
				? 'border-white/14 bg-white/7.5'
				: 'border-white/7.5 bg-white/[0.035] hover:border-white/12 hover:bg-white/5.5'}"
			style={`animation-delay:${index * 55}ms`}
			onclick={() => onSelect(countdown.id)}
		>
			<span class="min-w-0">
				<span class="block truncate text-base font-semibold tracking-[-0.03em] text-ink">
					{countdown.title}
				</span>
				<span
					class="mt-1 block truncate font-mono text-[0.68rem] tracking-[0.16em] text-ink/35 uppercase"
				>
					{formatDate(countdown.date)}
				</span>
			</span>

			<span class="shrink-0 text-right">
				<span class="block font-display text-3xl tracking-[-0.12em] text-ink/80">
					{days}
				</span>
				<span class="block text-[0.65rem] text-ink/35">jours</span>
			</span>
		</button>
	{/each}
</nav>
