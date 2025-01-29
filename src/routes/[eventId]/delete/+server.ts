import { deleteEventById } from '$lib/server/remote-events';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ params }) => {
	const id = Number(params.eventId);
	await deleteEventById(id);

	return new Response(null, {
		status: 303,
		headers: { location: '/' }
	})
};
