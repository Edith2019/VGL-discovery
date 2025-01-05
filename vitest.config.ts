import { defineVitestConfig } from "@nuxt/test-utils/config";
import path from "path";
import Vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
export default defineVitestConfig({
    // any custom Vitest config you require
    // plugins: [Vue(), AutoImport({ imports: ["vue"] })],
    test: {
        // coverage: {
        //     all: true,
        //     enabled: false,
        //     include: ["**/*.ts", "**/*.vue", "**/*.js"],
        //     exclude: ["*.config.ts", ".nuxt/**", ".output/**", "plugins/**"],
        // },
        globals: true,
        environment: "happy-dom",
        setupFiles: ["./vitest.setup.ts"],
        exclude: ["node_modules/**", "tests/**"],
    },
    resolve: {
        alias: {
            "#app": path.resolve(__dirname, "./node_modules/nuxt/dist/app"),
            "#vue-router": path.resolve(
                __dirname,
                "./.nuxt/vue-router-stub.d.ts"
            ),
        },
    },
});
