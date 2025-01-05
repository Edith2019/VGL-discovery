<template>
    <button
        :class="[
            'custom-button',
            `custom-button--${size}`,
            `custom-button--${variant}`,
            { 'custom-button--disabled': disabled },
        ]"
        :disabled="disabled"
        @click="handleClick"
    >
        {{ text }}
    </button>
</template>

<script setup lang="ts">
interface ButtonProps {
    text: string;
    size?: "small" | "medium" | "large";
    variant?: "primary" | "secondary" | "outline";
    disabled?: boolean;
}

const props = withDefaults(defineProps<ButtonProps>(), {
    size: "medium",
    variant: "primary",
    disabled: false,
});

const emit = defineEmits<{
    (e: "click", event: MouseEvent): void;
}>();

const handleClick = (event: MouseEvent) => {
    if (!props.disabled) {
        emit("click", event);
    }
};
</script>

<style scoped>
.custom-button {
    font-weight: bold;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

.custom-button--small {
    font-size: 12px;
    padding: 6px 12px;
}

.custom-button--medium {
    font-size: 14px;
    padding: 8px 16px;
    max-width: 150px;
}

.custom-button--large {
    font-size: 16px;
    padding: 10px 20px;
}

.custom-button--primary {
    background-color: #3498db;
    color: white;
}

.custom-button--primary:hover {
    background-color: #2980b9;
}

.custom-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.custom-button--disabled:hover {
    background-color: inherit;
    color: inherit;
    border-color: inherit;
}
</style>
