<script lang="ts">
	import { onMount } from 'svelte';
	import { fromStore } from 'svelte/store';
	import Background from '$lib/components/Background.svelte';
	import AppHeader from '$lib/components/AppHeader.svelte';
	import CountdownDetail from '$lib/components/CountdownDetail.svelte';
	import CountdownLoadingState from '$lib/components/CountdownLoadingState.svelte';
	import CountdownList from '$lib/components/CountdownList.svelte';
	import CountdownModal from '$lib/components/CountdownModal.svelte';
	import EmptyState from '$lib/components/EmptyState.svelte';
	import { countdowns } from '$lib/stores/countdowns';
	import { sortCountdowns } from '$lib/utils/countdowns';

	const countdownItems = fromStore(countdowns);

	let selectedId = $state<string | null>(null);
	let modalMode = $state<'create' | 'edit' | null>(null);
	let isClientReady = $state(false);

	let sortedCountdowns = $derived(sortCountdowns(countdownItems.current));
	let selectedCountdown = $derived(
		sortedCountdowns.find((countdown) => countdown.id === selectedId) ?? sortedCountdowns[0] ?? null
	);

	onMount(() => {
		isClientReady = true;
	});

	function openCreateModal() {
		modalMode = 'create';
	}

	function openEditModal() {
		if (!selectedCountdown) return;
		modalMode = 'edit';
	}

	function closeModal() {
		modalMode = null;
	}

	function selectCountdown(id: string) {
		selectedId = id;
	}

	function submitCountdown(payload: { title: string; date: string }) {
		if (modalMode === 'edit' && selectedCountdown) {
			countdowns.updateOne(selectedCountdown.id, payload);
		} else {
			countdowns.add(payload.title, payload.date);
		}

		closeModal();
	}

	function deleteSelectedCountdown() {
		if (!selectedCountdown) return;

		countdowns.remove(selectedCountdown.id);
		selectedId = null;
	}
</script>

<svelte:head>
	<title>Countdowns</title>
	<meta
		name="description"
		content="A minimalist SvelteKit web app for tracking countdowns in localStorage."
	/>
</svelte:head>

<Background />

<main class="relative z-10 mx-auto min-h-dvh w-full max-w-7xl px-5 pb-16 md:px-8">
	<AppHeader />

	{#if !isClientReady}
		<CountdownLoadingState />
	{:else if sortedCountdowns.length === 0}
		<div class="mx-auto max-w-xl pt-10">
			<EmptyState onAdd={openCreateModal} />
		</div>
	{:else}
		<div class="grid gap-5 lg:grid-cols-[24rem_1fr] lg:gap-6">
			<aside class="glass-panel h-fit rounded-4xl p-4 md:p-5 lg:sticky lg:top-6">
				<div class="mb-5 flex items-center justify-between px-2">
					<p class="font-mono text-[0.65rem] text-ink/35 uppercase">My countdowns</p>
					<button
						type="button"
						class="focus-ring rounded-full border border-white/10 px-3 py-2 text-xs text-lavender transition hover:border-lavender/25 hover:bg-lavender/8"
						onclick={openCreateModal}
						aria-label="Add countdown"
					>
						Add
					</button>
				</div>

				<CountdownList
					countdowns={sortedCountdowns}
					selectedId={selectedCountdown?.id ?? null}
					onSelect={selectCountdown}
				/>
			</aside>

			{#if selectedCountdown}
				<CountdownDetail
					countdown={selectedCountdown}
					onEdit={openEditModal}
					onDelete={deleteSelectedCountdown}
				/>
			{/if}
		</div>
	{/if}
</main>

<CountdownModal
	open={modalMode !== null}
	countdown={modalMode === 'edit' ? selectedCountdown : null}
	onClose={closeModal}
	onSubmit={submitCountdown}
/>
