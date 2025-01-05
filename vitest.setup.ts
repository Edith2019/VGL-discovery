import { vi } from "vitest";
import { config, RouterLinkStub } from "@vue/test-utils";

const nuxtAppMock = {
    $router: {
        currentRoute: {
            value: {},
        },
    },
    $algolia: vi.fn(),
};

vi.mock("#components", () => ({
    NuxtLink: RouterLinkStub,
}));

vi.mock("#imports", () => ({
    useRunTimeConfig: vi.fn(() => ({ public: {} })),
    useNuxtApp: vi.fn(() => nuxtAppMock),
}));

vi.mock("#app", () => ({
    useNuxtApp: () => ({
        $router: {
            currentRoute: { value: { path: "/about" } },
        },
    }),
}));

config.global.stubs = { NuxtLink: RouterLinkStub };

vi.stubGlobal("useNuxtApp", () => nuxtAppMock);
