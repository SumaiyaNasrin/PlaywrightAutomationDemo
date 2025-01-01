const { BasePage } = require("./base.page");

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    this.firstNameFieldLocator = page.getByPlaceholder("First Name");
    this.lastNameFieldLocator = page.getByPlaceholder("Last Name");
    this.postalCodeFieldLocator = page.getByPlaceholder("Zip/Postal Code");
    this.successMessageLocator = page.locator(
      "//h2[normalize-space(text()) = 'Thank you for your order!']"
    );
    this.cartButtonLocator = page.locator("//a[@class='shopping_cart_link']");
    this.checkOutButtonLocator = page.locator("//button[@name='checkout']");
    this.continueButtonLocator = page.locator("//input[@name='continue']");
    this.finishButtonLocator = page.locator("//button[@name='finish']");
    this.selectDropdownLocator = page.locator(
      "//select[@class='product_sort_container']"
    );
    this.cartPageTitle = page.locator(
      "//span[normalize-space(text()) = 'Your Cart']"
    );
  }

  /**
   * Click on the Add to Cart button
   *
   * @param product product name
   **/
  async clickOnAddToCartButton(product) {
    var element =
      "//a/div[normalize-space(text()) =  '" +
      product +
      "']/../../..//div//button[normalize-space(text()) = 'Add to cart']";
    this.locator = this.page.locator(element);
    await this.executeAction(
      `Clicked on: Add to Cart for product ${product}`,
      async () => {
        await this.locator.click();
      }
    );
  }

  /**
   * Click on Cart button
   **/
  async clickOnCartButton() {
    await this.executeAction(`Clicked on: Cart button`, async () => {
      await this.cartButtonLocator.click();
    });
  }

  /**
   * Click on Checkout button
   **/
  async clickOnCheckoutButton() {
    await this.executeAction(`Clicked on: Checkout button`, async () => {
      await this.checkOutButtonLocator.click();
    });
  }

  /**
   * Check if the product list is sorted by price in descending order
   *
   * @param arr input array
   **/
  async checkSortedForPrice(arr) {
    const sortArr = [...arr].sort((a, b) => b - a);
    return JSON.stringify(arr) === JSON.stringify(sortArr);
  }

  /**
   * Check if the product list is sorted alphabetically from Z to A
   *
   * @param arr input array
   **/
  async checkSortedForProduct(arr) {
    const asc = (b, i, { [i - 1]: a }) => !i || b <= a;
    return await arr.every(asc);
  }

  /**
   * Get product list
   **/
  async getProductList() {
    var element = "//a/div[@data-test='inventory-item-name']";
    var productList = [];
    await this.executeAction(`Get product list`, async () => {
      productList = await this.page.locator(element).allTextContents();
    });
    return productList;
  }

  /**
   * Get price of products
   **/
  async getPriceList() {
    var element = "//div[@data-test='inventory-item-price']";
    var priceList = [];
    await this.executeAction(`Get price list of products`, async () => {
      priceList = await this.page.locator(element).allTextContents();
    });
    for (var i = 0; i < priceList.length; i++) {
      priceList[i] = priceList[i].replace("$", "");
    }
    return priceList;
  }

  /**
   * Checkout process
   **/
  async checkOut() {
    await this.executeAction(
      `Enter first name value in input field`,
      async () => {
        await this.typeInElement(this.firstNameFieldLocator, "test");
      }
    );
    await this.executeAction(
      `Enter last name value in input field`,
      async () => {
        await this.typeInElement(this.lastNameFieldLocator, "user");
      }
    );
    await this.executeAction(
      `Enter postal code value in input field`,
      async () => {
        await this.typeInElement(this.postalCodeFieldLocator, "1219");
      }
    );
    await this.executeAction(`Clicked on Continue button`, async () => {
      await this.continueButtonLocator.click();
    });
  }

  /**
   * Click on Finish button
   **/
  async clickOnFinishButton() {
    await this.executeAction(`Clicked on: Finish button`, async () => {
      await this.finishButtonLocator.click();
    });
  }

  /**
   * Select an option from Select dropdown
   **/
  async selectSortOption(option) {
    await this.executeAction(
      `Selected ${option} from Sort dropdown`,
      async () => {
        await this.selectDropdownLocator.selectOption(option);
      }
    );
  }
}
