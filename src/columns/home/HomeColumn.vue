<script setup lang="ts">
import TextButton from '@/components/buttons/TextButton.vue';
import { useSwipe } from '@vueuse/core';
import { ref } from 'vue';

</script>

<template>
    <div class="column">

        <div class="stick">
            <div class="type-jumbo">7:37 AM</div>
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