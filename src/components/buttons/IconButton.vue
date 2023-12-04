<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue';


const props = defineProps<{
    icon: string;
    disabled?: boolean;
    flavor?: 'accent' | 'error' | 'warning' | 'info',
}>();

</script>

<template>
    <button
        class="btn icon"
        :class="flavor"
        :disabled="!!disabled"
        v-wave>
        <SvgIcon :path="icon" />
    </button>
</template>

<style scoped lang="scss">
.btn.icon {
    width: sz.$click-target;
    height: sz.$click-target;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    color: c.$text-pri;
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: sz.$click-target;
    flex-shrink: 0;

    &[disabled] {
        cursor: not-allowed;
        opacity: c.$opacity-disabled;
    }

    @mixin flavor($name, $col) {
        &.#{$name} {
            color: $col;
        }
    }

    @include flavor(accent, c.$accent);
    @include flavor(error, c.$accent-error);
    @include flavor(warning, c.$accent-warning);
    @include flavor(info, c.$accent-info);
}
</style>