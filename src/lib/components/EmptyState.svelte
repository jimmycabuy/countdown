<script lang="ts">
	let { onAdd }: { onAdd: () => void } = $props();
</script>

<section class="glass-panel rounded-[2rem] px-8 py-16 text-center">
	<p class="font-display text-2xl tracking-[-0.08em] text-ink/50">Rien à compter</p>
	<p class="mx-auto mt-3 max-w-xs text-sm leading-6 text-ink/30">
		Ajoute ton premier countdown. Un titre, une date, basta.
	</p>
	<button
		type="button"
		class="focus-ring mt-8 rounded-full border border-lavender/25 bg-lavender/[0.08] px-6 py-3 text-sm font-medium text-lavender transition hover:bg-lavender/[0.13] active:scale-[0.98]"
		onclick={onAdd}
	>
		Créer un countdown
	</button>
</section>
