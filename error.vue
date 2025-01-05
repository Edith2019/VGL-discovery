<template>
    <NuxtLayout>
        <div class="error-page">
            <h2>Woops, there is an error. Sorry for the inconvenience!</h2>
            <NuxtImg
                src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG1xZDBuZzV3OWhkYW4xOTVmNjVlOWVwcjBpMXRxdnN2Ym5tYWN3OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/EFXGvbDPhLoWs/giphy.webp"
                width="200"
            />
            <Button text="Go to home page" @click="handleError" />
            <DevOnly>
                <pre>   {{ error }}</pre>
            </DevOnly>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";
const Button = defineAsyncComponent(
    () => import("./components/molecules/Button.vue")
);

const props = defineProps({
    error: Object as () => NuxtError,
});

const handleError = () => clearError({ redirect: "/" });
</script>
<style scoped>
.error-page {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}

img {
    margin-bottom: 20px;
}
</style>
