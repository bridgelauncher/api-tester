<script setup lang="ts">
import type { InstalledApp } from '@/stores/useBridgeStore';

const props = defineProps<{
    app: InstalledApp;
}>();

</script>

<template>
    <div v-wave class="app-list-item">
        <div class="col">
            <div class="type-pri">{{ app.label }}</div>
            <div class="type-sec">{{ app.packageName }}</div>
        </div>
    </div>
</template>

<style scoped lang="scss">

.app-list-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    min-height: sz.$click-target;
    padding: sz.$pad-min sz.$pad;
    cursor: pointer;
}

</style>