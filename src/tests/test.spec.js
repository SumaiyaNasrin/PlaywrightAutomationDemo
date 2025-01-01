import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { allure } from "allure-playwright";
import { Severity } from "allure-js-commons";
import { HomePage } from "../pages/home.page";
const AxeBuilder = require("@axe-core/playwright").default;

test.describe("Product sort and checkout process", () => {
  let page;
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    const login = new LoginPage(page);
    await login.gotoLoginPage();
    await login.login();
  });

  test.afterAll(async ({ browser }) => {
    browser.close;
  });

  test("Accessibility test", async () => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect.soft(accessibilityScanResults.violations).toEqual([]);
  });

  test("Validate sorting from Z to A", async () => {
    const homePage = new HomePage(page);
    let listOfProductSortedDesc = new Array();
    await allure.severity(Severity.High);
    await homePage.selectSortOption("za");
    await page.waitForTimeout(1000);
    listOfProductSortedDesc = await homePage.getProductList();
    expect
      .soft(await homePage.checkSortedForProduct(listOfProductSortedDesc))
      .toBe(true);
    await expect(page).toHaveScreenshot("homePageSortedZToA.png");
  });

  test("Validate sorting from High to Low", async () => {
    const homePage = new HomePage(page);
    let listOfPriceSortedDesc = new Array();
    await allure.severity(Severity.High);
    await page.waitForTimeout(1000);
    await homePage.selectSortOption("hilo");
    listOfPriceSortedDesc = await homePage.getPriceList();
    expect
      .soft(await homePage.checkSortedForPrice(listOfPriceSortedDesc))
      .toBe(true);
    await expect(page).toHaveScreenshot("homePageSortedHighToLow.png");
  });

  test("Validate checkout process by adding multiple items in cart", async () => {
    const homePage = new HomePage(page);
    const listOfProduct = new Array(
      "Sauce Labs Backpack",
      "Sauce Labs Bolt T-Shirt",
      "Sauce Labs Fleece Jacket"
    );
    await allure.severity(Severity.BLOCKER);
    for (const product of listOfProduct) {
      await homePage.clickOnAddToCartButton(product);
    }
    await homePage.clickOnCartButton();
    await homePage.waitUntilELementVisible(homePage.cartPageTitle);
    const productListActual = await homePage.getProductList();
    expect.soft(productListActual).toEqual(listOfProduct);
    await expect(page).toHaveScreenshot("cart.png");
    await homePage.clickOnCheckoutButton();
    await expect(page).toHaveScreenshot("checkoutPage.png");
    await homePage.checkOut();
    await homePage.clickOnFinishButton();
    await expect.soft(homePage.successMessageLocator).toBeVisible();
    await expect(page).toHaveScreenshot("afterCheckout.png");
  });
});
