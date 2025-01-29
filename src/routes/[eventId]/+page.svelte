<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<div class="container mx-auto max-w-2xl p-6">
    <div class="card bg-base-100 shadow-xl p-6">
        {#if data.event}
            <h1 class="text-3xl font-bold text-center text-white mb-4">Event Details</h1>

            <div class="space-y-4">
                <h2 class="text-2xl font-bold text-primary">{data.event.id}: {data.event.title}</h2>
                <p class="text-gray-300">{data.event.description || "No description provided."}</p>
                <p class="text-sm text-gray-400">{data.event.date}</p>
            </div>

            <div class="mt-6 text-center">
                <a href="/" class="btn btn-secondary">🏠 Back to Events</a>
            </div>
        {/if}
    </div>
</div>
