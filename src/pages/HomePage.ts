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
    }

    async openProduct(productName: string) {
        await this.page.getByRole('heading', { name: productName }).click();
    }
}