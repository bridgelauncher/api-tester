<script setup lang="ts">
import type { InstalledAppInfo } from '@/stores/useAppsStore';

const props = defineProps<{
    app: InstalledAppInfo;
}>();

</script>

<template>
    <div v-wave class="app-list-item row">
        <img :src="Bridge.getDefaultAppIconURL(app.packageName)"/>
        <div class="col">
        <div class="type-pri">{{ app.label }}</div>
        <div class="type-sec">{{ app.packageName }}</div>
    </div>
</div></template>

<style scoped lang="scss">
.app-list-item {
    align-items: center;
    gap: sz.$pad-half;
    min-height: sz.$click-target;
    padding: sz.$pad-min sz.$pad;
    cursor: pointer;

    > img {
        width: sz.$app-icon;
        height: sz.$app-icon;
    }
}
</style>