<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import { writable } from 'svelte/store';
	import { validateDate } from '$lib/utils/dateValidator';

	export let data: PageData;

	let saving = false;
	const dateError = writable<string | null>(null);

	let eventTitle: string = data.event?.title ?? '';
	let eventDescription: string = data.event?.description ?? '';
	let eventDate: string = data.event?.date ?? '';

	function checkDate() {
		dateError.set(validateDate(eventDate));
	}
</script>

<div class="container mx-auto flex justify-center items-center min-h-screen">
	<div class="card w-full max-w-lg bg-base-100 shadow-xl p-6">
		<h2 class="text-2xl font-bold text-center mb-4">Edit Event</h2>
		<form
			method="POST"
			class="space-y-4"
			use:enhance={() => {
				saving = true;
				return async ({ update }) => {
					await update();
					saving = false;
				};
			}}
		>
			<label for="title" class="block text-sm font-medium">Title</label>
			<input
				type="text"
				id="title"
				name="title"
				required
				class="input input-bordered w-full"
				bind:value={eventTitle}
			/>

			<label for="description" class="block text-sm font-medium">Description</label>
			<textarea
				id="description"
				name="description"
				rows="4"
				class="textarea textarea-bordered w-full"
				bind:value={eventDescription}
			></textarea>

			<label for="date" class="block text-sm font-medium">Date</label>
			<input
				type="datetime-local"
				id="date"
				name="date"
				required
				class="input input-bordered w-full"
				bind:value={eventDate}
				on:change={checkDate}
			/>

			{#if $dateError}
				<p class="text-red-500 text-sm">{$dateError}</p>
			{/if}

			<button type="submit" class="btn btn-primary" disabled={saving}>
				{#if saving}
					<span class="loading loading-spinner"></span> Saving...
				{:else}
					Save Changes
				{/if}
			</button>
		</form>
	</div>
</div>
