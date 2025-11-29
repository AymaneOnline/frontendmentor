import { test, expect } from '@playwright/test';

test.describe('Multi-Step Form E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('As a user, I want the form to validate each step so that I can correct my mistakes before moving to the next step', async ({ page }) => {
    // Try to proceed without filling any fields
    await page.click('button:has-text("Next Step")');

    // Should see validation errors
    await expect(page.locator('text=This field is required').first()).toBeVisible();

    // Fill in name correctly but invalid email
    await page.fill('input[placeholder*="Stephen King"]', 'John Doe');
    await page.fill('input[placeholder*="stephenking@lorem.com"]', 'invalid-email');
    await page.fill('input[placeholder*="+1 234 567 890"]', '+1 234 567 890');

    await page.click('button:has-text("Next Step")');

    // Should see email validation error
    await expect(page.locator('text=Invalid email format')).toBeVisible();

    // Fix the email
    await page.fill('input[placeholder*="stephenking@lorem.com"]', 'john@example.com');

    await page.click('button:has-text("Next Step")');

    // Should now proceed to step 2
    await expect(page.locator('h1:has-text("Select your plan")')).toBeVisible();
  });

  test('As a user, I want to return to a previous step so that I can change my order before submitting', async ({ page }) => {
    // Fill step 1
    await page.fill('input[placeholder*="Stephen King"]', 'Jane Smith');
    await page.fill('input[placeholder*="stephenking@lorem.com"]', 'jane@example.com');
    await page.fill('input[placeholder*="+1 234 567 890"]', '+1 555 123 4567');
    await page.click('button:has-text("Next Step")');

    // Step 2: Select a plan
    await page.click('button:has-text("Advanced")');
    await page.click('button:has-text("Next Step")');

    // Step 3: Pick add-ons
    await expect(page.locator('h1:has-text("Pick add-ons")')).toBeVisible();
    await page.click('text=Online service');
    await page.click('button:has-text("Next Step")');

    // Step 4: On summary page
    await expect(page.locator('h1:has-text("Finishing up")')).toBeVisible();

    // Go back to step 3
    await page.click('button:has-text("Go Back")');
    await expect(page.locator('h1:has-text("Pick add-ons")')).toBeVisible();

    // Add more add-ons
    await page.click('text=Larger storage');
    await page.click('button:has-text("Next Step")');

    // Go back to step 2 to change plan
    await page.click('button:has-text("Change")');
    await expect(page.locator('h1:has-text("Select your plan")')).toBeVisible();

    // Change to Pro plan
    await page.click('button:has-text("Pro")');
    await page.click('button:has-text("Next Step")');

    // Verify our selections are preserved (Online service and Larger storage should still be selected)
    const onlineServiceButton = page.locator('button:has-text("Online service")').first();
    await expect(onlineServiceButton).toHaveClass(/bg-magnolia/);

    const largerStorageButton = page.locator('button:has-text("Larger storage")').first();
    await expect(largerStorageButton).toHaveClass(/bg-magnolia/);
  });

  test('As a user, I want to see a summary of the selections I have made so that I can be sure that my order is correct', async ({ page }) => {
    // Complete the form with specific selections

    // Step 1: Personal Info
    await page.fill('input[placeholder*="Stephen King"]', 'Alice Johnson');
    await page.fill('input[placeholder*="stephenking@lorem.com"]', 'alice@example.com');
    await page.fill('input[placeholder*="+1 234 567 890"]', '+1 555 987 6543');
    await page.click('button:has-text("Next Step")');

    // Step 2: Select Pro plan (monthly)
    await page.click('button:has-text("Pro")');
    await expect(page.locator('text=$15/mo')).toBeVisible();
    await page.click('button:has-text("Next Step")');

    // Step 3: Select multiple add-ons
    await page.click('text=Online service');
    await page.click('text=Larger storage');
    await page.click('text=Customizable profile');
    await page.click('button:has-text("Next Step")');

    // Step 4: Verify summary shows correct information
    await expect(page.locator('h1:has-text("Finishing up")')).toBeVisible();

    // Verify plan is displayed correctly
    await expect(page.locator('text=Pro (Monthly)')).toBeVisible();
    await expect(page.locator('text=$15/mo').first()).toBeVisible();

    // Verify all selected add-ons are displayed
    await expect(page.locator('text=Online service')).toBeVisible();
    await expect(page.locator('text=+$1/mo').first()).toBeVisible();

    await expect(page.locator('text=Larger storage')).toBeVisible();
    await expect(page.locator('text=+$2/mo').first()).toBeVisible();

    await expect(page.locator('text=Customizable profile')).toBeVisible();
    // The second +$2/mo for customizable profile

    // Verify total is correct (Pro: $15 + Online: $1 + Storage: $2 + Profile: $2 = $20)
    await expect(page.locator('text=Total (per month)')).toBeVisible();
    await expect(page.locator('text=+$20/mo')).toBeVisible();

    // Confirm the order
    await page.click('button:has-text("Confirm")');

    // Should see thank you page
    await expect(page.locator('h1:has-text("Thank you!")')).toBeVisible();
    await expect(page.locator('text=Thanks for confirming your subscription')).toBeVisible();
  });
});
