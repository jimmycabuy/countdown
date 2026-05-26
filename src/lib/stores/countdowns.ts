import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import type { Countdown } from '$lib/types';
import { createCountdown } from '$lib/utils/countdowns';

const STORAGE_KEY = 'countdowns:v1';

function readCountdowns(): Countdown[] {
  if (!browser) return [];

  try {
    const rawValue = localStorage.getItem(STORAGE_KEY);
    if (!rawValue) return [];

    const parsedValue = JSON.parse(rawValue);
    if (!Array.isArray(parsedValue)) return [];

    return parsedValue.filter(isCountdown);
  } catch (error) {
    console.error('Unable to read countdowns from localStorage', error);
    return [];
  }
}

function isCountdown(value: unknown): value is Countdown {
  if (!value || typeof value !== 'object') return false;

  const candidate = value as Partial<Countdown>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.title === 'string' &&
    typeof candidate.date === 'string' &&
    typeof candidate.createdAt === 'string'
  );
}

function persistCountdowns(countdowns: Countdown[]): void {
  if (!browser) return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(countdowns));
  } catch (error) {
    console.error('Unable to persist countdowns to localStorage', error);
  }
}

function createCountdownStore() {
  const { subscribe, set, update } = writable<Countdown[]>(readCountdowns());

  return {
    subscribe,
    add(title: string, date: string) {
      update((countdowns) => {
        const nextCountdowns = [...countdowns, createCountdown(title, date)];
        persistCountdowns(nextCountdowns);
        return nextCountdowns;
      });
    },
    updateOne(id: string, payload: Pick<Countdown, 'title' | 'date'>) {
      update((countdowns) => {
        const nextCountdowns = countdowns.map((countdown) =>
          countdown.id === id
            ? { ...countdown, title: payload.title.trim(), date: payload.date }
            : countdown
        );

        persistCountdowns(nextCountdowns);
        return nextCountdowns;
      });
    },
    remove(id: string) {
      update((countdowns) => {
        const nextCountdowns = countdowns.filter(
          (countdown) => countdown.id !== id
        );
        persistCountdowns(nextCountdowns);
        return nextCountdowns;
      });
    },
    reset() {
      persistCountdowns([]);
      set([]);
    }
  };
}

export const countdowns = createCountdownStore();
