<script setup lang="ts">
import { mdiCheckboxBlankOutline, mdiCheckboxMarked } from '@mdi/js';
import SvgIcon from '@/components/SvgIcon.vue';

const model = defineModel<boolean>({ required: true, });

const props = defineProps<{
    label: string,
    secText?: string,
}>();

</script>

<template>
    <button class="checkbox field"
        :class="{
            'checked': model
        }"
        @click="model = !model"
        v-wave>
        <SvgIcon :path="model ? mdiCheckboxMarked : mdiCheckboxBlankOutline" />
        <div class="text">
            <div class="type-pri">{{ label }}</div>
            <div class="type-sec" v-if="secText">{{ secText }}</div>
        </div>
    </button>
</template>

<style scoped lang="scss">
.checkbox.field {
    position: relative;
    width: 100%;
    min-height: sz.$click-target;
    display: flex;
    align-items: center;
    @extend %type-pri;
    border-radius: sz.$corner-medium;
    padding: sz.$pad-min sz.$pad-icon;
    padding-right: calc(sz.$pad-half + sz.$pad-icon);
    gap: sz.$pad-icon;
    cursor: pointer;
    border: none;
    border-radius: sz.$corner-medium;
    background: none;
    outline: none;

    &:after {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: c.$bg-checked;
        border-radius: sz.$corner-medium;
        opacity: 0;
        transition: opacity $ease-mat-accel-decel $dur-short;
    }
    
    &.checked {
        &:after {
            opacity: 1;

        }
    }
}
</style>