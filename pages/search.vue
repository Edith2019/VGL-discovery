<template>
    <div>
        <AisInstantSearch :index-name="indexName" :search-client="algolia">
            <AisSearchBox />
            <AisHits class="hit-items">
                <template #default="{ items }">
                    <div v-for="item in items" :key="item.objectID">
                        <Tile :item="item" />
                    </div>
                </template>
            </AisHits>
        </AisInstantSearch>
    </div>
</template>

<script lang="ts" setup>
import {
    AisInstantSearch,
    AisSearchBox,
    AisHits,
} from "vue-instantsearch/vue3/es";

const Tile = defineAsyncComponent(
    () => import("../components/molecules/Tile.vue")
);

const indexName = "movie";
const algolia = useAlgoliaRef();
</script>

<style scoped>
.hit-items {
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    width: 100%;
}

/* Tablet view */
@media (min-width: 768px) {
    .hit-items {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Desktop view */
@media (min-width: 1024px) {
    .hit-items {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* Big screen view */
@media (min-width: 1440px) {
    .hit-items {
        grid-template-columns: repeat(4, 1fr);
    }
}
</style>
