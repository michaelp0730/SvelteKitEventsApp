import { fetchAllEvents } from '$lib/server/remote-events';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
    const searchTerm = url.searchParams.get('q')?.trim() || '';

    if (!searchTerm) {
        return {
            searchTerm,
            streamed: {
                events: fetchAllEvents() // Do not await all events. Stream ASAP.
            }
        };
    } else {
        return {
            searchTerm,
            streamed: {
                events: (async () => {
                    const all = await fetchAllEvents(); // Await all events so they can be filtered by the search query
                    const lower = searchTerm.toLowerCase();

                    return all.filter(ev =>
                      ev.title.toLowerCase().includes(lower) ||
                      (ev.description || '').toLowerCase().includes(lower)
                    );
                })()
            }
        };
    }
};
