<script setup lang="ts">
import { mdiClose, mdiMagnify, mdiRefresh, mdiSelectSearch } from '@mdi/js';
import { computed, ref } from 'vue';
import { useAppsStore, RequestStatus } from '@/stores/useAppsStore';
import { simplifyString } from '@/utils/misc-utils';
import Card from '@/components/Card.vue';
import AppListItem from './AppListItem.vue';
import SvgIcon from '@/components/SvgIcon.vue';
import IconButton from '@/components/buttons/IconButton.vue';
import Tip from '@/components/Tip.vue';

const appsStore = useAppsStore();

const searchPhrase = ref('');

const filteredApps = computed(() =>
{
    const searchPhraseSimplified = simplifyString(searchPhrase.value);
    const searchPackageName = searchPhrase.value.trim().toLowerCase();
    return Array.from(appsStore.apps.values())
        .filter(a =>
            a.labelSimplified.includes(searchPhraseSimplified)
            || a.packageName.includes(searchPackageName)
        )
        .sort((a, b) => a.label.localeCompare(b.label));
});

</script>

<template>
    <div class="column">
        <Card title="Apps">

            <template #actions>
                <IconButton
                    :icon="mdiRefresh"
                    :disabled="appsStore.requestStatus === RequestStatus.InProgress"
                    :flavor="appsStore.requestStatus === RequestStatus.Error ? 'error' : undefined"
                    @click="appsStore.requestAppsAsync()" />
            </template>

            <div class="searchbar">
                <SvgIcon :path="mdiMagnify" />
                <input
                    type="text"
                    autocomplete="new-password"
                    placeholder="Tap here to search..."
                    v-model="searchPhrase" />
                <IconButton
                    :icon="mdiClose"
                    @click="searchPhrase = ''" />
            </div>
            <div class="separator"></div>
            <main class="app-list">
                <template v-if="filteredApps.length > 0">
                    <AppListItem
                        v-for="app in filteredApps"
                        :app="app"
                        @click="Bridge.requestLaunchApp(app.packageName)" />
                </template>
                <template v-else>
                    <Tip :icon="mdiSelectSearch">
                        No matching apps found.
                    </Tip>
                </template>
            </main>
        </Card>
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

.card > .app-list {
    padding-left: 0;
    padding-right: 0;
}
</style>