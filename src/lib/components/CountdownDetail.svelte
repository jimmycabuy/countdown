<script lang="ts">
	import type { Countdown } from '$lib/types';
	import CountdownDisplay from '$lib/components/CountdownDisplay.svelte';

	let {
		countdown,
		onEdit,
		onDelete
	}: {
		countdown: Countdown;
		onEdit: () => void;
		onDelete: () => void;
	} = $props();
</script>

<section
	class="glass-panel relative min-h-136 overflow-hidden rounded-[2.25rem] px-6 py-6 md:min-h-176 md:rounded-[3rem] md:px-10 md:py-8"
>
	<div
		class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(200,184,255,0.11),transparent_38%),radial-gradient(circle_at_80%_80%,rgba(126,232,200,0.08),transparent_42%)]"
	></div>

	<div class="relative z-10 flex items-center justify-between">
		<p class="font-mono text-[0.65rem] tracking-[0.32em] text-ink/35 uppercase">Détail</p>
	</div>

	<div class="relative z-10 grid min-h-112 place-items-center py-14 md:min-h-152">
		<CountdownDisplay {countdown} />
	</div>

	<div class="flex w-full items-center justify-between gap-2">
		<button
			type="button"
			class="focus-ring rounded-full border border-white/10 px-4 py-2 text-[0.68rem] font-semibold tracking-[0.22em] text-ink/45 uppercase transition hover:border-lavender/25 hover:text-lavender"
			onclick={onEdit}
		>
			Modifier
		</button>
		<button
			type="button"
			class="focus-ring rounded-full border border-white/10 px-4 py-2 text-[0.68rem] font-semibold tracking-[0.22em] text-ink/35 uppercase transition hover:border-danger/25 hover:text-danger"
			onclick={onDelete}
		>
			Supprimer
		</button>
	</div>
</section>
