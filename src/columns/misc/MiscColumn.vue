<script setup lang="ts">
import Card from '@/components/Card.vue';
import WallpaperOffsetsCard from './wallpaper-offsets/WallpaperOffsetsCard.vue';
import TogglesCard from './toggles/TogglesCard.vue';
import MiscActionsCard from './actions/MiscActionsCard.vue';
import ShowToastCard from './show-toast/ShowToastCard.vue';


</script>

<template>
    <div class="column">
        <WallpaperOffsetsCard />
        <TogglesCard />
        <MiscActionsCard />
        <ShowToastCard />
    </div>
</template>

<style scoped lang="scss">
.column {}
</style>