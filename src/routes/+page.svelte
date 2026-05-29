<script lang="ts">
	import { fromStore } from 'svelte/store';
	import Background from '$lib/components/Background.svelte';
	import AppHeader from '$lib/components/AppHeader.svelte';
	import CountdownDetail from '$lib/components/CountdownDetail.svelte';
	import CountdownList from '$lib/components/CountdownList.svelte';
	import CountdownModal from '$lib/components/CountdownModal.svelte';
	import EmptyState from '$lib/components/EmptyState.svelte';
	import { countdowns } from '$lib/stores/countdowns';
	import { sortCountdowns } from '$lib/utils/countdowns';

	const countdownItems = fromStore(countdowns);

	let selectedId = $state<string | null>(null);
	let modalMode = $state<'create' | 'edit' | null>(null);
	let isListCollapsed = $state(false);
	let listHeight = $state(0);

	let sortedCountdowns = $derived(sortCountdowns(countdownItems.current));
	let selectedCountdown = $derived(
		sortedCountdowns.find((countdown) => countdown.id === selectedId) ?? sortedCountdowns[0] ?? null
	);

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

	function toggleListCollapse() {
		isListCollapsed = !isListCollapsed;
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

	{#if sortedCountdowns.length === 0}
		<div class="mx-auto max-w-xl pt-10">
			<EmptyState onAdd={openCreateModal} />
		</div>
	{:else}
		<div class="grid gap-5 lg:grid-cols-[24rem_1fr] lg:items-start lg:gap-6">
			<aside class="glass-panel h-fit self-start rounded-4xl p-4 md:p-5 lg:sticky lg:top-6">
				<div class="flex items-center justify-between px-2">
					<div class="flex items-center gap-2">
						<button
							type="button"
							class="focus-ring rounded-full border border-ink/15 bg-night/74 p-1 text-ink/70 transition hover:border-ink/30 hover:bg-night/86"
							onclick={toggleListCollapse}
							aria-expanded={!isListCollapsed}
							aria-controls="countdowns-list"
							aria-label={isListCollapsed ? 'Display list' : 'Hide list'}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								class={`transition-transform duration-200 ${!isListCollapsed ? 'rotate-180' : ''}`}
								aria-hidden="true"><path d="m6 9l6 6l6-6" /></svg
							>
						</button>
						<p class="font-mono text-[0.65rem] text-ink/35 uppercase">My countdowns</p>
					</div>

					<button
						type="button"
						class="focus-ring rounded-full border border-ink/15 px-3 py-2 text-xs text-lavender transition hover:border-lavender/25 hover:bg-lavender/10"
						onclick={openCreateModal}
						aria-label="Add countdown"
					>
						Add
					</button>
				</div>

				<div
					id="countdowns-list"
					class="overflow-hidden transition-[height,opacity] duration-300 ease-out"
					style={`height:${isListCollapsed ? '0px' : `${listHeight}px`};opacity:${isListCollapsed ? 0 : 1};pointer-events:${isListCollapsed ? 'none' : 'auto'}`}
					aria-hidden={isListCollapsed}
				>
					<div bind:clientHeight={listHeight} class="pt-5">
						<CountdownList
							countdowns={sortedCountdowns}
							selectedId={selectedCountdown?.id ?? null}
							onSelect={selectCountdown}
						/>
					</div>
				</div>
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
