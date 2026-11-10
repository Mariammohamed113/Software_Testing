const { expect } = require("@playwright/test");

class FavoritesPage {
    constructor(page) {
        this.page = page;
        this.navMenu = page.getByTestId("nav-menu");
        this.navMyFavorites = page.getByTestId("nav-my-favorites");
        this.pageTitle = page.getByTestId("page-title");
    }

    // ---------- Helper Methods ----------
    getFavoriteItem(favoriteName) {
        return this.page.locator(".card").filter({ hasText: favoriteName });
    }

    // ---------- Actions ----------
    async open(favoritesUrl) {
        await this.page.goto(favoritesUrl);
    }

    async clickNavMyFavorites() {
        await this.navMenu.click();
        await this.navMyFavorites.click();
    }

    async removeFavorite(favoriteName) {
    await this.getFavoriteItem(favoriteName).getByTestId("delete").click();
    }

    // ---------- Assertions ----------
    async expectFavoritesPageOpened(expectedHeading) {
        await expect(this.pageTitle).toHaveText(expectedHeading);
    }

    async expectFavoriteItemVisible(favoriteName) {
        await expect(this.getFavoriteItem(favoriteName)).toBeVisible();
    }

    async expectFavoriteItemNotVisible(favoriteName) {
        await expect(this.getFavoriteItem(favoriteName)).not.toBeVisible();
    }


}
module.exports = { FavoritesPage };