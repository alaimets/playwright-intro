import { test, expect } from '@playwright/test';
import type {Locator} from '@playwright/test';

test.describe('Create order page - tests', () => {
    let firstNameInput: Locator;
    let lastNameInput: Locator;
    let emailInput: Locator;
    let addressInput: Locator;
    let createOrderButton: Locator;

    test.beforeEach(async ({page}) => {
        await page.goto('https://basic-ui.tl-academy.ee/');
        firstNameInput = page.getByTestId('first-name-input');
        lastNameInput = page.getByTestId('last-name-input');
        emailInput = page.getByTestId('email-input');
        addressInput = page.getByTestId('address-input');
        createOrderButton = page.getByTestId('create-order-button');
    });

//1. TL-16-1 create order button test
//2. TL-16-2 change language
//3. TL-16-3 incorrect email blocks create button and shows error

    test('Create order button becomes enabled after filling in all fields', async ({page}) => {
        await expect(createOrderButton).toBeDisabled()
        await firstNameInput.fill('Peter');
        await lastNameInput.fill('Pan');
        await emailInput.fill('peterpan@test.com');
        await expect(createOrderButton).toBeDisabled()
        await addressInput.fill('Tree House');
        await expect(createOrderButton).toBeEnabled();
    });

    test('Change page language', async ({page}) => {
        const languageButtonRU = page.getByTestId('language-ru');
        const languageButtonEN = page.getByTestId('language-en');
        const languageButtonET = page.getByTestId('language-et');
        const pageTitle = page.getByTestId('page-title');
        const testData = {
            createOrderRU: 'Создать заказ',
            createOrderEN: 'Create order',
            createOrderET: 'Loo tellimus'
        };
        //Нажимание каждой кнопки смены языка
        await languageButtonRU.click();
        await expect(pageTitle).toHaveText(testData.createOrderRU);
        await languageButtonEN.click();
        await expect(pageTitle).toHaveText(testData.createOrderEN);
        await languageButtonET.click();
        await expect(pageTitle).toHaveText(testData.createOrderET);
    });

    test('Incorrect email blocks create button and shows error', async ({page}) => {
        const emailError = page.getByTestId('email-error');
        await expect(createOrderButton).toBeDisabled()
        await firstNameInput.fill('Peter');
        await lastNameInput.fill('Pan');
        await emailInput.fill('peterpantest.com');
        await emailInput.blur();
        await addressInput.fill('Tree House');
        await expect(emailError).toBeVisible();
        await expect(createOrderButton).not.toBeEnabled();
    });
})