<script setup lang="ts">
import IconButton from '@/components/buttons/IconButton.vue';
import type { InstalledAppInfo } from '@/stores/useAppsStore';
import { mdiClose, mdiInformationOutline, mdiTrashCanOutline } from '@mdi/js';

const props = defineProps<{
    app: InstalledAppInfo;
}>();

</script>

<template>
    <div v-wave class="app-list-item row">
        <img :src="Bridge.getDefaultAppIconURL(app.packageName)" />
        <div class="col">
            <div class="type-pri">{{ app.label }}</div>
            <div class="type-sec">{{ app.packageName }}</div>
        </div>
        <div class="actions">
            <IconButton
                :icon="mdiInformationOutline"
                @pointerdown.stop=""
                @click.stop="Bridge.requestOpenAppInfo(app.packageName)" />
            <IconButton
                :icon="mdiClose"
                @pointerdown.stop=""
                @click.stop="Bridge.requestAppUninstall(app.packageName)" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.app-list-item {
    align-items: center;
    gap: sz.$pad-half;
    min-height: sz.$click-target;
    padding: sz.$pad-min sz.$pad;
    padding-right: sz.$pad-min;
    cursor: pointer;

    > img {
        width: sz.$app-icon;
        height: sz.$app-icon;
    }

    > .col {
        flex: 1;

        > .type-pri, > .type-sec {
            word-break: break-word;
        }
    }

    > .actions {
        display: flex;
        flex-direction: row;
        margin-left: auto;
    }
}
</style>