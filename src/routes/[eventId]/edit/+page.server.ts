import { fetchEventById, updateEventById } from '$lib/server/remote-events';
import { redirect, error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const id = Number(params.eventId);
	const event = await fetchEventById(id);
	return { event };
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const id = Number(params.eventId);
		const formData = await request.formData();

		const title = formData.get('title') as string;
		const description = formData.get('description') as string;
		const date = formData.get('date') as string;

		if (!title || !date) {
			throw error(400, 'Title and Date are required');
		}

		const selectedDate = new Date(date);
		const now = new Date();
		if (selectedDate < now) {
			throw error(400, 'Event date cannot be in the past');
		}

		await updateEventById(id, { title, description, date });
		throw redirect(303, '/');
	}
};
