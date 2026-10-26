
import {expect, type APIRequestContext } from '@playwright/test';
import type { newUser } from '../test-data';
const API_URL = 'https://api.practicesoftwaretesting.com';

export interface ProductList {
    current_page: number,
    "per_page": number,
    "total": number,
    data: Product[];
}

export interface Product {
    id: string;
    name: string;
    price: number;
    in_stock: boolean;
}

export class ToolShopAPI {
    constructor(private readonly request: APIRequestContext) {}

async login(email: string, password: string) {
const response = await this.request.post(`${API_URL}/users/login`, {
    data: {
        email,
        password
    }
});
await expect(response).toBeOK();
const body = (await response.json()) as {access_token: string};
return body.access_token;
}   

async getCurrentUser(token: string) {
    const response = await this.request.get(`${API_URL}/users/me`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    await expect(response).toBeOK();
    return ( await response.json()) as {email: string};
}

async getProducts(): Promise<ProductList>{
    const response = await this.request.get(`${API_URL}/products`);
    await expect(response).toBeOK();
    return (await response.json()) as ProductList;
}

async findProduct(name: string): Promise<Product> {
    const response = await this.request.get(`${API_URL}/products/search`, {
        params: {
            q: name
        }
    });
    await expect(response).toBeOK();
    const body = (await response.json()) as ProductList;
    // Search is a partial match ("Pliers" also returns "Combination Pliers"), so pick the exact name
    const product = body.data.find(p => p.name === name);
    if (!product) {
        throw new Error(`No product named "${name}" found. Search returned: ${body.data.map(p => p.name).join(', ') || 'nothing'}`);
    }
    return product;
}

async registerUser(user: ReturnType<typeof newUser>) {
    const response = await this.request.post(`${API_URL}/users/register`, {
        data: user
    });
    expect(response.status()).toBe(201);
    return (await response.json()) as {id: string, email: string};
}

async addFavorite(token: string, productId: string) {
    const response = await this.request.post(`${API_URL}/favorites`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            product_id: productId
        }
    });
    expect(response.status()).toBe(201);
    return (await response.json()) as {id: string, product_id: string};
}
}