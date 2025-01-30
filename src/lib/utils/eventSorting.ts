import type { Event as AppEvent } from '$lib/server/remote-events';

export function sortEvents(events: AppEvent[], sortParam: string): AppEvent[] {
	const copy = [...events];
	if (sortParam === 'title') {
		copy.sort((a, b) => a.title.localeCompare(b.title));
	} else if (sortParam === 'date') {
		copy.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	}
	return copy;
}
