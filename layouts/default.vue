<template>
    <div>
        <Header :items="items" />
        <div class="default-layout">
            <slot />
        </div>
    </div>
</template>

<script lang="ts" setup>
const Header = defineAsyncComponent(
    () => import("./components/molecules/Header.vue")
);
const items = [
    { name: "home", url: "/" },
    { name: "search client", url: "/search" },
    { name: "search SSR", url: "/search-ssr" },
];
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Funnel+Sans:ital,wght@0,300..800;1,300..800&display=swap");
body {
    margin: 0px;
    font-family: "Funnel Sans", serif;
}
.default-layout {
    margin: 10px;
}
</style>
