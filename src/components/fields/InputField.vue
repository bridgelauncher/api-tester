<script setup lang="ts">

const model = defineModel<string>({ required: true });

const props = defineProps<{
    label?: string;
    placeholder?: string;
}>();

</script>

<template>
    <div class="input field">
        <label v-if="label">{{ label }}</label>
        <input type="text"
            v-model="model"
            :placeholder="placeholder" />
    </div>
</template>

<style scoped lang="scss">
.input.field {
    width: 100%;

    > label {
        display: block;
        margin-bottom: sz.$pad-half;
        @extend %type-sec;
    }

    > input {
        background-color: c.$bg-field;
        border: none;
        @extend %type-pri;
        min-height: sz.$click-target;
        min-width: 0;
        width: 100%;
        border-radius: sz.$corner-medium;
        padding: 0 sz.$pad;
        outline: none;

        &::placeholder{
            color: c.$text-placeholder;
        }
    }

    + .field {
        margin-top: sz.$pad;
    }
}
</style>