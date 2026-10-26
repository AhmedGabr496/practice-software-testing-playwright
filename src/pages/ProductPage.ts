import { Page, Locator } from '@playwright/test';

export class ProductPage {

    readonly name: Locator;
    readonly addToCartButton: Locator;
    readonly toast: Locator;
    readonly cartQuantity: Locator;
    readonly cartLink: Locator;


    constructor(private readonly page: Page) {
        this.name = page.getByTestId('product-name');
        this.addToCartButton = page.getByTestId('add-to-cart');
        this.toast = page.getByRole('alert');
        this.cartQuantity = page.getByTestId('cart-quantity');
        this.cartLink = page.getByTestId('nav-cart');
    }

    async addToCart() {
        await this.addToCartButton.click();
    }   

    async openCart() {
        await this.cartLink.click();
    }
    

}