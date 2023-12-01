<script setup lang="ts">
import TextButton from '@/components/buttons/TextButton.vue';

</script>

<template>
    <div class="column">

        <div class="type-jumbo">7:37 AM</div>
        <div class="type-pri">Bridge Launcher API Tester</div>
        <div class="type-sec">Tap anywhere to send a wallpaper tap</div>
        <div class="type-sec">Swipe left for tools</div>

        <TextButton variant="outlined"
            @click="console.log(Bridge.getSystemBarsIgnoringVisibilityWindowInsets())" v-wave>
            Get insets
        </TextButton>

    </div>
</template>

<style scoped lang="scss">
.column {
    text-align: center;
}
</style>