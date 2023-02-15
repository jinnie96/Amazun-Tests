const { test, expect } = require('@playwright/test')

test.beforeEach(async ( {page}, testInfo) => {
    await page.goto('https://amazon-solo-clone.herokuapp.com/');
})
test.describe('Authentication', () => {
    test('should redirect user to sign in page', async ({ page }) => {
        await page.locator('text=Books at Amazun').click();
        await page.locator('text=Hello, Sign in').click();
        await expect(page).toHaveURL('https://amazon-solo-clone.herokuapp.com/login');
        await page.screenshot({ path: 'sign_in.png'})
    });


    test('should redirect user to sign up page', async ({ page }) => {
        await page.locator('text=Sign Up').click();
        await expect(page).toHaveURL('https://amazon-solo-clone.herokuapp.com/sign-up');
    });

    test('should login user as demo', async ({ page }) => {
        await page.locator('text=Hello, Sign in').click();
        await expect(page).toHaveURL('https://amazon-solo-clone.herokuapp.com/login');
        await page.locator('[placeholder="Email"]').click();
        await page.locator('[placeholder="Email"]').fill('demo@aa.io');
        await page.locator('[placeholder="Password"]').click();
        await page.locator('[placeholder="Password"]').fill('password');
        await page.locator('text=Login').click();
        const hello = await page.innerText('#navOptions')
        await expect(hello).toBe('Hello, Demo')
    });
});

test.describe('Products', () => {
    test('should allow logged in user to view products on page', async ({ page }) => {
        await page.locator('text=Hello, Sign in').click();
        await page.locator('text=Demo').click();
        await page.locator('text=$12.99Game of Thronesby George R.R. Martin').click();
        await expect(page).toHaveURL('https://amazon-solo-clone.herokuapp.com/books/1');
    });
});

test.describe('Cart', () => {
    test('should allow logged in user to view products in cart', async ({ page }) => {
        await page.locator('text=Hello, Sign in').click();
        await page.locator('text=Demo').click();
        await page.locator('text=Game of Thrones').click();
        await page.locator('text=Add to Cart').click();
        await page.locator('text=Go to Cart').click();
        const hello = await page.innerText('#productName')
        await expect(hello).toBe('Game of Thrones')
    });

    test('allow users to delete products from their carts', async ({ page }) => {
        await page.locator('text=Hello, Sign in').click();
        await page.locator('text=Demo').click();
        await page.locator('text=Game of Thrones').click();
        await page.locator('text=Add to Cart').click();
        await page.locator('text=Go to Cart').click();
        await page.locator('text=Delete').click();
        const empty = await page.innerText('#emptyCart')
        await expect(empty).toBe('Your cart is empty!')
    });

});
