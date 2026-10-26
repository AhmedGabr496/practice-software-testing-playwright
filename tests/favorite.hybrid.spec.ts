import { test, expect } from '../src/fixtures';
import { newUser, products } from '../src/test-data';

test('Hybrid: favorite added through the API shows in the UI', async ({ api, loginPage, favoritesPage }) => {
    // Arrange through the API: a fresh user, so the favorites list holds only what this test adds
    const product = await api.findProduct(products.pilers);
    const user = newUser();
    await api.registerUser(user);
    const token = await api.login(user.email, user.password);
    const favorite = await api.addFavorite(token, product.id);

    // Verify in the UI
    await loginPage.goto();
    await loginPage.login(user.email, user.password);
    await favoritesPage.goto();

    await expect(favoritesPage.pageTitle).toHaveText('Favorites');
    await expect(favoritesPage.favorites).toHaveCount(1);
    await expect(favoritesPage.favorite(favorite.id).getByTestId('product-name')).toHaveText(product.name);
});
