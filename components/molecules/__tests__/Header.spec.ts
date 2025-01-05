import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import Header from "../Header.vue";

describe("Header", () => {
    const NuxtLinkStub = {
        name: "NuxtLink",
        props: ["to"],
        template: '<a :href="to" class="nuxt-link-stub"><slot/></a>',
    };

    it("renders all items passed as props", () => {
        const items = [
            { name: "Home", url: "/" },
            { name: "About", url: "/about" },
            { name: "Contact", url: "/contact" },
        ];

        const wrapper = mount(Header, {
            props: { items },
            global: {
                mocks: {
                    useNuxtApp: () => ({
                        $router: {
                            currentRoute: { value: { path: "/" } },
                        },
                    }),
                },
                stubs: { NuxtLink: NuxtLinkStub },
            },
        });
        const links = wrapper.findAll("a");
        expect(links.length).toBe(items.length);
        items.forEach((item, index) => {
            expect(links[index].text()).toBe(item.name);
            expect(links[index].attributes("href")).toBe(item.url);
        });
    });

    it('applies "selected" class to the current route', async () => {
        const items = [
            { name: "Home", url: "/" },
            { name: "About", url: "/about" },
        ];

        const wrapper = mount(Header, {
            props: { items },
        });

        await wrapper.vm.$nextTick();
        const links = wrapper.findAll("a");
        expect(links[0].classes()).not.toContain("selected");
        expect(links[1].classes()).toContain("selected");
    });

    it('renders no items if "items" prop is empty', () => {
        const wrapper = mount(Header, {
            props: { items: [] },
            global: {
                mocks: {
                    $router: {
                        currentRoute: { value: { path: "/" } },
                    },
                },
            },
        });

        expect(wrapper.findAll("a").length).toBe(0);
    });

    it('handles missing "items" prop gracefully', () => {
        const wrapper = mount(Header, {
            global: {
                mocks: {
                    $router: {
                        currentRoute: { value: { path: "/" } },
                    },
                },
            },
        });

        expect(wrapper.findAll("a").length).toBe(0);
    });
});
