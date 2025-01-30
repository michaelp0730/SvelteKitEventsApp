import { describe, it, expect } from 'vitest';
import { formatDate } from '$lib/utils/dateFormatter';

describe('formatDate', () => {
	it('formats a valid ISO date string correctly', () => {
		const date = '2025-01-29T10:01:00Z';
		const formatted = formatDate(date);

		expect(formatted).toContain('Wednesday, January 29, 2025');
	});

	it('throws an error for invalid date strings', () => {
		expect(() => formatDate('invalid-date')).toThrow();
	});
});
