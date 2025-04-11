import { expect, test } from '@playwright/test';

test('playing the metronome and handling events', async ({ page }) => {
  await page.goto('http://localhost:8080/e2e');

  // Start the metronome and ensure that is starts beating
  await page.click('button:has-text("Start Metronome")');
  await expect(page.locator('text="onBeatStart: Beat: 1 / Total Beats: 1"')).toBeVisible();
  await expect(page.locator('text="onBeatInterval: 0"')).toBeVisible();

  // pause and resume the metronome
  // hard to know that it truly paused, but at least helps to ensure it doesn't completely crash
  await page.click('button:has-text("Pause Metronome")');
  await page.click('button:has-text("Resume Metronome")');

  // now verify it runs to the end (especially after pause)
  await expect(page.locator('text="onBeatStart: Beat: 1 / Total Beats: 5"')).toBeVisible();
  await expect(page.locator('text="onBeatInterval: 1"')).toBeVisible();
  await expect(page.locator('text="onEnd"')).toBeVisible();
});
