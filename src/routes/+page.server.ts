import { fetchAllEvents } from '$lib/server/remote-events';
import type { Event as AppEvent } from '$lib/server/remote-events';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
    const searchTerm = url.searchParams.get('q')?.trim() || '';
    const sortParam = url.searchParams.get('sort') || '';
    console.log('sort param', sortParam);

    if (!searchTerm && !sortParam) {
        // No search or sort => streaming raw events ASAP
        return {
            searchTerm,
            streamed: {
                events: fetchAllEvents()
            }
        };
    } else if (!searchTerm) {
        // No search but we have a sort => fetch, filter, sort
        return {
            searchTerm,
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
            sortOption: sortParam,
            streamed: {
                events: (async () => {
                    const all = await fetchAllEvents();
                    const lower = searchTerm.toLowerCase();
                    let filtered = all.filter(ev =>
                        ev.title.toLowerCase().includes(lower) ||
                        (ev.description || '').toLowerCase().includes(lower)
                    );
                    console.log('filtered pre-sort', filtered);

                    filtered = sortEvents(filtered, sortParam);
                    return filtered;
                })()
            }
        };
    }
};

function sortEvents(events: AppEvent[], sortParam: string): AppEvent[] {
    const copy = [...events];
    console.log('copy: ', copy);
    if (sortParam === 'title') {
        copy.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortParam === 'date') {
        copy.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    return copy;
}
