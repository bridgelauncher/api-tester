<script setup lang="ts">

const props = withDefaults(
    defineProps<{
        path: string;
        size?: number;
        viewBoxOverride?: string;
    }>(),
    {
        size: 24,
    }
);

function resolveViewBox()
{
    return props.viewBoxOverride ?? `0 0 ${props.size} ${props.size}`;
}

</script>

<template>
    <svg
        :width="size"
        :height="size"
        :view-box="resolveViewBox()">
        <path :d="path" fill="currentColor"></path>
    </svg>
</template>

<style scoped lang="scss"></style>