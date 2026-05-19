import { messages } from '../../config/messages';
import { testTags } from '../../helpers/test-tags';
import { expect, test } from '../../fixtures/test.fixture';

test.describe('Cart management', () => {
  test(
    `${testTags.smoke} ${testTags.cart} shopper can add an item to cart and remove it again`,
    async ({ page, homePage, productPage, cartPage, header, productData }) => {
      const productName = productData.featuredProduct.name;

      await test.step('Open product details page from the home page', async () => {
        await page.goto('/');
        await homePage.expectLoaded();
        await homePage.openProduct(productName);
        await productPage.expectProductDetails(productName);
      });

      await test.step('Add the product to cart', async () => {
        await productPage.addToCart();
      });

      await test.step('Validate the cart contains the selected product', async () => {
        await header.openCart();
        await cartPage.expectLoaded();
        await expect(cartPage.cartItem(productName), messages.cartUpdated).toBeVisible();
      });

      await test.step('Remove the product and validate cleanup', async () => {
        await cartPage.removeItem(productName);
        await cartPage.expectItemRemoved(productName);
      });
    }
  );
});
