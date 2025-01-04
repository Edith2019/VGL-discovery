<template>
    <div>
        <NuxtLink :href="'/movie/jurassic'" style="display: block"
            >Go To instant search Jurassic</NuxtLink
        >
        <NuxtLink :href="'/movie/witch'" style="display: block"
            >Go To instant search witch</NuxtLink
        >
        <NuxtLink :href="'/movie/natural%20disaster'" style="display: block"
            >Go To instant search natural disaster</NuxtLink
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

<style scoped>
a {
    color: black;
}
</style>
