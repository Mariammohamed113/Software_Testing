const { expect } = require("@playwright/test");

class RegisterPage {
    constructor(page) {
        this.page = page;   
        this.registerForm = page.getByTestId("register-form");
        this.firstNameInput = page.getByTestId("first-name");
        this.lastNameInput = page.getByTestId("last-name");
        this.dobInput = page.getByTestId("dob");
        this.countrySelect = page.getByTestId("country");
        this.postalCodeInput = page.getByTestId("postal_code");
        this.houseNumberInput = page.getByTestId("house_number");
        this.streetInput = page.getByTestId("street");
        this.cityInput = page.getByTestId("city");
        this.stateInput = page.getByTestId("state");
        this.phoneInput = page.getByTestId("phone");
        this.emailInput = page.getByTestId("email");
        this.passwordInput = page.getByTestId("password");
        this.registerButton = page.getByTestId("register-submit");
        this.registerError = page.getByTestId("register-error");
    }

    // ---------- Actions ----------
    async open(registerUrl) {
        await this.page.goto(registerUrl);
    }

    async fillFirstName(firstName) {
        await this.firstNameInput.fill(firstName);
    }

    async fillLastName(lastName) {
        await this.lastNameInput.fill(lastName);
    }   

    async fillDob(dob) {
        await this.dobInput.fill(dob);
    }

    async selectCountry(country) {
        await this.countrySelect.selectOption(country);
    }

    async fillPostalCode(postalCode) {
        await this.postalCodeInput.fill(postalCode);
    }

    async fillHouseNumber(houseNumber) {
        await this.houseNumberInput.fill(houseNumber);
    }

    async fillStreet(street) {
        await this.streetInput.fill(street);
    }

    async fillCity(city) {
        await this.cityInput.fill(city);
    }

    async fillState(state) {
        await this.stateInput.fill(state);
    }

    async fillPhone(phone) {
        await this.phoneInput.fill(phone);
    }

    async fillEmail(email) {
        await this.emailInput.fill(email);
    }

    async fillPassword(password) {
        await this.passwordInput.fill(password);
    }

    async clickRegisterButton() {
        await this.registerButton.click();
    }

    async register(user, email) {
        await this.fillFirstName(user.firstName);
        await this.fillLastName(user.lastName);
        await this.fillDob(user.dob);
        await this.selectCountry(user.country);
        await this.fillPostalCode(user.postalCode);
        await this.fillHouseNumber(user.houseNumber);
        await this.fillStreet(user.street);
        await this.fillCity(user.city);
        await this.fillState(user.state);
        await this.fillPhone(user.phone);
        await this.fillEmail(email);
        await this.fillPassword(user.password);
        await this.clickRegisterButton();
    }

    // ---------- Assertions ----------
    async expectRegisterPageOpened(registerHeading) {
        await expect(this.page.getByRole("heading", { name: registerHeading })).toBeVisible();
    }

    async expectRegisterError(expectedErrorMessage) {
        await expect(this.registerError).toContainText(expectedErrorMessage);
    }
}

module.exports = { RegisterPage };