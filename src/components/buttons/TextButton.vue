<script setup lang="ts">
import SvgIcon from '../SvgIcon.vue';

const props = withDefaults(

    defineProps<{
        variant?: 'flat' | 'outlined';
        suffixIcon?: string;
        prefixIcon?: string;
    }>(),
    {
        variant: 'outlined',
    }
);

</script>

<template>
    <button class="btn" :class="variant" v-wave>
        <SvgIcon v-if="prefixIcon" :path="prefixIcon" />
        <slot></slot>
        <SvgIcon v-if="suffixIcon" :path="suffixIcon" />
    </button>
</template>

<style scoped lang="scss">
.btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    min-height: sz.$click-target;
    @extend %type-button;
    background: none;
    border: none;
    cursor: pointer;
    padding: sz.$pad-min sz.$pad;
    border-radius: sz.$corner-medium;
    outline: none;

    &.outlined {
        border: sz.$border-regular solid c.$border-soft;
    }
}
</style>