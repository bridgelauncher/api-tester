<script setup lang="ts">
import { mdiMinus, mdiPlus } from '@mdi/js';
import IconButton from './IconButton.vue';

const model = defineModel<number>({ required: true });

const props = withDefaults(
    defineProps<{
        label: string;
        min?: number;
        max?: number;
        step?: number;
        computedValue?: string;
        disabled?: boolean;
    }>(),
    {
        step: 1
    }
);

function incr()
{
    if (typeof props.max === 'number')
        model.value = Math.min(model.value + props.step, props.max);
    else
        model.value += props.step;
}

function decr()
{
    if (typeof props.min === 'number')
        model.value = Math.max(props.min, model.value - props.step);
    else
        model.value -= props.step;
}

</script>

<template>
    <div class="number field"
        :class="{
            'disabled': disabled
        }">
        <label class="name">{{ label }}</label>
        <IconButton :icon="mdiMinus" @click="decr()" />
        <input v-model="model" />
        <IconButton :icon="mdiPlus" @click="incr()" />
        <label class="computed" v-if="computedValue">{{ computedValue }}</label>
    </div>
</template>

<style scoped lang="scss">
.number.field {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: sz.$click-target;
    gap: sz.$pad-half;
    padding: 0 sz.$pad-half;

    > .name {
        min-width: 20px;
    }
        
    > input {
        @extend %type-pri;
        background-color: c.$bg-field;
        border: none;
        border-radius: sz.$corner-medium;
        padding: 0 sz.$pad;
        height: 100%;
        flex: 1;
        text-align: right;
        min-width: 0;
        outline: none;
    }
    
        > .computed {
            min-width: 30px;
            text-align: right;
            color: c.$text-sec;
        }
    
    &.disabled {
        opacity: c.$opacity-disabled;
        pointer-events: none;
    }
}
</style>