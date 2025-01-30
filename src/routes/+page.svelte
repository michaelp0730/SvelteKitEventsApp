<script lang="ts">
	import type { PageData } from "./$types";
  import { confirmDelete } from '$lib/utils/deleteConfirmation';
  import { formatDate } from '$lib/utils/dateFormatter.js';

  let {data}: {data: PageData} = $props();
</script>

<div class="container mx-auto max-w-3xl p-6">
    <h1 class="text-3xl font-bold text-center text-white mb-6">Welcome to SvelteKit</h1>
    <p class="text-center text-gray-300">
        Visit <a href="https://svelte.dev/docs/kit" class="text-blue-400 underline">svelte.dev/docs/kit</a> to read the documentation
    </p>

    <div class="flex justify-between items-center mt-10">
        <h2 class="text-2xl font-semibold text-gray-200">Events</h2>
        <a class="btn btn-primary text-white" href="/newevent" role="button">➕ Add Event</a>
    </div>

    <div class="mt-6 space-y-4">
        {#await data.streamed.events}
            <p class="text-gray-400">Loading events...</p>
        {:then events}
            {#each events as event}
                <div class="card bg-base-100 border border-indigo-900 shadow-md p-4">
                    <h2 class="text-lg font-bold">
                        <a href="/{event.id}" class="text-primary hover:underline">{event.id}: {event.title}</a>
                    </h2>
                    <p class="text-gray-300">{event.description || "No description provided"}</p>
                    <p class="text-sm text-gray-400 mb-4">{formatDate(event.date)}</p>
                    <div class="flex gap-2">
                        <a href="/{event.id}" class="btn btn-outline btn-sm">View</a>
                        <a href="/{event.id}/edit" class="btn btn-accent btn-outline btn-sm">Edit</a>
                        <form method="POST" action="/{event.id}/delete" onsubmit={confirmDelete}>
                            <button type="submit" class="btn btn-error btn-outline btn-sm">
                                Delete
                            </button>
                        </form>
                    </div>
                </div>
            {/each}
        {/await}
    </div>
</div>
