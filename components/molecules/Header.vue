<template>
    <div class="container">
        <div v-for="item in items" :key="item.name">
            <NuxtLink :to="item.url" :class="{ selected: path === item.url }">
                {{ item.name }}
            </NuxtLink>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { HeaderItem } from "../../resources/types";
import { useNuxtApp } from "#app";

interface HeaderProps {
    items?: HeaderItem[];
}

const props = defineProps<HeaderProps>();

const { $router } = useNuxtApp();

const path = computed(() => $router.currentRoute.value.path);
</script>

<style scoped>
.container {
    display: flex;
    background-color: #333;
    color: white;
    padding: 20px 10px;
}

a {
    color: white;
    margin-right: 15px;
    text-decoration: none;
}

.selected {
    color: #0096d5;
}
</style>
