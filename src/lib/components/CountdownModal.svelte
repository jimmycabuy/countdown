<script lang="ts">
	import type { Countdown } from '$lib/types';
	import { getTomorrowDateInputValue } from '$lib/utils/date';
	let {
		open = false,
		countdown = null,
		onClose,
		onSubmit
	}: {
		open?: boolean;
		countdown?: Countdown | null;
		onClose: () => void;
		onSubmit: (payload: { title: string; date: string }) => void;
	} = $props();
	let title = $state('');
	let date = $state(getTomorrowDateInputValue());
	let hasSubmitted = $state(false);
	let titleError = $derived(hasSubmitted && title.trim().length === 0);
	let dateError = $derived(hasSubmitted && date.length === 0);
	$effect(() => {
		if (!open) return;
		title = countdown?.title ?? '';
		date = countdown?.date ?? getTomorrowDateInputValue();
		hasSubmitted = false;
	});
	function submit() {
		hasSubmitted = true;
		if (title.trim().length === 0 || date.length === 0) return;
		onSubmit({ title, date });
	}
	function onOverlayClick(event: MouseEvent) {
		if (event.currentTarget === event.target) onClose();
	}
</script>

{#if open}
	<div
		class="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-xl md:items-center md:p-6"
		role="presentation"
		onclick={onOverlayClick}
		onkeydown={(event) => event.key === 'Escape' && onClose()}
	>
		<div
			class="w-full max-w-xl rounded-t-4xl border border-white/10 bg-[#0d0b16]/95 px-7 pt-6 pb-9 shadow-soft md:rounded-4xl md:px-9 md:py-9"
			role="dialog"
			aria-modal="true"
			aria-labelledby="countdown-modal-title"
		>
			<div class="mx-auto mb-8 h-1 w-10 rounded-full bg-white/15 md:hidden"></div>
			<div class="mb-8 flex items-start justify-between gap-6">
				<div>
					<p class="mb-4 font-mono text-[0.65rem] tracking-[0.34em] text-lavender/70 uppercase">
						{countdown ? 'Edit' : 'New'}
					</p>
					<h2
						id="countdown-modal-title"
						class="font-display text-3xl leading-tight tracking-[-0.08em] text-ink"
					>
						{countdown ? 'Edit countdown' : 'New countdown'}
					</h2>
					<p class="mt-3 text-sm text-ink/35">A title, a date, and time does the rest.</p>
				</div>
			</div>
			<form
				class="space-y-5"
				onsubmit={(event) => {
					event.preventDefault();
					submit();
				}}
			>
				<label class="block">
					<span
						class="mb-2 block text-[0.65rem] font-semibold tracking-[0.24em] text-ink/35 uppercase"
						>Title</span
					>
					<input
						class="focus-ring w-full rounded-2xl border bg-white/4 px-4 py-4 text-base text-ink placeholder:text-ink/20 {titleError
							? 'border-danger/60'
							: 'border-white/10'}"
						bind:value={title}
						maxlength="40"
						placeholder="Ex: Tokyo vacation"
						autocomplete="off"
					/>
					{#if titleError}<span class="mt-2 block text-xs text-danger">Title is required.</span
						>{/if}
				</label>
				<label class="block">
					<span
						class="mb-2 block text-[0.65rem] font-semibold tracking-[0.24em] text-ink/35 uppercase"
						>Date</span
					>
					<input
						class="focus-ring w-full rounded-2xl border bg-white/4 px-4 py-4 text-base text-ink {dateError
							? 'border-danger/60'
							: 'border-white/10'}"
						bind:value={date}
						type="date"
					/>
					{#if dateError}<span class="mt-2 block text-xs text-danger">Date is required.</span>{/if}
				</label>
				<div class="grid grid-cols-[1fr_2fr] gap-3 pt-4">
					<button
						type="button"
						class="focus-ring rounded-2xl border border-white/10 px-5 py-4 text-sm text-ink/45 transition hover:bg-white/4 hover:text-ink/70"
						onclick={onClose}
					>
						Cancel
					</button>
					<button
						type="submit"
						class="focus-ring rounded-2xl border border-lavender/30 bg-linear-to-br from-lavender/20 to-mint/10 px-5 py-4 text-sm font-semibold text-ink transition hover:from-lavender/25 hover:to-mint/15 active:scale-[0.99]"
					>
						{countdown ? 'Save' : 'Create'} →
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
