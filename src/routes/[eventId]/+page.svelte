<script lang="ts">
	import type { PageData } from './$types';
	import { confirmDelete } from '$lib/utils/deleteConfirmation';
	import { formatDate } from '$lib/utils/dateFormatter.js';

	export let data: PageData;
</script>

<div class="container mx-auto max-w-2xl p-6">
	<div class="card bg-base-100 shadow-xl p-6">
		{#if data.event}
			<h1 class="text-3xl font-bold text-center text-white mb-4">Event Details</h1>

			<div class="space-y-4 mb-4">
				<h2 class="text-2xl font-bold text-primary">{data.event.id}: {data.event.title}</h2>
				<p class="text-gray-300">{data.event.description || 'No description provided'}</p>
				<p class="text-sm text-gray-400">Event date: {formatDate(data.event.date)}</p>
			</div>

			<div class="flex gap-2">
				<a href="/{data.event.id}/edit" class="btn btn-accent btn-outline btn-sm">Edit</a>
				<form method="POST" action="/{data.event.id}/delete" onsubmit={confirmDelete}>
					<button type="submit" class="btn btn-error btn-outline btn-sm">Delete</button>
				</form>
			</div>

			<div class="mt-6 text-center">
				<a href="/" class="btn btn-secondary">🏠 Back to Events</a>
			</div>
		{:else}
			<p class="text-red-500 p-4">Event not found</p>
		{/if}
	</div>
</div>
