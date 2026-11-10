const { expect } = require("@playwright/test");

class ProductPage {

    constructor(page) {
        this.page = page;
        this.addToFavoritesButton = page.getByTestId("add-to-favorites");
        this.productName = page.getByTestId("product-name");
    }

    // ---------- Actions ----------
    async open(productUrl) {
        await this.page.goto(productUrl);
    }

    async clickAddToFavoritesButton() {
        await this.addToFavoritesButton.click();
    }

    // ---------- Assertions ----------
    async expectProductPageOpened(expectedProductName) {
        await expect(this.productName).toContainText(expectedProductName);
    }

    async expectAddToFavoritesButtonVisible() {
        await expect(this.addToFavoritesButton).toBeVisible();
    }

    async expectAddedToFavoritesMessage(expectedMessage) {
        await expect(this.page.locator(".toast-success")).toContainText(expectedMessage);   
    }

}
module.exports = { ProductPage };