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
import type { searchItem } from "../../resources/types";

const ReadMore = defineAsyncComponent(
    () => import("../components/atoms/ReadMore.vue")
);

interface TileProps {
    item?: searchItem;
}

const props = defineProps<TileProps>();
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
