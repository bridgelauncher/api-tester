<script setup lang="ts">
import TextButton from '@/components/buttons/TextButton.vue';
import { p2 } from '@/utils/format-utils';
import { useNow, useSwipe } from '@vueuse/core';
import { ref } from 'vue';

const now = useNow({
    interval: 1000,
});

function getClockText()
{
    const n = now.value;
    const h = n.getHours();
    const m = n.getMinutes();
    const ampm = h > 12 ? 'PM' : 'AM';
    return `${h > 12 ? h - 12 : h}:${p2(m)} ${ampm}`;
}

</script>

<template>
    <div class="column">

        <div class="stick">
            <div class="type-jumbo">{{ getClockText() }}</div>
            <div class="type-pri">Bridge Launcher API Tester</div>
            <div class="type-sec">Tap anywhere to send a wallpaper tap</div>
            <div class="type-sec">Swipe left for tools</div>
        </div>

    </div>
</template>

<style scoped lang="scss">
.column {
    text-align: center;

    .stick {
        position: sticky;
        top: sz.$pad-double;
    }
}
</style>