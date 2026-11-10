const { test, expect } = require("@playwright/test");
const { HomePage } = require("../Pages/HomePage");
const { LoginPage } = require("../Pages/LoginPage");
const { RegisterPage } = require("../Pages/RegisterPage");
const { FavoritesPage } = require("../Pages/FavoritesPage");
const { ProductPage } = require("../Pages/ProductPage");

const DataFile = require("../Data/Data.json");

test("user can add and remove product from favorites", async ({ page }) => {

    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);
    const favoritesPage = new FavoritesPage(page);
    const productPage = new ProductPage(page);

    const user = DataFile.registerUser;
    const email = `${user.emailPrefix}_${Date.now()}@test.com`;

    // 1. Home
    await homePage.open();
    await homePage.expectPageTitle(DataFile.homePage.title);
    await homePage.expectSignInLinkVisible();
    await homePage.clickSignInLink();

    // 2. Login page -> go to register
    await loginPage.expectLoginPageOpened(DataFile.loginPage.loginHeading);
    await loginPage.expectRegisterLinkVisible();
    await loginPage.clickRegisterLink();

    // 3. Register
    await registerPage.expectRegisterPageOpened(DataFile.registerPage.registerHeading);
    await registerPage.register(user, email);

    // 4. Login with the new account
    await loginPage.expectLoginPageOpened(DataFile.loginPage.loginHeading);
    await loginPage.login(email, user.password);

    // 5. Login success
    await expect(page).toHaveURL(new RegExp(DataFile.accountPage.accountUrl));

    // 6. Go to product page and add to favorites
    await homePage.open();
    await homePage.fillSearchInput(DataFile.productPage.productName);
    await homePage.clickSearchButton();
    await homePage.expectSearchResult(DataFile.productPage.productName);
    await homePage.clickProduct(DataFile.productPage.productName);
    await productPage.expectProductPageOpened(DataFile.productPage.productName);
    await productPage.expectAddToFavoritesButtonVisible();
    await productPage.clickAddToFavoritesButton();
    await productPage.expectAddedToFavoritesMessage(DataFile.productPage.addedToFavoritesMessage);


    // 7. Go to favorites page and verify the product is visible
    await favoritesPage.open(DataFile.favoritesPage.favoritesUrl);
    await favoritesPage.expectFavoritesPageOpened(DataFile.favoritesPage.favoritesTitle);
    await favoritesPage.expectFavoriteItemVisible(DataFile.productPage.productName);

    // 8. Remove the product from favorites and verify it is no longer visible
    await favoritesPage.removeFavorite(DataFile.productPage.productName);
    await favoritesPage.expectFavoriteItemNotVisible(DataFile.productPage.productName);

});