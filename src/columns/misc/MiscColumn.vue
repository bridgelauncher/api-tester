<script setup lang="ts">
import Card from '@/components/Card.vue';
import WallpaperOffsetsCard from './wallpaper-offsets/WallpaperOffsetsCard.vue';
import TogglesCard from './toggles/TogglesCard.vue';


</script>

<template>
    <div class="column">
        <WallpaperOffsetsCard />
        <TogglesCard />
    </div>
</template>

<style scoped lang="scss">
.column {}
</style>