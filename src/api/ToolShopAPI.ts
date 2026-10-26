
import {expect, type APIRequestContext } from '@playwright/test';
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
}