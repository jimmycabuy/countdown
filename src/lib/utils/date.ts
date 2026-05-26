import type { CountdownStatus, TimeLeft } from '$lib/types';

const DAY_MS = 86_400_000;

export function toLocalDate(date: string): Date {
  return new Date(`${date}T00:00:00`);
}

export function getDayDiff(date: string, now = new Date()): number {
  const target = toLocalDate(date);
  const currentDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetDay = new Date(
    target.getFullYear(),
    target.getMonth(),
    target.getDate()
  );

  return Math.round((targetDay.getTime() - currentDay.getTime()) / DAY_MS);
}

export function getStatus(date: string, now = new Date()): CountdownStatus {
  const diff = getDayDiff(date, now);

  if (diff > 0) return 'future';
  if (diff === 0) return 'today';
  return 'past';
}

export function getTimeLeft(date: string, now = new Date()): TimeLeft | null {
  const diff = toLocalDate(date).getTime() - now.getTime();

  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / DAY_MS),
    hours: Math.floor((diff % DAY_MS) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000)
  };
}

export function formatDate(date: string): string {
  return toLocalDate(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export function padTimeUnit(value: number): string {
  return String(value).padStart(2, '0');
}

export function getTomorrowDateInputValue(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().slice(0, 10);
}
