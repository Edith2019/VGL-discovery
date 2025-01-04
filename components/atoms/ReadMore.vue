<template>
    <div>
        <p>
            {{ isTruncated ? truncatedText : fullText }}
            <span @click="toggleText" class="toggle-text">
                {{ isTruncated ? "See More" : "See Less" }}
            </span>
        </p>
    </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref, computed } from "vue";

const props = defineProps({
    fullText: {
        type: String,
        required: true,
    },
    maxCharacters: {
        type: Number,
        default: 100,
    },
});
const showFullText = ref(false);

const truncatedText = computed(() =>
    props.fullText.length > props.maxCharacters
        ? props.fullText.slice(0, props.maxCharacters) + "..."
        : props.fullText
);

const isTruncated = computed(
    () => props.fullText.length > props.maxCharacters && !showFullText.value
);

const toggleText = () => {
    showFullText.value = !showFullText.value;
};
</script>

<style scoped>
.toggle-text {
    color: blue;
    cursor: pointer;
    text-decoration: underline;
}
</style>
