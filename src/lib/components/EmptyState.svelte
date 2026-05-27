<script lang="ts">
	let { onAdd }: { onAdd: () => void } = $props();
</script>

<section class="glass-panel rounded-4xl px-8 py-16 text-center">
	<p class="font-display text-2xl text-ink/50">Nothing to count yet</p>
	<p class="mx-auto mt-3 max-w-xs text-sm leading-6 text-ink/30">
		Add your first countdown. One title, one date, done.
	</p>
	<button
		type="button"
		class="focus-ring mt-8 rounded-full border border-lavender/25 bg-lavender/8 px-6 py-3 text-sm font-medium text-lavender transition hover:bg-lavender/13 active:scale-[0.98]"
		onclick={onAdd}
	>
		Create countdown
	</button>
</section>
