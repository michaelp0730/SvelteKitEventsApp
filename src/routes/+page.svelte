<script lang="ts">
    import type { PageData } from "./$types";
    import { confirmDelete } from '$lib/utils/deleteConfirmation';
    import { formatDate } from '$lib/utils/dateFormatter.js';
    import { goto } from '$app/navigation';

    let {data}: {data: PageData} = $props();
    let searchQuery: string = $state(data.searchTerm || '');

    function clearSearch() {
        searchQuery = '';
        goto('/');
    }

    function setSort(sort: string) {
        let url = '/?sort=' + sort;
        if (searchQuery) {
            url += `&q=${encodeURIComponent(searchQuery)}`;
        }

        goto(url);
    }
</script>

<div class="container mx-auto max-w-5xl p-6">
    <h1 class="text-3xl font-bold text-center text-white mb-6">Event Planning App</h1>

    <div class="flex justify-between items-center mt-10">
        <h2 class="text-2xl font-semibold text-gray-200">Events</h2>
        <a class="btn btn-primary text-white" href="/newevent" role="button">➕ Add Event</a>
    </div>

    <div class="mt-6 space-y-4">
        <form method="GET" class="flex gap-2 mb-4">
            <input
              type="text"
              name="q"
              placeholder="Search events..."
              class="input input-bordered w-full"
              bind:value={searchQuery}
            />
            <button type="submit" class="btn btn-outline">
                Search
            </button>
            {#if searchQuery}
                <button type="button" class="btn btn-secondary" onclick={clearSearch}>
                    ❌ Clear
                </button>
            {/if}
        </form>
    </div>

    <div class="grid grid-cols-12 gap-4">
        <div class="col-span-8 mt-6">
            <div class="space-y-4">
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
        <div class="col-span-4 mt-6">
            <h2 class="text-xl font-semibold mb-2">Sort Events</h2>
            <button class="btn btn-outline w-full mb-2" onclick={() => setSort('date')}>
                Sort by Date
            </button>
            <button class="btn btn-outline w-full" onclick={() => setSort('title')}>
                Sort by Title
            </button>
        </div>
    </div>

</div>
