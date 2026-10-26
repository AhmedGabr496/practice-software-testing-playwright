import  {test as base}  from '@playwright/test';
import { ToolShopAPI } from './api/ToolShopAPI';
import { ProductPage } from './pages/ProductPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { FavoritesPage } from './pages/FavoritesPage';

interface Fixtures {
    api: ToolShopAPI;
    productPage: ProductPage;
    homePage: HomePage;
    loginPage: LoginPage;
    checkoutPage: CheckoutPage;
    favoritesPage: FavoritesPage;
}

export const test = base.extend<Fixtures>({
    api: async ({ request }, use) => {
        const api = new ToolShopAPI(request);
        await use(api);
    },
    productPage: async ({ page }, use) => {
        const productPage = new ProductPage(page);
        await use(productPage);
    },
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    checkoutPage: async ({ page }, use) => {
        const checkoutPage = new CheckoutPage(page);
        await use(checkoutPage);
    },
    favoritesPage: async ({ page }, use) => {
        const favoritesPage = new FavoritesPage(page);
        await use(favoritesPage);
    }

});

export  {expect} from '@playwright/test';