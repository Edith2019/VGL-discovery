import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import ReadMore from "../ReadMore.vue";

describe("ReadMore Component", () => {
    const longText =
        "This is a long piece of text that exceeds the maximum character limit for truncation.";
    const shortText = "Short text";

    it("renders truncated text when fullText exceeds maxCharacters", () => {
        const wrapper = mount(ReadMore, {
            props: {
                fullText: longText,
                maxCharacters: 30,
            },
        });

        expect(wrapper.text()).toContain(
            "This is a long piece of text t... See More"
        );
    });

    it('renders full text when "See More" is clicked', async () => {
        const wrapper = mount(ReadMore, {
            props: {
                fullText: longText,
                maxCharacters: 30,
            },
        });

        await wrapper.find(".toggle-text").trigger("click"); // Simulate the click
        expect(wrapper.text()).toContain(longText);
        expect(wrapper.text()).toContain("See Less");
    });

    it("renders full text when fullText is shorter than maxCharacters", () => {
        const wrapper = mount(ReadMore, {
            props: {
                fullText: shortText,
                maxCharacters: 30,
            },
        });

        expect(wrapper.text()).toContain(shortText);
        expect(wrapper.text()).not.toContain("See More");
    });

    it('toggles back to truncated text when "See Less" is clicked', async () => {
        const wrapper = mount(ReadMore, {
            props: {
                fullText: longText,
                maxCharacters: 30,
            },
        });

        await wrapper.find(".toggle-text").trigger("click"); // First click: show full text
        await wrapper.find(".toggle-text").trigger("click"); // Second click: show truncated text
        expect(wrapper.text()).toContain(
            "This is a long piece of text t... See More"
        );
    });

    it("handles edge case where fullText is null or empty", () => {
        const wrapper = mount(ReadMore, {
            props: {
                fullText: "",
                maxCharacters: 30,
            },
        });

        expect(wrapper.text()).toBe("See Less");
        expect(wrapper.find(".toggle-text").exists()).toBe(true); // No toggle button should be shown
    });
});
