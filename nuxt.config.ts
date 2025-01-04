// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    ssr: true,
    devtools: { enabled: true },
    modules: ["@nuxtjs/algolia", "@nuxt/image"],
    experimental: {
        componentIslands: true,
        asyncContext: true,
    },
    algolia: {
        apiKey: process.env.ALGOLIA_SEARCH_API_KEY,
        applicationId: process.env.ALGOLIA_APPLICATION_ID,
        instantSearch: {
            theme: "algolia",
        },
    },
});
