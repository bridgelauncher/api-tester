<script setup lang="ts">
import { computed, ref } from 'vue';
import { f2 } from '@/utils/format-utils';
import Card from '@/components/Card.vue';
import CheckboxField from '@/components/CheckboxField.vue';
import NumberField from '@/components/NumberField.vue';
import SliderField from '@/components/SliderField.vue';


const usePageScroll = ref(false);
const xPages = ref(3);
const yPages = ref(3);
const xOffsetSteps = computed({
    get: () => 1 / xPages.value,
    set: o => xPages.value = Math.round(1 / o),
});
const yOffsetSteps = computed({
    get: () => 1 / yPages.value,
    set: o => yPages.value = Math.round(1 / o),
});
const xOffset = ref(0.5);
const yOffset = ref(0.5);

</script>

<template>
    <Card title="Wallpaper offsets">
        <main class="cbx-container">
            <CheckboxField
                label="Use page scroll"
                v-model="usePageScroll" />
        </main>
        <div class="separator"></div>
        <main class="fields">
            <label class="type-caption">Pages</label>
            <NumberField
                label="X"
                v-model="xPages"
                :disabled="usePageScroll"
                :min="1"
                :computed-value="f2(xOffsetSteps)" />
            <NumberField
                label="Y"
                v-model="yPages"
                :min="1"
                :computed-value="f2(yOffsetSteps)" />
        </main>
        <div class="separator"></div>
        <main class="fields">
            <label class="type-caption">Offsets</label>
            <SliderField
                label="X"
                v-model="xOffset"
                :min="0"
                :max="1"
                :disabled="usePageScroll" />
            <SliderField
                label="Y"
                v-model="yOffset"
                :min="0"
                :max="1"
                :disabled="usePageScroll" />
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