import { Page, Locator } from '@playwright/test';

export class HomePage {

readonly searchInput: Locator;
readonly searchButton: Locator;
readonly searchCaption: Locator;

    constructor(private readonly page: Page) {
        this.searchInput = page.getByTestId('search-query');
        this.searchButton = page.getByTestId('search-submit');
        this.searchCaption = page.getByTestId('search-caption');
    }

    async goto() {
        await this.page.goto('/');
    }

    async search(text: string) {
        await this.searchInput.fill(text);
        await this.searchButton.click();
        await this.searchCaption.filter({ hasText: text }).waitFor();
        // The caption shows before the grid refreshes, so wait for the non-matching cards to go
        await this.page.getByTestId('product-name').filter({ hasNotText: text }).first().waitFor({ state: 'detached' });
    }

    async openProduct(productName: string) {
        // exact, so the "Searched for: <name>" caption heading doesn't match
        await this.page.getByRole('heading', { name: productName, exact: true }).click();
    }
}