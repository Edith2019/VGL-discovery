<template>
    <div>
        <Header :items="items" />
        <div class="default-layout">
            <slot />
        </div>
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
.default-layout {
    margin: 10px;
}
</style>
