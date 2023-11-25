<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue';


const props = defineProps<{
    icon: string;
}>();

</script>

<template>
    <button class="btn icon" v-wave>
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
}
</style>