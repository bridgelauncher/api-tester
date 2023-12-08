import type { WindowInsets, WindowInsetsJson } from "@/Bridge";
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

    bridgeEvents.addEventListener((name, args) =>
    {
        if (name === 'statusBarsWindowInsetsChanged')
            statusBars.value = args.newValue;
        else if (name === 'statusBarsIgnoringVisibilityWindowInsetsChanged')
            statusBarsIgnoringVisibility.value = args.newValue;

        else if (name === 'navigationBarsWindowInsetsChanged')
            navigationBars.value = args.newValue;
        else if (name === 'navigationBarsIgnoringVisibilityWindowInsetsChanged')
            navigationBarsIgnoringVisibility.value = args.newValue;

        else if (name === 'captionBarWindowInsetsChanged')
            captionBar.value = args.newValue;
        else if (name === 'captionBarIgnoringVisibilityWindowInsetsChanged')
            captionBarIgnoringVisibility.value = args.newValue;

        else if (name === 'systemBarsWindowInsetsChanged')
            systemBars.value = args.newValue;
        else if (name === 'systemBarsIgnoringVisibilityWindowInsetsChanged')
            systemBarsIgnoringVisibility.value = args.newValue;

        else if (name === 'imeWindowInsetsChanged')
            ime.value = args.newValue;
        else if (name === 'imeAnimationSourceWindowInsetsChanged')
            imeAnimationSource.value = args.newValue;
        else if (name === 'imeAnimationTargetWindowInsetsChanged')
            imeAnimationTarget.value = args.newValue;

        else if (name === 'tappableElementWindowInsetsChanged')
            tappableElement.value = args.newValue;
        else if (name === 'tappableElementIgnoringVisibilityWindowInsetsChanged')
            tappableElementIgnoringVisibility.value = args.newValue;

        else if (name === 'systemGesturesWindowInsetsChanged')
            systemGestures.value = args.newValue;
        else if (name === 'mandatorySystemGesturesWindowInsetsChanged')
            mandatorySystemGestures.value = args.newValue;

        else if (name === 'displayCutoutWindowInsetsChanged')
            displayCutout.value = args.newValue;
        else if (name === 'waterfallWindowInsetsChanged')
            waterfall.value = args.newValue;
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