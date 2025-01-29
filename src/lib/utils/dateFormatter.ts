export function formatDate(isoString: string): string {
	const date = new Date(isoString);
	return new Intl.DateTimeFormat('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: true
	}).format(date);
}
