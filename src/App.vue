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

        <div class="columns">
            <HomeColumn />
            <AppsColumn />
            <MiscColumn />
            <UpdatesColumn />
        </div>

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
    overflow: auto;
    scroll-snap-type: x mandatory;

    &.dev {
        background-color: #404040;
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

    > .columns {
        display: flex;
        flex-direction: row;

        :deep(> .column) {
            width: 100%;
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
