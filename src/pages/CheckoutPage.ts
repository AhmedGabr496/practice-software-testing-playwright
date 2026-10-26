import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
    readonly productQuantity: Locator;
    readonly proceedFromCartButton: Locator;
    readonly proceedAsLoggedInUserButton: Locator;
    readonly country: Locator;
    readonly postalCode: Locator;
    readonly houseNumber: Locator;
    readonly street: Locator;
    readonly city: Locator;
    readonly state: Locator;
    readonly proceedToPaymentButton: Locator;
    readonly paymentMethod: Locator;
    readonly cardNumber: Locator;
    readonly expirationDate: Locator;
    readonly cvv: Locator;
    readonly cardHolderName: Locator;
    readonly finishButton: Locator;
    readonly paymentSuccessMessage: Locator;
    readonly orderConfirmation: Locator;


    constructor(private readonly page: Page) {
        this.productQuantity = page.getByTestId('product-quantity');
        this.proceedFromCartButton = page.getByTestId('proceed-1');
        this.proceedAsLoggedInUserButton = page.getByTestId('proceed-2');
        this.country = page.getByTestId('country');
        this.postalCode = page.getByTestId('postal_code');
        this.houseNumber = page.getByTestId('house_number');
        this.street = page.getByTestId('street');
        this.city = page.getByTestId('city');
        this.state = page.getByTestId('state');
        this.proceedToPaymentButton = page.getByTestId('proceed-3');
        this.paymentMethod = page.getByTestId('payment-method');
        this.cardNumber = page.getByTestId('credit_card_number');
        this.expirationDate = page.getByTestId('expiration_date');
        this.cvv = page.getByTestId('cvv');
        this.cardHolderName = page.getByTestId('card_holder_name');
        this.finishButton = page.getByTestId('finish');
        this.paymentSuccessMessage = page.getByTestId('payment-success-message');
        // The confirmation has no data-test attribute
        this.orderConfirmation = page.locator('#order-confirmation');
    }

    async proceedFromCart() {
        await this.proceedFromCartButton.click();
    }

    async proceedAsLoggedInUser() {
        await this.proceedAsLoggedInUserButton.click();
    }

    async fillBillingAddress(address: { country: string; postalCode: string; houseNumber: string; street: string; city: string; state: string }) {
        // The form pre-fills the user's saved address once the profile loads; wait for it,
        // or it can land after our input and overwrite it
        await expect(this.street).not.toHaveValue('');
        // country takes the ISO code, e.g. 'US'
        await this.country.selectOption(address.country);
        await this.postalCode.fill(address.postalCode);
        await this.houseNumber.fill(address.houseNumber);
        await this.street.fill(address.street);
        await this.city.fill(address.city);
        await this.state.fill(address.state);
    }

    async proceedToPayment() {
        await this.proceedToPaymentButton.click();
    }

    async payByCreditCard(card: { number: string; expiry: string; cvv: string; holderName: string }) {
        // The card fields only render after Credit Card is chosen
        await this.paymentMethod.selectOption('credit-card');
        await this.cardNumber.fill(card.number);
        await this.expirationDate.fill(card.expiry);
        await this.cvv.fill(card.cvv);
        await this.cardHolderName.fill(card.holderName);
        await this.finishButton.click();
    }

    async confirmOrder() {
        // The first "finish" click only validates the payment; this second click places the order
        await this.finishButton.click();
    }
}
