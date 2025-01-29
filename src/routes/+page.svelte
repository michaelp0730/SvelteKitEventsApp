<script lang="ts">
	import type { PageData } from "./$types";

    let {data}: {data: PageData} = $props();
</script>

<div class="container mx-auto max-w-3xl p-6">
    <h1 class="text-3xl font-bold text-center text-white mb-6">Welcome to SvelteKit</h1>
    <p class="text-center text-gray-300">
        Visit <a href="https://svelte.dev/docs/kit" class="text-blue-400 underline">svelte.dev/docs/kit</a> to read the documentation
    </p>

    <div class="flex justify-between items-center mt-10">
        <h1 class="text-2xl font-semibold text-gray-200">Events</h1>
        <a class="btn btn-primary text-white" href="/newevent" role="button">➕ Add Event</a>
    </div>

    <div class="mt-6 space-y-4">
        {#each data.events as event}
            <div class="card bg-base-100 shadow-md p-4">
                <h2 class="text-lg font-bold text-white">{event.id}: {event.title}</h2>
                <p class="text-gray-300">{event.description || "No description provided."}</p>
                <p class="text-sm text-gray-400">{event.date}</p>
            </div>
        {/each}
    </div>
</div>
