import { fetchAllEvents } from '$lib/server/remote-events';
import type { PageServerLoad } from './$types';
import { sortEvents } from '$lib/utils/eventSorting';

export const load: PageServerLoad = async ({ url }) => {
	const searchTerm = url.searchParams.get('q')?.trim() || '';
	const sortParam = url.searchParams.get('sort') || '';
	console.log('sortParam', sortParam);
	const clientSort = true;

	if (clientSort) {
		// No search or sort => streaming raw events ASAP
		return {
			searchTerm,
			clientSort,
			sortOption: sortParam,
			streamed: {
				events: await fetchAllEvents()
			}
		};
	} else if (!searchTerm) {
		// No search but we have a sort => fetch, filter, sort
		return {
			searchTerm,
			clientSort,
			sortOption: sortParam,
			streamed: {
				events: (async () => {
					const all = await fetchAllEvents();
					return sortEvents(all, sortParam);
				})()
			}
		};
	} else {
		// We have a search => fetch, filter, then maybe sort
		return {
			searchTerm,
			clientSort,
			sortOption: sortParam,
			streamed: {
				events: (async () => {
					const all = await fetchAllEvents();
					const lower = searchTerm.toLowerCase();
					let filtered = all.filter(
						(ev) =>
							ev.title.toLowerCase().includes(lower) ||
							(ev.description || '').toLowerCase().includes(lower)
					);

					filtered = sortEvents(filtered, sortParam);
					return filtered;
				})()
			}
		};
	}
};
