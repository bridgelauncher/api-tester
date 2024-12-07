import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { BridgeEvent, BridgeEventListener } from "@bridgelauncher/api";
import { useLocalStorage } from "@vueuse/core";
import { simplifyString } from "@/utils/misc-utils";

type EventCategory = 'apps' | 'system' | 'toggles' | 'insets' | 'other';

type EventJSONDisplay = 'normal' | 'indented' | 'none';

export type EventHistoryEntry = {
    time: Date;
    category: EventCategory;
    nameSimplified: string;
    event: BridgeEvent;
};

function getBridgeEventCategory(event: BridgeEvent): EventCategory
{
    switch (event.name)
    {
        case 'appInstalled':
        case 'appChanged':
        case 'appRemoved':
            return 'apps';

        case 'beforePause':
        case 'newIntent':
        case 'afterResume':
        case 'canRequestSystemNightModeChanged':
        case 'canLockScreenChanged':
            return 'system';

        case 'bridgeButtonVisibilityChanged':
        case 'drawSystemWallpaperBehindWebViewChanged':
        case 'overscrollEffectsChanged':
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
            return 'other';
    }
}

export const useBridgeEventStore = defineStore('bridgeEvent', () =>
{
    const maxHistoryLength = 1000;
    const eventHistory = ref<EventHistoryEntry[]>([]);

    const searchPhrase = useLocalStorage('bridgeEventStore.searchPhrase', '');
    const showWindowInsetEvents = useLocalStorage('bridgeEventStore.showWindowInsetEvents', false);
    const jsonDisplay = useLocalStorage<EventJSONDisplay>('bridgeEventStore.eventJSONDisplay', 'indented');

    const eventHistoryFiltered = computed<EventHistoryEntry[]>(() =>
    {
        const searchPhraseSimplified = simplifyString(searchPhrase.value);
        return eventHistory.value
            .filter(e =>
            {
                return (showWindowInsetEvents.value || !e.event.name.endsWith('WindowInsetsChanged'))
                    && (e.nameSimplified.includes(searchPhraseSimplified) || e.category.includes(searchPhraseSimplified));
            })
            .reverse();
    });


    function clearHistory()
    {
        eventHistory.value = [];
    }

    const listeners = ref(new Set<BridgeEventListener>());

    function addEventListener(listener: BridgeEventListener)
    {
        listeners.value.add(listener);
    }

    function removeEventListener(listener: BridgeEventListener)
    {
        listeners.value.delete(listener);
    }

    window.onBridgeEvent = event =>
    {
        eventHistory.value.push({
            time: new Date(),
            nameSimplified: simplifyString(event.name),
            category: getBridgeEventCategory(event),
            event,
        });

        if (eventHistory.value.length > maxHistoryLength)
            eventHistory.value.unshift();

        for (const listener of listeners.value)
        {
            listener(event);
        }
    };

    return {
        eventHistory,
        eventHistoryFiltered,

        searchPhrase,
        showWindowInsetEvents,
        jsonDisplay,

        clearHistory,

        addEventListener,
        removeEventListener
    };
});