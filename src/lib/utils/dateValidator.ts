export function validateDate(eventDate: string | null): string | null {
	if (!eventDate) return "Date is required";

	const selectedDate = new Date(eventDate);
	const now = new Date();

	if (selectedDate < now) {
		return "Event date cannot be in the past";
	}

	return null;
}
