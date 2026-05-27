<script lang="ts">
	import { DatePicker } from '@svelte-plugins/datepicker';
	import { format } from 'date-fns';
	import type { Countdown } from '$lib/types';
	import {
		getTomorrowDateInputValue,
		parseDateInputValue,
		toDateInputValue
	} from '$lib/utils/date';

	const pickerDateFormat = 'dd/MM/yyyy';

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
	let isDatePickerOpen = $state(false);
	let pickerDate = $state<Date | null>(parseDateInputValue(getTomorrowDateInputValue()));
	let formattedPickerDate = $state('');

	let titleError = $derived(hasSubmitted && title.trim().length === 0);
	let dateError = $derived(hasSubmitted && date.length === 0);

	function formatPickerValue(value: Date | string | number | null | undefined): string {
		if (!value) return '';

		const parsedDate = value instanceof Date ? value : new Date(value);

		if (Number.isNaN(parsedDate.getTime())) return '';

		return format(parsedDate, pickerDateFormat);
	}

	$effect(() => {
		if (!open) return;

		const initialDate = countdown?.date ?? getTomorrowDateInputValue();

		title = countdown?.title ?? '';
		date = initialDate;
		pickerDate = parseDateInputValue(initialDate);
		formattedPickerDate = formatPickerValue(initialDate);
		isDatePickerOpen = false;
		hasSubmitted = false;
	});

	function toggleDatePicker() {
		isDatePickerOpen = !isDatePickerOpen;
	}

	function handleDateChange() {
		const nextDateValue = toDateInputValue(pickerDate);

		if (!nextDateValue) return;

		date = nextDateValue;
		formattedPickerDate = formatPickerValue(pickerDate);
		isDatePickerOpen = false;
	}

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
					<p class="mb-4 font-mono text-[0.65rem] text-lavender/70 uppercase">
						{countdown ? 'Edit' : 'New'}
					</p>
					<h2 id="countdown-modal-title" class="font-display text-3xl leading-tight text-ink">
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
					<span class="mb-2 block text-[0.65rem] font-semibold text-ink/35 uppercase">Title</span>
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

				<div class="block">
					<span class="mb-2 block text-[0.65rem] font-semibold text-ink/35 uppercase">Date</span>
					<DatePicker
						bind:isOpen={isDatePickerOpen}
						bind:startDate={pickerDate}
						onDateChange={handleDateChange}
						theme="countdown-datepicker"
						includeFont={false}
						enableFutureDates={true}
						showYearControls={true}
					>
						<input
							type="text"
							readonly
							class="focus-ring w-full rounded-2xl border bg-white/4 px-4 py-4 text-base text-ink placeholder:text-ink/20 {dateError
								? 'border-danger/60'
								: 'border-white/10'}"
							placeholder="Select a date"
							bind:value={formattedPickerDate}
							onclick={toggleDatePicker}
						/>
					</DatePicker>
					{#if dateError}<span class="mt-2 block text-xs text-danger">Date is required.</span>{/if}
				</div>

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

<style>
	:global(.datepicker[data-picker-theme='countdown-datepicker']) {
		--datepicker-color: #f0ede8;
		--datepicker-font-family: 'Krona One', sans-serif;
		--datepicker-state-active: #c8b8ff;
		--datepicker-state-hover: rgba(200, 184, 255, 0.16);
		--datepicker-border-color: rgba(255, 255, 255, 0.1);
		--datepicker-container-background: #171323;
		--datepicker-container-border: 1px solid rgba(255, 255, 255, 0.08);
		--datepicker-container-border-radius: 1.25rem;
		--datepicker-container-box-shadow: 0 30px 80px rgba(0, 0, 0, 0.34);
		--datepicker-container-top: auto;
		--datepicker-container-width: min(100%, 19rem);
		--datepicker-calendar-width: 100%;
		--datepicker-calendar-padding: 1rem;
		--datepicker-calendar-header-padding: 0.5rem 0.25rem 1rem;
		--datepicker-calendar-header-margin: 0 0 0.75rem;
		--datepicker-calendar-header-font-size: 1rem;
		--datepicker-calendar-header-color: #f0ede8;
		--datepicker-calendar-header-text-color: #f0ede8;
		--datepicker-calendar-header-text-font-size: 0.9rem;
		--datepicker-calendar-header-text-font-weight: 400;
		--datepicker-calendar-day-width: 2.35rem;
		--datepicker-calendar-day-height: 2.35rem;
		--datepicker-calendar-day-font-size: 0.8rem;
		--datepicker-calendar-day-color: #f0ede8;
		--datepicker-calendar-day-color-hover: #f0ede8;
		--datepicker-calendar-day-background-hover: rgba(255, 255, 255, 0.08);
		--datepicker-calendar-day-other-color: rgba(240, 237, 232, 0.24);
		--datepicker-calendar-day-color-disabled: rgba(240, 237, 232, 0.22);
		--datepicker-calendar-dow-color: rgba(240, 237, 232, 0.45);
		--datepicker-calendar-dow-font-size: 0.72rem;
		--datepicker-calendar-header-month-nav-background-hover: rgba(255, 255, 255, 0.08);
		--datepicker-calendar-header-month-nav-icon-next-filter: invert(1);
		--datepicker-calendar-header-month-nav-icon-prev-filter: invert(1);
		--datepicker-calendar-header-year-nav-icon-next-filter: invert(1);
		--datepicker-calendar-header-year-nav-icon-prev-filter: invert(1);
		--datepicker-calendar-today-border: 1px solid rgba(126, 232, 200, 0.9);
		--datepicker-calendar-range-selected-background: #c8b8ff;
		--datepicker-calendar-range-selected-color: #08080f;
	}

	:global(.datepicker[data-picker-theme='countdown-datepicker'] .calendars-container) {
		top: unset;
		bottom: 0;
		width: 100% !important;
	}

	@media (max-width: 767px) {
		:global(.datepicker[data-picker-theme='countdown-datepicker']) {
			--datepicker-container-width: min(100%, calc(100vw - 5.5rem));
			--datepicker-calendar-padding: 0.9rem 0.75rem 0.8rem;
			--datepicker-calendar-day-width: min(2.2rem, calc((100vw - 9.5rem) / 7));
			--datepicker-calendar-day-height: min(2.2rem, calc((100vw - 9.5rem) / 7));
		}
	}
</style>
