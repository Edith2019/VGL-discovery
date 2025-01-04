<template>
    <div>
        <AisInstantSearchSsr>
            <AisConfigure
                :hits-per-page.camel="4"
                v-if="$route.params.indexName === 'movie'"
                :facet-filters.camel="`keywords:${$router.currentRoute.value.params.brand} `"
            />

            <!-- <AisRefinementList attribute="keywords"> </AisRefinementList> -->
            <AisInfiniteHits show-previous>
                <template #loadPrevious="{ isFirstPage, refinePrevious }">
                    <button :disabled="isFirstPage" @click="refinePrevious">
                        Load less
                    </button>
                </template>
                <template v-slot="{ items, refineNext, isLastPage }">
                    <div class="cont">
                        <div
                            v-for="item in items"
                            :key="item.objectID"
                            class="item"
                        >
                            {{ item.name }}
                            <img :src="item.image ?? item.thumbnail_url" />
                            {{ item }}
                        </div>
                    </div>
                    <button :disabled="isLastPage" @click="refineNext">
                        Load more
                    </button>
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

const $_ais_ssrInstantSearchInstance = inject([
    "$_ais_ssrInstantSearchInstance",
]);
const nuxtApp = useNuxtApp();
const { ssrContext, payload, $router } = useNuxtApp();
console.log("$router", $router);

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
    // if (ssrContext.payload.data) {
    //     ssrContext.payload.data.algoliaState = s;
    // }
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
