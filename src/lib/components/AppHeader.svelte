<script lang="ts">
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';

	let { onAdd = undefined }: { onAdd?: () => void } = $props();
</script>

<header class="mt-10 flex items-start justify-between gap-6 pt-10 pb-10 md:mt-0 md:pb-14">
	<div class="animate-fadeUp opacity-0">
		<p class="mb-4 font-sans text-[0.65rem] font-semibold text-lavender uppercase">v.1.0</p>
		<h1 class="font-display text-4xl leading-none text-ink md:text-6xl">
			So<span class="text-lavender/60">on.</span>
		</h1>
		<p class="mt-4 max-w-sm text-sm text-ink/40">Focus on what's next.</p>
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
