<script setup lang="ts">
import IconButton from './IconButton.vue';


const props = defineProps<{
    title: string,
    actions?: { icon: string, onClick: () => void; }[];
}>();

</script>

<template>
    <section class="card">
        <header>
            <div class="title">
                {{ title }}
            </div>
            <div class="actions">
                <IconButton v-for="action in actions"
                    :icon="action.icon"
                    @click="action.onClick" />
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

    > header {
        display: flex;
        flex-direction: row;
        align-items: center;
        min-height: sz.$click-target;

        .title {
            @extend %type-header;
            padding: sz.$pad-half sz.$pad;
        }

        > .actions {
            margin-left: auto;

            > .btn.icon {
                border-radius: sz.$corner-large;
                border-bottom-right-radius: 0;
            }
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