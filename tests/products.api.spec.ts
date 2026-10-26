import  { test, expect } from '../src/fixtures';
import {customer} from '../src/test-data';

test('API: Customer logs in for a token and gets product list' , async ({ api }) => {
    const token = await api.login(customer.email, customer.password);
    expect(token).toBeTruthy();

    const me = await api.getCurrentUser(token);
    expect(me.email).toBe(customer.email);

    const products = await api.getProducts();
    expect (products.current_page).toBe(1);
    expect (products.data.length).toBeGreaterThan(0);
    expect (products.data.length).toBeLessThanOrEqual(products.per_page);
});