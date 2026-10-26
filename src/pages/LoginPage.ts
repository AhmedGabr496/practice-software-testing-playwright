import { Page , Locator } from '@playwright/test';

export class LoginPage {
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;


    constructor(private readonly page: Page) {
        this.emailInput = page.getByTestId('email');
        this.passwordInput = page.getByTestId('password');
        this.loginButton = page.getByTestId('login-submit');
    }

    async goto() {
        await this.page.goto('/auth/login');
    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();

        await this.page.waitForURL('**/account');
    }
}