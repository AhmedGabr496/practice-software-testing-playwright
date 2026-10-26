import { test, expect } from '../src/fixtures';
import { billingAddress, creditCard, customer, products } from '../src/test-data';

test ('UI: customer buys product and pays by credit card', async ({ api, loginPage, homePage, productPage, checkoutPage }) => {
    // Stock on the shared demo site runs out, so fail fast with a clear reason instead of a disabled "Add to cart"
    const product = await api.findProduct(products.boltCutters);
    expect(product.in_stock, `${product.name} is out of stock on the demo site`).toBe(true);

    await loginPage.goto();
    await loginPage.login(customer.email, customer.password);

    await homePage.goto();
    await homePage.search(product.name);
    await homePage.openProduct(product.name);
    await expect(productPage.name).toHaveText(product.name);

    await productPage.addToCart();
    await expect(productPage.cartQuantity).toHaveText('1');
    await productPage.openCart();

    await expect(checkoutPage.productQuantity).toHaveValue('1');
    await checkoutPage.proceedFromCart();
    await checkoutPage.proceedAsLoggedInUser();

    await checkoutPage.fillBillingAddress(billingAddress);
    await checkoutPage.proceedToPayment();

    await checkoutPage.payByCreditCard(creditCard);
    await expect(checkoutPage.paymentSuccessMessage).toHaveText('Payment was successful');

    await checkoutPage.confirmOrder();
    await expect(checkoutPage.orderConfirmation).toContainText('Thanks for your order!');
    await expect(checkoutPage.orderConfirmation).toContainText(/INV-\d+/);
});
