const { expect } = require("@playwright/test");

class HomePage{
constructor(page){
    this.page = page;
    this.SignInLink = page.getByTestId("nav-sign-in");
    this.searchInput = page.getByTestId("search-query");
    this.searchButton = page.getByTestId("search-submit");
    this.searchTerm = page.getByTestId("search-term");
    }
    
    // ---------- Helper Methods ----------
    getProduct(productName) {
        return this.page.getByTestId("product-name").filter({ hasText: productName });
    }

    // ---------- Actions ----------
    async open() {
        await this.page.goto("/");
    }

    async clickSignInLink(){
        await this.SignInLink.click();  
    } 

    async fillSearchInput(searchQuery){
        await this.searchInput.fill(searchQuery);
    }

    async clickSearchButton(){
        await this.searchButton.click();
    }

    async clickProduct(productName) {
        await this.getProduct(productName).click();
    }

    // ---------- Assertions ----------   
    async expectSignInLinkVisible(){
        await expect(this.SignInLink).toBeVisible();
    }

    async expectPageTitle(ExpectedTitle) {
        await expect(this.page).toHaveTitle(ExpectedTitle);
    }

    async expectSearchInputVisible(){
        await expect(this.searchInput).toBeVisible();
    }

    async expectSearchButtonVisible(){
        await expect(this.searchButton).toBeVisible();
    }

    async expectSearchResult(searchQuery) {
        await expect(this.searchTerm).toHaveText(searchQuery);
    }

    async expectProductVisible(productName) {
        await expect(this.getProduct(productName)).toBeVisible();
    }

}

module.exports = { HomePage };



