<script setup lang="ts">
import SvgIcon from './SvgIcon.vue';

const props = defineProps<{
    icon: string;
}>();

</script>

<template>
    <div class="tip">
        <header>
            <SvgIcon :path="icon" />
        </header>
        <main>
            <slot></slot>
        </main>
    </div>
</template>

<style scoped lang="scss">
.tip {
    color: c.$text-sec;
    text-align: center;
    padding: sz.$pad;

    > header {
        margin-bottom: sz.$pad-half;
    }
}
</style>