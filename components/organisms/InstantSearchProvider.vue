<template>
    <div>
        <AisInstantSearchSsr>
            <AisConfigure
                :hits-per-page.camel="4"
                v-if="$route.params.indexName === 'movie'"
                :facet-filters.camel="`keywords:${$router.currentRoute.value.params.brand}`"
            />

            <AisRefinementList attribute="keywords"> </AisRefinementList>
            <AisInfiniteHits show-previous>
                <template #loadPrevious="{ isFirstPage, refinePrevious }">
                    <Button
                        v-if="!isFirstPage"
                        :disabled="isFirstPage"
                        @click="refinePrevious"
                        text="Load less"
                    >
                    </Button>
                </template>
                <template v-slot="{ items, refineNext, isLastPage }">
                    <div class="hit-items">
                        <div v-for="item in items" :key="item.objectID">
                            <Tile :item="item" />
                        </div>
                    </div>
                    <Button
                        :disabled="isLastPage"
                        @click="refineNext"
                        text="Load more"
                    >
                    </Button>
                </template>
            </AisInfiniteHits>
        </AisInstantSearchSsr>
    </div>
</template>
<script lang="ts" setup>
import { ref, nextTick } from "vue";

import { renderToString } from "vue/server-renderer";
import {
    AisInstantSearchSsr,
    AisRefinementList,
    AisInfiniteHits,
    AisIndex,
    AisConfigure,
    // @ts-ignore
} from "vue-instantsearch/vue3/es/index.js";
const Tile = defineAsyncComponent(
    () => import("../components/molecules/Tile.vue")
);
const Button = defineAsyncComponent(
    () => import("../components/molecules/Button.vue")
);

const $_ais_ssrInstantSearchInstance = inject([
    "$_ais_ssrInstantSearchInstance",
]);
const { ssrContext, payload, $router } = useNuxtApp();

const props = defineProps({
    indexName: {
        type: String,
        required: false,
        default: null,
    },
});

onServerPrefetch(async () => {
    console.log("renderToString", renderToString);
    const s = await $_ais_ssrInstantSearchInstance.findResultsState({
        component: this,
        renderToString,
    });
    console.log("respSSS", s);
    if (ssrContext?.payload.data) {
        ssrContext.payload.data.algoliaState = s;
    }
});

onMounted(() => {
    console.log($_ais_ssrInstantSearchInstance);
    setTimeout(() => {}, 5000);
});
onBeforeMount(async () => {
    if (payload.data.algoliaState) {
        $_ais_ssrInstantSearchInstance.hydrate(payload.data.algoliaState);
    } else {
        console.log("this", this);
        // somehow, it needs to be disposed and refreshed when i change route with client side navigation
        $_ais_ssrInstantSearchInstance.dispose();
        nextTick(() => {
            nextTick(() => {
                $_ais_ssrInstantSearchInstance.helper
                    .setIndex(props.indexName)
                    .search();
            });
        });
    }
    // avoid double hydration
    delete payload.data.algoliaState;
});
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
