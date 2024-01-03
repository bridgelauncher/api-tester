import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useAppsStore } from "./useAppsStore";
import { useTogglesStore } from "./useTogglesStore";
import type { BridgeEventListener, BridgeEventListenerArgs } from "@bridgelauncher/api";

export type EventHistoryEntry = {
    time: Date;
    event: BridgeEventListenerArgs;
};

export const useBridgeEventStore = defineStore('bridgeEvent', () =>
{
    const eventHistory = ref<EventHistoryEntry[]>([]);

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

    // ...a: Bridge.EventListenerArgs preserves the type safety when calling listeners
    window.onBridgeEvent = function (...event: BridgeEventListenerArgs)
    {
        eventHistory.value.push({ time: new Date(), event: event });

        for (const listener of listeners.value)
        {
            listener(...event);
        }
    };

    return {
        clearHistory,
        eventHistory,
        addEventListener,
        removeEventListener
    };
});