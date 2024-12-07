import type { WindowInsets, WindowInsetsJson } from "@bridgelauncher/api";
import { defineStore } from "pinia";
import { computed, ref, toValue } from "vue";
import { useBridgeEventStore } from "./useBridgeEventStore";

export function parseInsets(json: WindowInsetsJson): WindowInsets
{
    return JSON.parse(json) as WindowInsets;
}

export const useWindowInsetsStore = defineStore('windowInsets', () => 
{
    const bridgeEvents = useBridgeEventStore();

    const statusBars = ref(parseInsets(Bridge.getStatusBarsWindowInsets()));
    const statusBarsIgnoringVisibility = ref(parseInsets(Bridge.getStatusBarsIgnoringVisibilityWindowInsets()));

    const navigationBars = ref(parseInsets(Bridge.getNavigationBarsWindowInsets()));
    const navigationBarsIgnoringVisibility = ref(parseInsets(Bridge.getNavigationBarsIgnoringVisibilityWindowInsets()));

    const captionBar = ref(parseInsets(Bridge.getCaptionBarWindowInsets()));
    const captionBarIgnoringVisibility = ref(parseInsets(Bridge.getCaptionBarIgnoringVisibilityWindowInsets()));

    const systemBars = ref(parseInsets(Bridge.getSystemBarsWindowInsets()));
    const systemBarsIgnoringVisibility = ref(parseInsets(Bridge.getSystemBarsIgnoringVisibilityWindowInsets()));

    const ime = ref(parseInsets(Bridge.getImeWindowInsets()));
    const imeAnimationSource = ref(parseInsets(Bridge.getImeAnimationSourceWindowInsets()));
    const imeAnimationTarget = ref(parseInsets(Bridge.getImeAnimationTargetWindowInsets()));

    const tappableElement = ref(parseInsets(Bridge.getTappableElementWindowInsets()));
    const tappableElementIgnoringVisibility = ref(parseInsets(Bridge.getTappableElementIgnoringVisibilityWindowInsets()));

    const systemGestures = ref(parseInsets(Bridge.getSystemGesturesWindowInsets()));
    const mandatorySystemGestures = ref(parseInsets(Bridge.getMandatorySystemGesturesWindowInsets()));

    const displayCutout = ref(parseInsets(Bridge.getDisplayCutoutWindowInsets()));
    const waterfall = ref(parseInsets(Bridge.getWaterfallWindowInsets()));

    bridgeEvents.addEventListener(ev =>
    {
        if (ev.name === 'statusBarsWindowInsetsChanged')
            statusBars.value = ev.newValue;
        else if (ev.name === 'statusBarsIgnoringVisibilityWindowInsetsChanged')
            statusBarsIgnoringVisibility.value = ev.newValue;

        else if (ev.name === 'navigationBarsWindowInsetsChanged')
            navigationBars.value = ev.newValue;
        else if (ev.name === 'navigationBarsIgnoringVisibilityWindowInsetsChanged')
            navigationBarsIgnoringVisibility.value = ev.newValue;

        else if (ev.name === 'captionBarWindowInsetsChanged')
            captionBar.value = ev.newValue;
        else if (ev.name === 'captionBarIgnoringVisibilityWindowInsetsChanged')
            captionBarIgnoringVisibility.value = ev.newValue;

        else if (ev.name === 'systemBarsWindowInsetsChanged')
            systemBars.value = ev.newValue;
        else if (ev.name === 'systemBarsIgnoringVisibilityWindowInsetsChanged')
            systemBarsIgnoringVisibility.value = ev.newValue;

        else if (ev.name === 'imeWindowInsetsChanged')
            ime.value = ev.newValue;
        else if (ev.name === 'imeAnimationSourceWindowInsetsChanged')
            imeAnimationSource.value = ev.newValue;
        else if (ev.name === 'imeAnimationTargetWindowInsetsChanged')
            imeAnimationTarget.value = ev.newValue;

        else if (ev.name === 'tappableElementWindowInsetsChanged')
            tappableElement.value = ev.newValue;
        else if (ev.name === 'tappableElementIgnoringVisibilityWindowInsetsChanged')
            tappableElementIgnoringVisibility.value = ev.newValue;

        else if (ev.name === 'systemGesturesWindowInsetsChanged')
            systemGestures.value = ev.newValue;
        else if (ev.name === 'mandatorySystemGesturesWindowInsetsChanged')
            mandatorySystemGestures.value = ev.newValue;

        else if (ev.name === 'displayCutoutWindowInsetsChanged')
            displayCutout.value = ev.newValue;
        else if (ev.name === 'waterfallWindowInsetsChanged')
            waterfall.value = ev.newValue;
    });

    return {
        statusBars,
        statusBarsIgnoringVisibility,

        navigationBars,
        navigationBarsIgnoringVisibility,

        captionBar,
        captionBarIgnoringVisibility,

        systemBars,
        systemBarsIgnoringVisibility,

        ime,
        imeAnimationSource,
        imeAnimationTarget,

        tappableElement,
        tappableElementIgnoringVisibility,

        systemGestures,
        mandatorySystemGestures,

        displayCutout,
        waterfall,
    };
});