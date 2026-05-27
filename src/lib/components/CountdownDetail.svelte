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
	class="glass-panel relative overflow-hidden rounded-[2.25rem] px-6 py-6 md:rounded-[3rem] md:px-10 md:py-8"
>
	<div
		class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(200,184,255,0.11),transparent_38%),radial-gradient(circle_at_80%_80%,rgba(126,232,200,0.08),transparent_42%)]"
	></div>

	<div class="relative z-10 flex items-center justify-between">
		<p class="font-mono text-[0.65rem] text-ink/35 uppercase">Details</p>
	</div>

	<div class="relative z-10 grid py-14">
		<CountdownDisplay {countdown} />
	</div>

	<div class="flex w-full items-center justify-between gap-2">
		<button
			type="button"
			class="focus-ring rounded-full border border-white/10 px-4 py-2 text-[0.68rem] font-semibold text-ink/45 uppercase transition hover:border-lavender/25 hover:text-lavender"
			onclick={onEdit}
		>
			Edit
		</button>
		<button
			type="button"
			class="focus-ring rounded-full border border-white/10 px-4 py-2 text-[0.68rem] font-semibold text-ink/35 uppercase transition hover:border-danger/25 hover:text-danger"
			onclick={onDelete}
		>
			Delete
		</button>
	</div>
</section>
