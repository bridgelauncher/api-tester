<script setup lang="ts">
import IconButton from '@/components/buttons/IconButton.vue';
import SvgIcon from '@/components/SvgIcon.vue';
import { mdiClose, mdiMagnify } from '@mdi/js';


const text = defineModel<string>({ required: true });

</script>

<template>
    <div class="searchbar">
        <SvgIcon :path="mdiMagnify" />
        <input
            type="text"
            autocomplete="new-password"
            placeholder="Tap here to search..."
            v-model="text" />
        <IconButton
            :icon="mdiClose"
            @click="text = ''" />
    </div>
</template>

<style scoped lang="scss">
.searchbar {
    position: relative;
    display: flex;
    flex-direction: row;
    height: sz.$click-target;
    align-items: center;

    > svg {
        position: absolute;
        left: sz.$pad;
        color: c.$text-placeholder;
        pointer-events: none;
    }

    > input {
        background: none;
        border: none;
        flex: 1;
        outline: none;
        @extend %type-pri;
        padding-left: calc(24px + sz.$pad + sz.$pad-half);
    }

    > .btn.icon {
        border-radius: sz.$corner-large;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
}
</style>