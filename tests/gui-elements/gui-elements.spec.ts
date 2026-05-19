import { test, expect } from '@playwright/test';
import { GuiElementsPage } from '../../pages/gui-elements.page';

test.describe('GUI Elements Form Tests', () => {
  let guiElementsPage: GuiElementsPage;

  test.beforeEach(async ({ page }) => {
    guiElementsPage = new GuiElementsPage(page);
    await guiElementsPage.goto();
    await guiElementsPage.expectPageLoaded();
  });

  test('should enter name "aravind" in the name field', async () => {
    // Enter name
    await guiElementsPage.enterName('aravind');

    // Verify the name is entered
    const nameValue = await guiElementsPage.getInputValue('name');
    expect(nameValue).toBe('aravind');
  });

  test('should fill entire form with sample data including name', async () => {
    const formData = {
      name: 'aravind',
      email: 'aravind@example.com',
      phone: '9876543210',
      address: '123 Test Street, Test City',
      gender: 'Male' as const,
      days: ['Monday', 'Wednesday', 'Friday'],
      country: 'India',
      colors: ['Red', 'Blue'],
      animal: 'Lion',
      datePicker1: '05/20/2026',
      datePicker2: '20/05/2026',
      startDate: '05/01/2026',
      endDate: '05/31/2026',
    };

    // Fill the form
    await guiElementsPage.fillForm(formData);

    // Verify all fields are filled correctly
    expect(await guiElementsPage.getInputValue('name')).toBe('aravind');
    expect(await guiElementsPage.getInputValue('email')).toBe('aravind@example.com');
    expect(await guiElementsPage.getInputValue('phone')).toBe('9876543210');
    expect(await guiElementsPage.isGenderSelected('Male')).toBe(true);
    expect(await guiElementsPage.isDayChecked('Monday')).toBe(true);
    expect(await guiElementsPage.isDayChecked('Wednesday')).toBe(true);
    expect(await guiElementsPage.isDayChecked('Friday')).toBe(true);
  });

  test('should enter name and verify it is visible', async () => {
    // Enter name
    await guiElementsPage.enterName('aravind');

    // Verify the input field contains the value
    await expect(guiElementsPage.nameInput).toHaveValue('aravind');
  });

  test('should select gender as Male', async () => {
    await guiElementsPage.selectGender('Male');
    expect(await guiElementsPage.isGenderSelected('Male')).toBe(true);
  });

  test('should select multiple days', async () => {
    const days = ['Monday', 'Wednesday', 'Friday'];
    await guiElementsPage.selectDays(days);

    for (const day of days) {
      expect(await guiElementsPage.isDayChecked(day)).toBe(true);
    }
  });

  test('should select country from dropdown', async () => {
    await guiElementsPage.selectCountry('India');
    await expect(guiElementsPage.countryDropdown).toHaveValue('India');
  });

  test('should enter date in date picker fields', async () => {
    await guiElementsPage.enterDatePicker1('05/20/2026');
    await expect(guiElementsPage.datePicker1).toHaveValue('05/20/2026');

    await guiElementsPage.enterDatePicker2('20/05/2026');
    await expect(guiElementsPage.datePicker2).toHaveValue('20/05/2026');
  });

  test('should enter date range', async () => {
    await guiElementsPage.enterStartDate('05/01/2026');
    await guiElementsPage.enterEndDate('05/31/2026');

    await expect(guiElementsPage.startDatePicker).toHaveValue('05/01/2026');
    await expect(guiElementsPage.endDatePicker).toHaveValue('05/31/2026');
  });
});
