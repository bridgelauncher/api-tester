import { defineStore } from "pinia";
import { computed, ref, toValue, watch } from "vue";

export const useWallpaperOffsetStore = defineStore('wallpaperOffset', () => 
{
    const usePageScroll = ref(true);
    const pagesX = ref(4);
    const pagesY = ref(4);
    const stepsX = computed(() => 1 / (toValue(pagesX) - 1));
    const stepsY = computed(() => 1 / (toValue(pagesY) - 1));
    const manualOffsetX = ref(0.5);
    const manualOffsetY = ref(0.5);
    const pageScrollOffsetX = ref(0);
    const pageScrollOffsetY = ref(0);
    const offsetX = computed(() => toValue(usePageScroll) ? toValue(pageScrollOffsetX) : toValue(manualOffsetX));
    const offsetY = computed(() => toValue(usePageScroll) ? toValue(pageScrollOffsetY) : toValue(manualOffsetY));

    watch([stepsX, stepsY], ([x, y]) =>
    {
        Bridge.setWallpaperOffsetSteps(x, y);
    });

    watch([offsetX, offsetY], ([x, y]) =>
    {
        Bridge.setWallpaperOffsets(x, y);
    });

    return {
        usePageScroll,
        pagesX,
        pagesY,
        stepsX,
        stepsY,
        manualOffsetX,
        manualOffsetY,
        pageScrollOffsetX,
        pageScrollOffsetY,
        offsetX,
        offsetY,
    };
});