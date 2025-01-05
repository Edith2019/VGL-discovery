import { test, expect } from "@playwright/test";

test.describe("search client e2e", async () => {
    test.describe.configure({ mode: "serial", timeout: 20000 });
    let page;
    let SSRSearchContext;

    test.beforeAll(async ({ browser }) => {
        SSRSearchContext = await browser.newContext();
        page = await SSRSearchContext.newPage();
    });

    test.afterAll(async () => {
        await SSRSearchContext.close();
        await page.clos();
    });

    test("has client search page elements", async () => {
        await page.goto("/", { waitUntil: "load" });

        const searchSSR = await page.getByRole("link", {
            name: "search SSR",
        });

        // there is a bug
        await searchSSR.click();
        await searchSSR.click();
        await expect(page).toHaveURL("/search-ssr");
        await page.waitForSelector(".hit-items");

        const demoLinkOne = await page.getByRole("link", {
            name: "Go To instant search Jurassic",
        });
        const demoLinkTwo = await page.getByRole("link", {
            name: "Go To instant search witch",
        });
        const demoLinkThree = await page.getByRole("link", {
            name: "Go To instant search natural",
        });

        const refinementList = await page.locator(".ais-RefinementList-list");
        const resultItems = await page.locator(".hit-items");

        await expect(demoLinkOne).toBeVisible();
        await expect(demoLinkTwo).toBeVisible();
        await expect(demoLinkThree).toBeVisible();
        await expect(refinementList).toBeVisible();
        await expect(resultItems).toBeVisible();
    });

    test("click on demo link one and check url", async () => {
        const demoLinkOne = await page.getByRole("link", {
            name: "Go To instant search Jurassic",
        });

        await demoLinkOne.click();
        await expect(page).toHaveURL("/movie/jurassic");
    });
});
