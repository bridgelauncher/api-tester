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
import Searchbar from '@/components/Searchbar.vue';

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

            <Searchbar v-model="searchPhrase"/>

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

.card > .app-list {
    padding-left: 0;
    padding-right: 0;
}
</style>