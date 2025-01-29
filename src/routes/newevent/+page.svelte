<script lang="ts">
    import { enhance } from '$app/forms';

    let creating = $state(false);
</script>

<div class="container mx-auto flex justify-center items-center min-h-screen">
    <div class="card w-full max-w-lg bg-base-100 shadow-xl p-6">
        <h2 class="text-2xl font-bold text-center mb-4">Create New Event</h2>
        <form method="POST" class="space-y-4" use:enhance={() => {
            creating = true;
            return async ({ update }) => {
                await update();
                creating = false;
            };
        }}>
            <label for="title" class="block text-sm font-medium">Title</label>
            <input type="text" id="title" name="title" required class="input input-bordered w-full">

            <label for="description" class="block text-sm font-medium">Description</label>
            <textarea id="description" name="description" rows="4" class="textarea textarea-bordered w-full" placeholder="Description"></textarea>

            <label for="date" class="block text-sm font-medium">Date</label>
            <input type="datetime-local" id="date" name="date" required class="input input-bordered w-full">

            <button type="submit" class="btn btn-primary flex items-center" disabled={creating}>
                {#if creating}
                    <span class="loading loading-spinner"></span>
                    Submitting...
                {:else}
                    Create Event
                {/if}
            </button>
        </form>
    </div>
</div>
