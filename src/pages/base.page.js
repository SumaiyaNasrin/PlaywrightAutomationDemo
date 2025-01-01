import { logger } from "../utils/logger.util";
import { allure } from "allure-playwright";

export class BasePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Execute action
   *
   * @param description action description
   * @param action action
   **/
  async executeAction(description, action) {
    try {
      logger.info(`Execute step: ${description}`);
      await allure.step(description, async () => await action());
    } catch (error) {
      logger.error(
        `Error found in step: ${description}\nerror message: ${error.message}`
      );
      throw error;
    }
  }

  /**
   * Navigate to application URL
   *
   * @param url URL
   **/
  async navigateToURL(url) {
    await this.executeAction(
      `Navigated to: "${url}" successfully`,
      async () => {
        await this.page.goto(url);
      }
    );
  }

  /**
   * Wait until an element is visible
   *
   * @param locator field locator
   **/
  async waitUntilELementVisible(locator) {
    await this.executeAction(`"${locator}" Element is visible`, async () => {
      await locator.waitFor({ state: "visible" });
    });
  }

  /**
   * Type on an input field
   *
   * @param locator field locator
   * @param inputText input text
   **/
  async typeInElement(locator, inputText) {
    await this.executeAction(
      `typing text: "${inputText}" into element: ${locator.toString()}`,
      async () => {
        await locator.fill(inputText);
      }
    );
  }

  /**
   * Press keyboard key
   *
   * @param key key
   **/
  async pressKeyboardKey(key) {
    await this.executeAction(`Clicked on: "${key}" on keyboard`, async () => {
      await this.page.keyboard.press(key);
    });
  }
}
