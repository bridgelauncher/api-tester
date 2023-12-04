import { defineStore } from "pinia";
import { computed } from "vue";

export const useBridgeEventStore = defineStore('bridgeEvent', () =>
{
    function clearHistory()
    {

    }

    return {
        clearHistory,
    };
});