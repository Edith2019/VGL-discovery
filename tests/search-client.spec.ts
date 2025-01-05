import { test, expect } from "@playwright/test";

test.describe("search client e2e", async () => {
    test.describe.configure({ mode: "serial", timeout: 20000 });
    let page;
    let clientSearchContext;

    test.beforeAll(async ({ browser }) => {
        clientSearchContext = await browser.newContext();
        page = await clientSearchContext.newPage();
    });

    test.afterAll(async () => {
        await clientSearchContext.close();
        await page.close();
    });

    test("has client search page elements", async () => {
        await page.goto("/", { waitUntil: "load" });

        const searchClient = await page.getByRole("link", {
            name: "search client",
        });

        await searchClient.click();
        await expect(page).toHaveURL("/search");

        await page.waitForSelector(".ais-Hits");

        const header = await page.getByRole("link", { name: "search client" });
        const searchBar = await page.getByLabel("Search");
        const searchRender = await page.locator(".ais-Hits");

        await expect(header).toBeVisible();
        await expect(searchBar).toBeVisible();
        await expect(searchRender).toBeVisible();
    });

    test("filling search returns at least one item", async () => {
        const searchBar = await page.getByLabel("Search");
        await searchBar.fill("polar");
        const searchResultItem = await page.getByText(
            "PolarMG, a policewoman who"
        );

        await expect(searchResultItem).toBeVisible();
    });
});
