import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from './base.page';

export class GuiElementsPage extends BasePage {
  // Text Input Fields
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly addressInput: Locator;

  // Radio Buttons
  readonly maleRadio: Locator;
  readonly femaleRadio: Locator;

  // Checkboxes
  readonly sundayCheckbox: Locator;
  readonly mondayCheckbox: Locator;
  readonly tuesdayCheckbox: Locator;
  readonly wednesdayCheckbox: Locator;
  readonly thursdayCheckbox: Locator;
  readonly fridayCheckbox: Locator;
  readonly saturdayCheckbox: Locator;

  // Dropdowns and Selects
  readonly countryDropdown: Locator;
  readonly colorsListbox: Locator;
  readonly sortedListListbox: Locator;

  // Date Pickers
  readonly datePicker1: Locator;
  readonly datePicker2: Locator;
  readonly startDatePicker: Locator;
  readonly endDatePicker: Locator;

  // Buttons
  readonly submitButton: Locator;

  // Heading
  readonly guiElementsHeading: Locator;

  constructor(page: Page) {
    super(page);

    // Initialize text input fields
    this.nameInput = page.locator('input[placeholder="Enter Name"]');
    this.emailInput = page.locator('input[placeholder="Enter EMail"]');
    this.phoneInput = page.locator('input[placeholder="Enter Phone"]');
    this.addressInput = page.locator('textarea[placeholder="Address:"]');

    // Initialize radio buttons
    this.maleRadio = page.locator('input[value="Male"]');
    this.femaleRadio = page.locator('input[value="Female"]');

    // Initialize checkboxes
    this.sundayCheckbox = page.locator('input[value="Sunday"]');
    this.mondayCheckbox = page.locator('input[value="Monday"]');
    this.tuesdayCheckbox = page.locator('input[value="Tuesday"]');
    this.wednesdayCheckbox = page.locator('input[value="Wednesday"]');
    this.thursdayCheckbox = page.locator('input[value="Thursday"]');
    this.fridayCheckbox = page.locator('input[value="Friday"]');
    this.saturdayCheckbox = page.locator('input[value="Saturday"]');

    // Initialize dropdowns and selects
    this.countryDropdown = page.locator('select[name="country"]');
    this.colorsListbox = page.locator('select[name="colors"]');
    this.sortedListListbox = page.locator('select[name="animals"]');

    // Initialize date pickers
    this.datePicker1 = page.locator('input[placeholder="mm/dd/yyyy"]');
    this.datePicker2 = page.locator('input[placeholder="dd/mm/yyyy"]');
    this.startDatePicker = page.locator('input[placeholder="Start Date"]');
    this.endDatePicker = page.locator('input[placeholder="End Date"]');

    // Initialize buttons
    this.submitButton = page.locator('button:has-text("Submit")').first();

    // Initialize heading
    this.guiElementsHeading = page.getByRole('heading', { name: 'GUI Elements' });
  }

  /**
   * Navigate to the GUI Elements page
   */
  async goto(): Promise<void> {
    await this.open('https://testautomationpractice.blogspot.com/');
  }

  /**
   * Enter name in the Name input field
   */
  async enterName(name: string): Promise<void> {
    await this.nameInput.fill(name);
  }

  /**
   * Enter email in the Email input field
   */
  async enterEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  /**
   * Enter phone in the Phone input field
   */
  async enterPhone(phone: string): Promise<void> {
    await this.phoneInput.fill(phone);
  }

  /**
   * Enter address in the Address textarea
   */
  async enterAddress(address: string): Promise<void> {
    await this.addressInput.fill(address);
  }

  /**
   * Select gender (Male or Female)
   */
  async selectGender(gender: 'Male' | 'Female'): Promise<void> {
    if (gender === 'Male') {
      await this.maleRadio.check();
    } else {
      await this.femaleRadio.check();
    }
  }

  /**
   * Check one or more days
   */
  async selectDays(days: string[]): Promise<void> {
    const dayCheckboxMap: { [key: string]: Locator } = {
      Sunday: this.sundayCheckbox,
      Monday: this.mondayCheckbox,
      Tuesday: this.tuesdayCheckbox,
      Wednesday: this.wednesdayCheckbox,
      Thursday: this.thursdayCheckbox,
      Friday: this.fridayCheckbox,
      Saturday: this.saturdayCheckbox,
    };

    for (const day of days) {
      if (dayCheckboxMap[day]) {
        await dayCheckboxMap[day].check();
      }
    }
  }

  /**
   * Select country from dropdown
   */
  async selectCountry(country: string): Promise<void> {
    await this.countryDropdown.selectOption(country);
  }

  /**
   * Select one or more colors from the colors listbox
   */
  async selectColors(colors: string[]): Promise<void> {
    await this.colorsListbox.selectOption(colors);
  }

  /**
   * Select animal from the sorted list
   */
  async selectAnimal(animal: string): Promise<void> {
    await this.sortedListListbox.selectOption(animal);
  }

  /**
   * Enter date in Date Picker 1 (mm/dd/yyyy format)
   */
  async enterDatePicker1(date: string): Promise<void> {
    await this.datePicker1.fill(date);
  }

  /**
   * Enter date in Date Picker 2 (dd/mm/yyyy format)
   */
  async enterDatePicker2(date: string): Promise<void> {
    await this.datePicker2.fill(date);
  }

  /**
   * Enter start date in date range picker
   */
  async enterStartDate(date: string): Promise<void> {
    await this.startDatePicker.fill(date);
  }

  /**
   * Enter end date in date range picker
   */
  async enterEndDate(date: string): Promise<void> {
    await this.endDatePicker.fill(date);
  }

  /**
   * Submit the form
   */
  async submitForm(): Promise<void> {
    await this.submitButton.click();
  }

  /**
   * Verify page is loaded
   */
  async expectPageLoaded(): Promise<void> {
    await expect(this.guiElementsHeading).toBeVisible();
  }

  /**
   * Get the value from an input field
   */
  async getInputValue(field: 'name' | 'email' | 'phone' | 'address'): Promise<string | null> {
    const fieldMap: { [key: string]: Locator } = {
      name: this.nameInput,
      email: this.emailInput,
      phone: this.phoneInput,
      address: this.addressInput,
    };

    return await fieldMap[field].inputValue().catch(() => null);
  }

  /**
   * Verify a specific day is checked
   */
  async isDayChecked(day: string): Promise<boolean> {
    const dayCheckboxMap: { [key: string]: Locator } = {
      Sunday: this.sundayCheckbox,
      Monday: this.mondayCheckbox,
      Tuesday: this.tuesdayCheckbox,
      Wednesday: this.wednesdayCheckbox,
      Thursday: this.thursdayCheckbox,
      Friday: this.fridayCheckbox,
      Saturday: this.saturdayCheckbox,
    };

    const checkbox = dayCheckboxMap[day];
    return await checkbox.isChecked().catch(() => false);
  }

  /**
   * Verify a specific gender is selected
   */
  async isGenderSelected(gender: 'Male' | 'Female'): Promise<boolean> {
    const radio = gender === 'Male' ? this.maleRadio : this.femaleRadio;
    return await radio.isChecked().catch(() => false);
  }

  /**
   * Clear all form fields
   */
  async clearForm(): Promise<void> {
    await this.nameInput.clear();
    await this.emailInput.clear();
    await this.phoneInput.clear();
    await this.addressInput.clear();
  }

  /**
   * Fill entire form with data
   */
  async fillForm(formData: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    gender?: 'Male' | 'Female';
    days?: string[];
    country?: string;
    colors?: string[];
    animal?: string;
    datePicker1?: string;
    datePicker2?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<void> {
    if (formData.name) await this.enterName(formData.name);
    if (formData.email) await this.enterEmail(formData.email);
    if (formData.phone) await this.enterPhone(formData.phone);
    if (formData.address) await this.enterAddress(formData.address);
    if (formData.gender) await this.selectGender(formData.gender);
    if (formData.days) await this.selectDays(formData.days);
    if (formData.country) await this.selectCountry(formData.country);
    if (formData.colors) await this.selectColors(formData.colors);
    if (formData.animal) await this.selectAnimal(formData.animal);
    if (formData.datePicker1) await this.enterDatePicker1(formData.datePicker1);
    if (formData.datePicker2) await this.enterDatePicker2(formData.datePicker2);
    if (formData.startDate) await this.enterStartDate(formData.startDate);
    if (formData.endDate) await this.enterEndDate(formData.endDate);
  }
}
