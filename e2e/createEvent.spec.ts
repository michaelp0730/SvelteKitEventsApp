import { test, expect } from '@playwright/test';

test('creates a new event', async ({ page }) => {
	// Visit the home page and validate <h1> text
	await page.goto('/');
	await expect(page.locator('h1')).toContainText('Event Planning App');

	// Visit the Add Event page and fill out the form
	await page.click('text=➕ Add Event');
	await page.fill('#title', 'My E2E Test Event');
	await page.fill('#date', '2027-01-01T12:00');
	await page.fill('#description', 'Created by Playwright test');

	// Submit the form
	await Promise.all([page.waitForNavigation(), page.click('text=Create Event')]);

	// Confirm it appears on the home page
	await expect(page.locator('text=My E2E Test Event')).toBeVisible();
});
