import { defineStore } from "pinia";
import { ref, toValue, type Ref, readonly, computed } from "vue";

export const useTogglesStore = defineStore('toggles', () => 
{
    const bridgeButtonVisibility = ref(Bridge.getBridgeButtonVisibility());
    const drawSystemWallpaperBehindWebView = ref(Bridge.getDrawSystemWallpaperBehindWebViewEnabled());
    const systemNightMode = ref(Bridge.getSystemNightMode());
    const bridgeTheme = ref(Bridge.getBridgeTheme());
    const statusBarAppearance = ref(Bridge.getStatusBarAppearance());
    const navigationBarAppearance = ref(Bridge.getNavigationBarAppearance());

    // TODO: listen for Bridge events

    return {
        bridgeButtonVisibility: computed({
            get: () => toValue(bridgeButtonVisibility),
            set: x => Bridge.requestSetBridgeButtonVisibility(x),
        }),
        drawSystemWallpaperBehindWebView: computed({
            get: () => toValue(drawSystemWallpaperBehindWebView),
            set: x => Bridge.requestSetDrawSystemWallpaperBehindWebViewEnabled(x),
        }),
        systemNightMode: computed({
            get: () => toValue(systemNightMode),
            set: x => Bridge.requestSetSystemNightMode(x),
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
    };
});