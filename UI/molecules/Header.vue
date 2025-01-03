<template>
    <div class="container">
        <div v-for="item in items" :key="item.name">
            <NuxtLink :to="item.url"> {{ item.name }} </NuxtLink>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    items: {
        type: Object,
    },
});
</script>

<style>
.container {
    display: flex;
    background-color: #333;
    color: white;
    padding: 20px 10px;
}

a {
    color: white;
}
</style>
