import { Page, Locator } from '@playwright/test';

export class FavoritesPage {
    readonly pageTitle: Locator;
    readonly favorites: Locator;
    readonly productNames: Locator;


    constructor(private readonly page: Page) {
        this.pageTitle = page.getByTestId('page-title');
        // Each card is data-test="favorite-<favorite id>"
        this.favorites = page.locator('[data-test^="favorite-"]');
        this.productNames = this.favorites.getByTestId('product-name');
    }

    async goto() {
        await this.page.goto('/account/favorites');
    }

    favorite(favoriteId: string): Locator {
        return this.page.getByTestId(`favorite-${favoriteId}`);
    }
}
