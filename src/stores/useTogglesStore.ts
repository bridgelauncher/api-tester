import { defineStore } from "pinia";
import { ref, toValue, readonly, computed } from "vue";
import { useBridgeEventStore } from "./useBridgeEventStore";
import type { BridgeButtonVisibility, OverscrollEffects, SystemNightModeOrError, BridgeTheme, SystemBarAppearance } from '@bridgelauncher/api';

export const useTogglesStore = defineStore('toggles', () => 
{
    const bridgeEvents = useBridgeEventStore();

    const bridgeButtonVisibility = ref(Bridge.getBridgeButtonVisibility());
    const drawSystemWallpaperBehindWebView = ref(Bridge.getDrawSystemWallpaperBehindWebViewEnabled());
    const overscrollEffects = ref(Bridge.getOverscrollEffects());
    const systemNightMode = ref(Bridge.getSystemNightMode());
    const bridgeTheme = ref(Bridge.getBridgeTheme());
    const statusBarAppearance = ref(Bridge.getStatusBarAppearance());
    const navigationBarAppearance = ref(Bridge.getNavigationBarAppearance());

    const canLockScreen = ref(Bridge.getCanLockScreen());

    bridgeEvents.addEventListener(ev =>
    {
        if (ev.name === 'bridgeButtonVisibilityChanged')
            bridgeButtonVisibility.value = ev.newValue;
        else if (ev.name === 'drawSystemWallpaperBehindWebViewChanged')
            drawSystemWallpaperBehindWebView.value = ev.newValue;
        else if (ev.name === 'overscrollEffectsChanged')
            overscrollEffects.value = ev.newValue;
        else if (ev.name === 'systemNightModeChanged')
            systemNightMode.value = ev.newValue;
        else if (ev.name === 'bridgeThemeChanged')
            bridgeTheme.value = ev.newValue;
        else if (ev.name === 'statusBarAppearanceChanged')
            statusBarAppearance.value = ev.newValue;
        else if (ev.name === 'navigationBarAppearanceChanged')
            navigationBarAppearance.value = ev.newValue;
        else if (ev.name === 'canLockScreenChanged')
            canLockScreen.value = ev.newValue;
    });

    return {
        bridgeButtonVisibility: computed({
            get: () => toValue(bridgeButtonVisibility),
            set: x => Bridge.requestSetBridgeButtonVisibility(x),
        }),
        drawSystemWallpaperBehindWebView: computed({
            get: () => toValue(drawSystemWallpaperBehindWebView),
            set: x => Bridge.requestSetDrawSystemWallpaperBehindWebViewEnabled(x),
        }),
        overscrollEffects: computed({
            get: () => toValue(overscrollEffects),
            set: x => Bridge.requestSetOverscrollEffects(x),
        }),
        systemNightMode: computed({
            get: () => toValue(systemNightMode),
            set: x =>
            {
                if (x !== 'unknown' && x !== 'error')
                    Bridge.requestSetSystemNightMode(x);
            }
        }),
        bridgeTheme: computed({
            get: () => toValue(bridgeTheme),
            set: x => Bridge.requestSetBridgeTheme(x),
        }),
        statusBarAppearance: computed({
            get: () => toValue(statusBarAppearance),
            set: x => Bridge.requestSetStatusBarAppearance(x),
        }),
        navigationBarAppearance: computed({
            get: () => toValue(navigationBarAppearance),
            set: x => Bridge.requestSetNavigationBarAppearance(x),
        }),

        canLockScreen: readonly(canLockScreen)
    };
});