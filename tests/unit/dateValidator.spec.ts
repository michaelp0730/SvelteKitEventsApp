import { describe, it, expect } from 'vitest';
import { validateDate } from '$lib/utils/dateValidator';

describe('validateDate', () => {
	it('returns an error if date is in the past', () => {
		const past = '2000-01-01T00:00';
		expect(validateDate(past)).toContain('cannot be in the past');
	});

	it('returns null if date is in the future', () => {
		const future = '3000-01-01T00:00';
		expect(validateDate(future)).toBeNull();
	});
});
