<script lang="ts">
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';

	let { onAdd = undefined }: { onAdd?: () => void } = $props();
</script>

<header class="mt-10 flex items-start justify-between gap-6 pt-10 pb-10 md:mt-0 md:pb-14">
	<div class="animate-fadeUp opacity-0">
		<p class="mb-4 font-sans text-[0.65rem] font-semibold text-lavender uppercase">Time tracker</p>
		<h1 class="font-display text-3xl leading-none text-ink md:text-6xl">
			Count<span class="text-lavender/60">down.</span>
		</h1>
		<p class="mt-4 max-w-sm text-sm text-ink/40">Everything that matters, ticking.</p>
	</div>

	<div class="flex items-center gap-3">
		<ThemeSwitcher />
		{#if onAdd}
			<button
				type="button"
				class="focus-ring animate-fadeUp rounded-full border border-ink/15 px-5 py-3 text-[0.68rem] font-semibold text-lavender uppercase opacity-0 transition hover:border-lavender/30 hover:bg-lavender/10"
				onclick={onAdd}
			>
				Add countdown
			</button>
		{/if}
	</div>
</header>
