export function confirmDelete(e: SubmitEvent) {
	const ok = window.confirm('Are you sure you want to delete this event?');
	if (!ok) {
		e.preventDefault();
	}
}
