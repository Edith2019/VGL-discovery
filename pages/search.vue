<template>
    <div>
        <ais-instant-search :index-name="indexName" :search-client="algolia">
            <ais-search-box />
            <ais-hits class="hit-items">
                <template #default="{ items }">
                    <div
                        v-for="item in items"
                        :key="item.objectID"
                        class="hit-item"
                    >
                        <h2>{{ item.title }}</h2>
                        <ReadMore :full-text="item.overview" />
                        <NuxtImg
                            :src="item.poster_path"
                            :alt="item.title"
                            sizes="100vw sm:50vw md:400px"
                        />
                    </div>
                </template>
            </ais-hits>
        </ais-instant-search>
    </div>
</template>

<script lang="ts" setup>
import {
    AisInstantSearch,
    AisSearchBox,
    AisHits,
} from "vue-instantsearch/vue3/es";
const ReadMore = defineAsyncComponent(
    () => import("../components/atoms/ReadMore.vue")
);

const indexName = "movie";
const algolia = useAlgoliaRef();
</script>

<style scoped>
.hit-items {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(3, 3fr);
    column-gap: 20px;
    width: 100%;
}

.hit-item {
    margin-bottom: 16px;
    border: 1px solid #ddd;
    padding: 16px;
    border-radius: 8px;
}

img {
    text-align: center;
    width: 100%;
}
</style>
