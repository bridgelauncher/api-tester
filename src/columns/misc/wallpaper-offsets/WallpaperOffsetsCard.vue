<script setup lang="ts">
import { computed, ref } from 'vue';
import { f2 } from '@/utils/format-utils';
import Card from '@/components/Card.vue';
import CheckboxField from '@/components/fields/CheckboxField.vue';
import NumberField from '@/components/fields/NumberField.vue';
import SliderField from '@/components/fields/SliderField.vue';
import { useBridgeStore } from '@/stores/useBridgeStore';
import { useWallpaperOffsetStore } from '@/stores/useWallpaperOffsetStore';

const store = useWallpaperOffsetStore();

</script>

<template>
    <Card title="Wallpaper offsets">
        <main class="cbx-container">
            <CheckboxField
                label="Use page scroll"
                v-model="store.usePageScroll" />
        </main>
        <div class="separator"></div>
        <main class="fields">
            <label class="type-caption">Pages</label>
            <NumberField
                label="X"
                v-model="store.pagesX"
                :disabled="store.usePageScroll"
                :min="1"
                :computed-value="f2(store.stepsX)" />
            <NumberField
                label="Y"
                v-model="store.pagesY"
                :min="1"
                :computed-value="f2(store.stepsY)" />
        </main>
        <div class="separator"></div>
        <main class="fields">
            <label class="type-caption">Offsets</label>
            <SliderField
                label="X"
                v-model="store.manualOffsetX"
                :min="0"
                :max="1"
                :disabled="store.usePageScroll" />
            <SliderField
                label="Y"
                v-model="store.manualOffsetY"
                :min="0"
                :max="1"
                :disabled="store.usePageScroll" />
        </main>
    </Card>
</template>

<style scoped lang="scss">
.card {
    .cbx-container {
        padding: sz.$pad-half;
    }

    .type-caption {
        display: block;
        margin-bottom: sz.$pad-half;
    }
}
</style>