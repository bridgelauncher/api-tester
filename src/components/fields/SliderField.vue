<script setup lang="ts">
import { f2 } from '@/utils/format-utils';
import { computed } from 'vue';

const model = defineModel<number>({ required: true });

const props = withDefaults(
    defineProps<{
        label: string;
        min: number;
        max: number;
        step?: number;
        disabled?: boolean;
    }>(),
    {
        step: 0.01,
    }
);

const stringModel = computed({
    get: () => model.value.toString(),
    set: value => model.value = parseFloat(value),
});

const progressF = computed(() =>
{
    return (model.value - props.min) / (props.max - props.min);
})

</script>

<template>
    <div class="slider field"
        :class="{
            'disabled': disabled
        }">
        <label class="name">{{ label }}</label>
        <div class="range">
            <div class="track"></div>
            <div class="progress"
                :style="{
                    'transform': `scaleX(${progressF})`,
                }"></div>
            <div class="thumb-container">
                <div class="thumb"
                    :style="{
                        'left': `${progressF * 100}%`,
                    }"></div>
            </div>
            <input type="range"
                v-model="stringModel"
                :min="min"
                :max="max"
                :step="step" />
        </div>
        <label class="value">{{ f2(model) }}</label>
    </div>
</template>

<style scoped lang="scss">
@use "sass:math";

.slider.field {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: sz.$click-target;
    gap: sz.$pad;
    padding: 0 sz.$pad-half;

    > .name {
        min-width: 20px;
    }

    > .range {
        flex: 1;
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        height: 100%;
        border: sz.$border-regular solid c.$border-soft;
        border-radius: sz.$corner-medium;
        $c-progress: c.$fg-solid;

        > .track, > .progress {
            position: absolute;
            height: 2px;
            width: calc(100% - sz.$pad * 2);
            border-radius: 2px;
        }

        > .track {
            background-color: c.$border-soft;
        }

        > .progress {
            background-color: $c-progress;
            transform-origin: left;
        }

        > .thumb-container {
            $size: 16px;
            position: absolute;
            height: $size;
            width: calc(100% - sz.$pad * 2);

            > .thumb {
                position: absolute;
                width: $size;
                height: $size;
                border-radius: $size;
                background-color: $c-progress;
                transform: translateX(-50%);
            }
        }

        > input[type=range] {
            position: absolute;
            height: 100%;
            width: 100%;
            -webkit-appearance: none;
            appearance: none;
            background: transparent;
            touch-action: none;
            padding: 0 sz.$pad;
            opacity: 0;

            &::-webkit-slider-runnable-track {
                height: 2px;
                background-color: red;
                width: 100%;
            }

            &::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 1px;
                height: 24px;
                margin-top: math.div(24px - 2px, -2);
                background-color: red;
            }

        }
    }

    > .value {
        min-width: 30px;
        text-align: right;
    }

    &.disabled {
        opacity: c.$opacity-disabled;
        pointer-events: none;
    }
}
</style>