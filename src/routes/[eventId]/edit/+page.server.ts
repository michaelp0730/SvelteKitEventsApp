import { fetchEventById, updateEventById } from '$lib/server/remote-events';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

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

		await updateEventById(id, { title, description, date });
		throw redirect(303, '/');
	}
};
