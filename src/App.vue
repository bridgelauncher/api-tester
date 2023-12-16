<script setup lang="ts">
import { useWallpaperOffsetStore } from '@/stores/useWallpaperOffsetStore';
import { useWindowInsetsStore } from '@/stores/useWindowInsetsStore';
import { ref, watch, watchEffect } from 'vue';
import { px } from './utils/el-utils';
import { useElementSize, useScroll, useSwipe } from '@vueuse/core';
import HomeColumn from './columns/home/HomeColumn.vue';
import AppsColumn from './columns/apps/AppsColumn.vue';
import MiscColumn from './columns/misc/MiscColumn.vue';
import EventHistoryColumn from './columns/event-history/EventHistoryColumn.vue';
import { useTogglesStore } from './stores/useTogglesStore';

const envIsDev = import.meta.env.DEV;

const insets = useWindowInsetsStore();
const wallpaperOffsets = useWallpaperOffsetStore();
const toggles = useTogglesStore();

const columnsRef = ref<HTMLElement>();
const columnsSize = useElementSize(columnsRef);

const scrollingRef = ref<HTMLElement>();
const scrollingSize = useElementSize(scrollingRef);
const scrollState = useScroll(scrollingRef);

watchEffect(() =>
{
    requestAnimationFrame(() =>
    {
        const maxOffsetX = columnsSize.width.value - scrollingSize.width.value;
        const maxOffsetY = columnsSize.height.value - scrollingSize.height.value;
        const sx = scrollState.x.value;
        const sy = scrollState.y.value;
        const x = maxOffsetX === 0 ? 0 : sx / maxOffsetX;
        const y = maxOffsetY === 0 ? 0 : sy / maxOffsetY;

        wallpaperOffsets.pageScrollOffsetX = x;
        wallpaperOffsets.pageScrollOffsetY = y;
    });
});

const swipe = useSwipe(scrollingRef, {
    onSwipeEnd: (e, direction) =>
    {
        if (direction === 'down' && scrollState.y.value <= 1)
            Bridge.requestExpandNotificationShade();
    },
});

watch(() => insets.statusBars, (insets) =>
{
    console.log('@App.watch(insets.statusBars):', JSON.stringify(insets));
}, {
    immediate: true
})

</script>

<template>
    <div
        class="bridge-tester-root"
        :class="{ 'dev': envIsDev }"
        :style="{
            'padding-top': px(insets.statusBars.top),
            'padding-bottom': px(insets.navigationBars.bottom),
        }"
        ref="scrollingRef"
        @click="Bridge.sendWallpaperTap($event.clientX, $event.clientY)">

        <div
            class="system-bar-bg top"
            :class="toggles.statusBarAppearance"
            :style="{
                'height': px(insets.statusBars.top),
            }"></div>

        <div class="columns" ref="columnsRef">
            <HomeColumn />
            <AppsColumn />
            <MiscColumn />
            <EventHistoryColumn />
        </div>

        <div
            class="system-bar-bg bot"
            :class="toggles.navigationBarAppearance"
            :style="{
                'height': px(insets.navigationBars.bottom),
            }"></div>

    </div>
</template>

<style scoped lang="scss">
@use "sass:math";

.bridge-tester-root {
    width: 100%;
    height: 100%;
    overflow: auto;
    scroll-snap-type: x mandatory;

    &.dev {
        background-color: #404040;
    }

    > .system-bar-bg {
        position: fixed;
        left: 0;
        right: 0;

        &.dark-fg {
            background-color: rgba(#fff, 0.5);
        }

        &.light-fg {
            background-color: rgba(#000, 0.5);
        }

        &.top {
            top: 0;
        }

        &.bot {
            bottom: 0;
        }
    }

    > .columns {
        display: flex;
        flex-direction: row;
        min-height: 100%;
        min-width: 100%;
        width: fit-content;

        :deep(> .column) {
            width: 100vw;
            min-height: 100%;
            flex-shrink: 0;
            padding: sz.$pad-double sz.$pad-half;
            scroll-snap-align: center;
            scroll-snap-stop: always;
            max-width: math.div(1920px - 17px, 4);
            // border: 2px dashed magenta;
        }
    }

}
</style>