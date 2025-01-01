const { BasePage } = require("./base.page");
import testData from "../data/test.data.json";

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    this.userNameFieldLocator = page.getByPlaceholder("Username");
    this.passwordFieldLocator = page.getByPlaceholder("Password");
    this.loginButtonLocator = page.locator("#login-button");
    this.homePageTitle = page.locator(
      "//div[@class='v-list-item__title'][normalize-space(text()) = 'iQ3Connect Inc']"
    );
  }

  /**
   * Navigate to login page
   **/
  async gotoLoginPage() {
    await this.navigateToURL(testData.url);
  }

  /**
   * Login into the application
   **/
  async login() {
    await this.typeInElement(this.userNameFieldLocator, testData.userName);
    await this.typeInElement(this.passwordFieldLocator, testData.password);
    await this.loginButtonLocator.click();
  }
}
