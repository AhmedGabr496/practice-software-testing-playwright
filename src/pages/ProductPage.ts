import { Page, Locator } from '@playwright/test';

export class ProductPage {

    readonly name: Locator;
    readonly addToCartButton: Locator;
    readonly toast: Locator;
    readonly cartQuantity: Locator;


    constructor(private readonly page: Page) {
        this.name = page.getByTestId('product-name');
        this.addToCartButton = page.getByTestId('add-to-cart');
        this.toast = page.getByTestId('toast');
        this.cartQuantity = page.getByTestId('cart-quantity');
    }

    async addToCart() {
        await this.addToCartButton.click();
    }
}