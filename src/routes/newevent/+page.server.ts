import { createEvent } from '$lib/server/remote-events';
import type { Actions } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request }) => {
		const formdata = await request.formData();
		const title = formdata.get('title')?.toString();
		const description = formdata.get('description')?.toString();
		const date = formdata.get('date')?.toString();
		if (!title || !date) {
			error(400, 'Title and Date are required');
		}

		const selectedDate = new Date(date);
		const now = new Date();
		if (selectedDate < now) {
			throw error(400, 'Event date cannot be in the past');
		}

		const newEvent = await createEvent({ title, description, date });
		redirect(303, `/${newEvent.id}`);
	}
};
