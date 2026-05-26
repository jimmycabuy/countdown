<script lang="ts">
	let { onAdd = undefined }: { onAdd?: () => void } = $props();
</script>

<header class="flex items-start justify-between gap-6 py-10 md:py-14">
	<div class="animate-fadeUp opacity-0">
		<p
			class="mb-4 font-sans text-[0.65rem] font-semibold tracking-[0.36em] text-lavender uppercase"
		>
			Time tracker
		</p>
		<h1 class="font-display text-4xl leading-none tracking-[-0.08em] text-ink md:text-6xl">
			Count<span class="text-lavender/60">down.</span>
		</h1>
		<p class="mt-4 max-w-sm text-sm text-ink/40">Everything that matters, ticking.</p>
	</div>

	{#if onAdd}
		<button
			type="button"
			class="focus-ring animate-fadeUp rounded-full border border-white/10 px-5 py-3 text-[0.68rem] font-semibold tracking-[0.22em] text-lavender uppercase opacity-0 transition hover:border-lavender/25 hover:bg-lavender/8"
			onclick={onAdd}
		>
			Nouveau countdown
		</button>
	{/if}
</header>
