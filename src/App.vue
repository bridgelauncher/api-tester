<script setup lang="ts">
import { ref } from 'vue';
import { useBridgeStore } from './stores/useBridgeStore';
import HomeColumn from './columns/home/HomeColumn.vue';
import AppsColumn from './columns/apps/AppsColumn.vue';
import MiscColumn from './columns/misc/MiscColumn.vue';
import UpdatesColumn from './columns/updates/UpdatesColumn.vue';
import { px } from './utils/el-utils';

const bridgeStore = useBridgeStore();

const envIsDev = import.meta.env.DEV;

const toastText = ref('Testing 123');
const toastLong = ref(false);

function showToast()
{
    Bridge.showToast(toastText.value, toastLong.value);
}

</script>

<template>
    <div
        class="bridge-tester-root"
        :class="{ 'dev': envIsDev }"
        :style="{
            'padding-top': px(bridgeStore.statusBarHeight),
            'padding-bottom': px(bridgeStore.navigationBarHeight),
        }">

        <div class="system-bar-bg top" :style="{
            'height': px(bridgeStore.statusBarHeight),
        }"></div>

        <HomeColumn />
        <AppsColumn />
        <MiscColumn />
        <UpdatesColumn />

        <div class="system-bar-bg bot" :style="{
            'height': px(bridgeStore.navigationBarHeight),
        }"></div>

    </div>
</template>

<style scoped lang="scss">
@use "sass:math";

.bridge-tester-root {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: start;
    padding-top: sz.$pad-double;
    overflow: auto;
    scroll-snap-type: x mandatory;
    
    &.dev {
        background-color: #404040;
    }

    :deep(> .column) {
        width: 100%;
        flex-shrink: 0;
        min-height: 100%;
        padding: sz.$pad-half;
        padding-top: sz.$pad-double;
        scroll-snap-align: center;
        scroll-snap-stop: always;
        max-width: math.div(1920px, 4);
    }

    > .system-bar-bg {
        background-color: rgba(magenta, 0.5);
        position: fixed;
        left: 0;
        right: 0;

        &.top {
            top: 0;
        }

        &.bot {
            bottom: 0;
        }
    }
}
</style>
