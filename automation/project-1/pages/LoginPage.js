const { expect } = require("@playwright/test");

class LoginPage {
    constructor(page) {
        this.page = page;
        this.registerLink = page.getByTestId("register-link");
        this.emailInput = page.getByTestId("email");
        this.passwordInput = page.getByTestId("password");
        this.loginButton = page.getByTestId("login-submit");
        this.loginError = page.getByTestId("login-error");
    }

    // ---------- Actions ----------
    async open(loginUrl) {
        await this.page.goto(loginUrl);
    }

    async fillEmail(email) {
        await this.emailInput.fill(email);
    }

    async fillPassword(password) {
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async login(email, password) {
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.clickLoginButton();
    }   

    async clickRegisterLink() {
        await this.registerLink.click();
    }

    // ---------- Assertions ----------
    async expectLoginPageOpened(ExpectedLoginHeading) {
        await expect(this.page.getByRole("heading", { name: ExpectedLoginHeading })).toBeVisible();
    }

    async expectRegisterLinkVisible() {
        await expect(this.registerLink).toBeVisible();
    }


}

module.exports = { LoginPage };