// @ts-check
const { test, expect } = require("@playwright/test");
const { HomePage } = require("../Pages/HomePage");
const { LoginPage } = require("../Pages/LoginPage");
const { RegisterPage } = require("../Pages/RegisterPage");
const { ProfilePage } = require("../Pages/ProfilePage");
const DataFile = require("../Data/Data.json");


test("register then login", async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);
    const profilePage = new ProfilePage(page);

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

    // 6. Go to profile page and update profile
    await profilePage.goToProfile();
    await profilePage.expectProfilePageOpened(DataFile.profilePage.profileUrl, DataFile.profilePage.profileTitle);
    await profilePage.expectProfileLoaded(user, email);
    await profilePage.updateProfile(DataFile.updatedUser);
    await profilePage.expectSuccessMessage(DataFile.profilePage.successMessage);
    
    // 7. Reload the page and verify the updated profile
    await profilePage.reloadPage();
    await profilePage.expectProfileUpdated(DataFile.updatedUser);
});