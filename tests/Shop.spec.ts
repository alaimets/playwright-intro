import { test, expect } from '@playwright/test';
import type {Locator} from '@playwright/test';

test.describe('Nordic Shop tests', async () => {
    let emailAddressInput: Locator;
    let fullNameInput: Locator;
    let deliveryMethodParcelLockerCheckbox: Locator;
    let deliveryMethodHomeCheckbox: Locator;
    let paymentBankcard: Locator;
    let paymentPayPal:  Locator;
    let deliveryCost: Locator;
    let totalSum: Locator;
    let placeOrderButton: Locator;
    let placeOrderMessage: Locator;

    test.beforeEach(async ({page}) => {
        await page.goto('https://shop.tl-academy.ee/checkout');
        emailAddressInput = page.getByTestId('email-input');
        fullNameInput = page.getByTestId('name-input');
        deliveryMethodParcelLockerCheckbox = page.getByTestId('delivery-parcel-locker-option');
        deliveryMethodHomeCheckbox  = page.getByTestId('delivery-home-option');
        paymentBankcard = page.getByTestId('payment-card-option');
        paymentPayPal = page.getByTestId('payment-paypal-option');
        deliveryCost = page.getByTestId('summary-delivery');
        totalSum = page.getByTestId('summary-total');
        placeOrderButton = page.getByTestId('place-order-button');
        placeOrderMessage = page.getByTestId('order-message');
    });

// 1. TL-16-4 place order button test with delivery check + validation

    test('Place order button test with delivery check + validation', async () => {
    const testData = {
        deliveryCostNumber: '€3.99',
        totalSumNumber: '€82.99',
        placeOrderMessageText: 'Order placed. Thank you!'
    }
    //Вводятся данные и выбирается способ доставки и платежа
    await expect(placeOrderButton).toBeDisabled();
    await emailAddressInput.fill('peterpan@test.com');
    await fullNameInput.fill('Peter Pan');
    await deliveryMethodParcelLockerCheckbox.check();
    await paymentPayPal.check();
    //Проверяется, что все кнопки нужные нажаты и видна цена за доставку и общая сумма
    await expect(deliveryMethodParcelLockerCheckbox).toBeChecked();
    await expect(paymentPayPal).toBeChecked();
    await expect(deliveryCost).toHaveText(testData.deliveryCostNumber);
    await expect(totalSum).toHaveText(testData.totalSumNumber);
    await expect(placeOrderButton).toBeEnabled();
    //Делается заказ
    await placeOrderButton.click();
    await expect(placeOrderMessage).toBeVisible();
    await expect(placeOrderMessage).toHaveText(testData.placeOrderMessageText);
    await expect(placeOrderButton).toBeDisabled();
    })

})