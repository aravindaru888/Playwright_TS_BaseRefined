import { test as base } from '@playwright/test';
import { CartPage } from '../pages/cart.page';
import { HeaderPage } from '../pages/header.page';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { ProductPage } from '../pages/product.page';
import { loadJsonFile } from '../utils/test-data-loader';

type AuthData = {
  standardUser: {
    username: string;
    password: string;
    displayName: string;
  };
};

type SearchData = {
  validTerm: string;
  secondaryTerm: string;
  emptyResultsTerm: string;
};

type ProductData = {
  featuredProduct: {
    name: string;
    category: string;
    price: string;
  };
  alternateProduct: {
    name: string;
    category: string;
    price: string;
  };
};

type CategoryData = {
  primaryCategory: string;
  secondaryCategory: string;
};

type TestFixtures = {
  header: HeaderPage;
  loginPage: LoginPage;
  homePage: HomePage;
  productPage: ProductPage;
  cartPage: CartPage;
  authData: AuthData;
  searchData: SearchData;
  productData: ProductData;
  categoryData: CategoryData;
};

export const test = base.extend<TestFixtures>({
  header: async ({ page }, use) => {
    await use(new HeaderPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  authData: async ({}, use) => {
    await use(loadJsonFile<AuthData>('test-data/auth/users.json'));
  },
  searchData: async ({}, use) => {
    await use(loadJsonFile<SearchData>('test-data/search/search-terms.json'));
  },
  productData: async ({}, use) => {
    await use(loadJsonFile<ProductData>('test-data/products/products.json'));
  },
  categoryData: async ({}, use) => {
    await use(loadJsonFile<CategoryData>('test-data/categories/categories.json'));
  }
});

export { expect } from '@playwright/test';
