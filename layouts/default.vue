<template>
    <div>
        <Header :items="items" />
        <slot />
    </div>
</template>

<script lang="ts" setup>
const Header = defineAsyncComponent(() => import("./UI/molecules/Header.vue"));
const items = [{ name: "search", url: "search" }];
</script>

<style>
body {
    margin: 0px;
}
</style>
