<template>
    <div>search comp</div>
</template>

<script lang="ts" setup>
console.log("search");

const { result, search } = useAlgoliaSearch("movie");
onMounted(async () => {
    await search({ query: "Jurassic" });
});
</script>

<style></style>
