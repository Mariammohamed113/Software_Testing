const { expect } = require("@playwright/test");

class ProfilePage {
    constructor(page) {
        this.page = page;
        this.navMenu = page.getByTestId("nav-menu");
        this.navMyProfile = page.getByTestId("nav-my-profile");
        this.pageTitle = page.getByTestId("page-title");
        this.firstNameInput = page.getByTestId("first-name");
        this.lastNameInput = page.getByTestId("last-name");
        this.emailInput = page.getByTestId("email");
        this.phoneInput = page.getByTestId("phone");
        this.streetInput = page.getByTestId("street");
        this.postalCodeInput = page.getByTestId("postal_code");
        this.cityInput = page.getByTestId("city");
        this.stateInput = page.getByTestId("state");
        this.countryInput = page.getByTestId("country");
        this.updateProfileButton = page.getByTestId("update-profile-submit");
        this.successMessage = page.locator(".alert-success");
    }

    // ---------- Actions ----------
    async goToProfile() {
        await this.navMenu.click();
        await this.navMyProfile.click();
    }

    async updateProfile(user) {
        await this.firstNameInput.fill(user.firstName);
        await this.lastNameInput.fill(user.lastName);
        await this.phoneInput.fill(user.phone);
        await this.streetInput.fill(user.street);
        await this.postalCodeInput.fill(user.postalCode);
        await this.cityInput.fill(user.city);
        await this.stateInput.fill(user.state);
        await this.countryInput.fill(user.country);
        await this.updateProfileButton.click();
    }

    async reloadPage() {
        await this.page.reload();
    }

    // ---------- Assertions ----------
    async expectProfilePageOpened(profileUrl, profileTitle) {
        await expect(this.page).toHaveURL(new RegExp(profileUrl));
        await expect(this.pageTitle).toHaveText(profileTitle);
    }

    async expectProfileLoaded(user, email) {
        await expect(this.firstNameInput).toHaveValue(user.firstName);
        await expect(this.lastNameInput).toHaveValue(user.lastName);
        await expect(this.emailInput).toHaveValue(email);
    }

    async expectSuccessMessage(expectedMessage) {
        await expect(this.successMessage).toContainText(expectedMessage);
    }

    async expectProfileUpdated(user) {
        await expect(this.firstNameInput).toHaveValue(user.firstName);
        await expect(this.lastNameInput).toHaveValue(user.lastName);
        await expect(this.phoneInput).toHaveValue(user.phone);
        await expect(this.streetInput).toHaveValue(user.street);
        await expect(this.postalCodeInput).toHaveValue(user.postalCode);
        await expect(this.cityInput).toHaveValue(user.city);
        await expect(this.stateInput).toHaveValue(user.state);
        await expect(this.countryInput).toHaveValue(user.country);
    }
    
}

module.exports = { ProfilePage };