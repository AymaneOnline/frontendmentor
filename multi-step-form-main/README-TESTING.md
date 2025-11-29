# E2E Testing with Playwright - Learning Guide

## Your 3 Essential Tests

I've created exactly 3 tests based on your user stories in `tests/multi-step-form.spec.js`:

### Test 1: Form Validation
**User Story:** "As a user, I want the form to validate each step so that I can correct my mistakes before moving to the next step"

**What it tests:**
- Required field validation
- Email format validation
- Error messages display
- Successful progression when data is valid

### Test 2: Navigate Back to Change Selections
**User Story:** "As a user, I want to return to a previous step so that I can change my order before submitting"

**What it tests:**
- Going back with "Go Back" button
- Going back with "Change" button  
- Data persistence when navigating
- Changing selections on previous steps

### Test 3: View Order Summary
**User Story:** "As a user, I want to see a summary of the selections I've made so that I can be sure that my order is correct"

**What it tests:**
- Summary displays selected plan correctly
- Summary displays all selected add-ons
- Price calculations are accurate
- Thank you page appears after confirmation

## How to Run the Tests

### Run all 3 tests
```bash
npm test
```

### Interactive mode (BEST for learning!)
```bash
npm run test:ui
```
This opens a UI where you can:
- See each test step-by-step
- Watch the browser in action
- Debug failures visually

### See the browser while testing
```bash
npm run test:headed
```

### Debug a specific test
```bash
npm run test:debug
```

## Understanding the Test Structure

Each test follows the same pattern:

```javascript
test('description of what we are testing', async ({ page }) => {
  // 1. ARRANGE - Navigate to page
  await page.goto('/');
  
  // 2. ACT - Perform user actions
  await page.click('button');
  await page.fill('input', 'value');
  
  // 3. ASSERT - Verify expected outcomes
  await expect(page.locator('text=Expected')).toBeVisible();
});
```

## Key Playwright Concepts

### Selectors (how to find elements)
```javascript
// By text content
page.locator('text=Next Step')
page.locator('h1:has-text("Personal info")')

// By placeholder attribute
page.fill('input[placeholder*="Stephen King"]', 'John Doe')

// By button text
page.click('button:has-text("Confirm")')
```

### Actions (what users do)
```javascript
await page.click('button')        // Click an element
await page.fill('input', 'text')  // Type in an input
await page.goto('/')              // Navigate to page
```

### Assertions (verify things are correct)
```javascript
await expect(element).toBeVisible()           // Element is visible
await expect(element).toHaveText('expected')  // Has specific text
await expect(element).toHaveClass(/class/)    // Has a CSS class
```

## Learning Exercise

Try modifying the tests:

1. **Add a new assertion** - Verify the phone number field accepts different formats
2. **Test yearly billing** - Modify test 3 to toggle yearly and check different prices
3. **Add a failing test** - Write a test that fails, then fix the app to make it pass

## Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Writing Tests Guide](https://playwright.dev/docs/writing-tests)
- [Selectors Guide](https://playwright.dev/docs/selectors)
- [Debugging Tests](https://playwright.dev/docs/debug)

Happy testing! 🎭
