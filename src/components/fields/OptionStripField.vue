<script setup lang="ts" generic="T">

const model = defineModel<T>({ required: true });

const props = defineProps<{
    label?: string;
    options: [label: string, value: T][];
}>();

</script>

<template>
    <div class="option-strip field">
        <label v-if="label">{{ label }}</label>
        <div class="strip">
            <div v-for="[label, value] in options"
                class="option"
                :class="{
                    'selected': value === model
                }"
                @click="model = value"
                v-wave>{{ label }}</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.option-strip.field {

    > .strip {
        display: flex;
        flex-direction: row;
        border-radius: sz.$corner-medium;
        border: sz.$border-regular solid c.$border-soft;
        overflow: hidden;

        > .option {
            height: sz.$click-target;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background-color $ease-mat-accel-decel $dur-short;

            &.selected {
                background-color: c.$bg-checked;
            }
        }
    }

    + .option-strip.field {
        margin-top: sz.$pad;
    }
}
</style>./fields