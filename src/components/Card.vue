<script setup lang="ts">
import IconButton from '@/components/buttons/IconButton.vue';
import type { MaybeRefOrGetter } from 'vue';
import { toValue } from 'vue';


const props = defineProps<{
    title: string,
    actions?: {
        icon: MaybeRefOrGetter<string>,
        disabled?: MaybeRefOrGetter<boolean>,
        onClick: () => void;
    }[];
}>();

</script>

<template>
    <section class="card">
        <header>
            <div class="title">
                {{ title }}
            </div>
            <div class="actions">
                <slot name="actions"></slot>
            </div>
        </header>
        <div class="separator"></div>
        <slot></slot>
    </section>
</template>

<style scoped lang="scss">
.card {
    background-color: c.$bg-default;
    border-radius: sz.$corner-large;
    transition: background-color $ease-mat-accel-decel $dur-medium;

    > header {
        display: flex;
        flex-direction: row;
        align-items: center;
        min-height: sz.$bar;

        .title {
            @extend %type-header;
            padding: sz.$pad-half sz.$pad;
        }

        > .actions {
            margin-left: auto;
            padding-right: sz.$pad-min;
        }
    }

    :deep(> main) {
        padding: sz.$pad;
    }

    + .card {
        margin-top: sz.$pad;
    }
}
</style>