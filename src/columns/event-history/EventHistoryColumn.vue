<script setup lang="ts">
import type { BridgeEventMap, BridgeEventName } from '@bridgelauncher/api';
import Card from '@/components/Card.vue';
import IconButton from '@/components/buttons/IconButton.vue';
import { useBridgeEventStore } from '@/stores/useBridgeEventStore';
import { mdiNuke } from '@mdi/js';
import { formatTimeAgo } from '@vueuse/core';
import { computed } from 'vue';

const store = useBridgeEventStore();

type EventCategory = 'apps' | 'system' | 'toggles' | 'insets';

function categoryFor(name: BridgeEventName): EventCategory
{
    switch (name)
    {
        case 'appInstalled':
        case 'appChanged':
        case 'appRemoved':
            return 'apps';

        case 'beforePause':
        case 'afterResume':
        case 'canRequestSystemNightModeChanged':
        case 'canLockScreenChanged':
            return 'system';

        case 'bridgeButtonVisibilityChanged':
        case 'drawSystemWallpaperBehindWebViewChanged':
        case 'systemNightModeChanged':
        case 'bridgeThemeChanged':
        case 'statusBarAppearanceChanged':
        case 'navigationBarAppearanceChanged':
            return 'toggles';

        case 'statusBarsWindowInsetsChanged':
        case 'statusBarsIgnoringVisibilityWindowInsetsChanged':

        case 'navigationBarsWindowInsetsChanged':
        case 'navigationBarsIgnoringVisibilityWindowInsetsChanged':

        case 'captionBarWindowInsetsChanged':
        case 'captionBarIgnoringVisibilityWindowInsetsChanged':

        case 'systemBarsWindowInsetsChanged':
        case 'systemBarsIgnoringVisibilityWindowInsetsChanged':

        case 'imeWindowInsetsChanged':
        case 'imeAnimationSourceWindowInsetsChanged':
        case 'imeAnimationTargetWindowInsetsChanged':

        case 'tappableElementWindowInsetsChanged':
        case 'tappableElementIgnoringVisibilityWindowInsetsChanged':

        case 'systemGesturesWindowInsetsChanged':
        case 'mandatorySystemGesturesWindowInsetsChanged':

        case 'displayCutoutWindowInsetsChanged':
        case 'waterfallWindowInsetsChanged':
            return 'insets';

        default:
            return 'system';
    }
}

const entries = computed(() => store.eventHistory.slice().reverse());

</script>

<template>
    <div class="column">
        <Card title="Event history">

            <template #actions>
                <IconButton
                    :icon="mdiNuke"
                    @click="store.clearHistory()" />
            </template>

            <main>
                <div v-for="entry in entries" class="entry col">
                    <div class="sec">
                        <span class="uppercase">{{ categoryFor(entry.event[0]) }}</span>
                        <span class="bullet"></span>
                        <span :title="entry.time.toLocaleString()">
                            {{ formatTimeAgo(entry.time) }}
                        </span>
                    </div>
                    <div class="pri"><b>{{ entry.event[0] }}</b></div>
                    <div class="sec type-mono">
                        {{ JSON.stringify(entry.event[1]) }}
                    </div>
                </div>
            </main>

        </Card>
    </div>
</template>

<style scoped lang="scss">
.card > main {
    padding-left: 0;
    padding-right: 0;
}

.entry {
    padding: sz.$pad-half sz.$pad;

    .uppercase {
        text-transform: uppercase;
    }

    > .pri {
        margin: sz.$pad-min 0;
    }

    .type-mono {
        word-break: break-word;
    }
}
</style>