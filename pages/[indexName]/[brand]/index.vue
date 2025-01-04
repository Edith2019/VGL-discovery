<template>
    <div>
        <NuxtLink :href="'/instant_search/Samsung'" style="display: block"
            >Go To instant search samsung</NuxtLink
        >
        <NuxtLink :href="'/instant_search/Metra'" style="display: block"
            >Go To instant search metra</NuxtLink
        >

        <NuxtLink :href="'/airbnb/test'" style="display: block"
            >Go To airbnb</NuxtLink
        >
        <InstantSearchProvider :indexName="$route.params.indexName" />
    </div>
</template>
<script setup lang="ts">
const InstantSearchProvider = defineAsyncComponent(
    () => import("../components/organisms/InstantSearchProvider.vue")
);
const { $router } = useNuxtApp();
console.log("$router", $router);
</script>

<style>
.cont {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    color: black;
}

.item {
    display: flex;
    flex-direction: column;
    width: 33.333%;
    flex: 0 0 33.333%;
}
</style>
