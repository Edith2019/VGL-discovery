<template>
    <div class="item">
        <h2>{{ item.title }}</h2>
        <ReadMore :full-text="item.overview" />
        <NuxtImg
            :src="item.poster_path"
            :alt="item.title"
            sizes="100vw sm:50vw md:400px"
        />
    </div>
</template>

<script lang="ts" setup>
const ReadMore = defineAsyncComponent(
    () => import("../components/atoms/ReadMore.vue")
);

const props = defineProps({
    item: {
        type: Object,
    },
});
</script>

<style scoped>
.item {
    margin-bottom: 16px;
    border: 1px solid #ddd;
    padding: 16px;
    border-radius: 8px;
    width: auto;
}

img {
    text-align: center;
    width: 100%;
}
</style>
