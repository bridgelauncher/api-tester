import { defineStore } from "pinia";
import { ref, toValue, type Ref, readonly, computed } from "vue";
import { useBridgeEventStore } from "./useBridgeEventStore";

export const useTogglesStore = defineStore('toggles', () => 
{
    const bridgeEvents = useBridgeEventStore();

    const bridgeButtonVisibility = ref(Bridge.getBridgeButtonVisibility());
    const drawSystemWallpaperBehindWebView = ref(Bridge.getDrawSystemWallpaperBehindWebViewEnabled());
    const systemNightMode = ref(Bridge.getSystemNightMode());
    const bridgeTheme = ref(Bridge.getBridgeTheme());
    const statusBarAppearance = ref(Bridge.getStatusBarAppearance());
    const navigationBarAppearance = ref(Bridge.getNavigationBarAppearance());

    const canLockScreen = ref(Bridge.getCanLockScreen());

    bridgeEvents.addEventListener((name, args) =>
    {
        if (name === 'bridgeButtonVisibilityChanged')
            bridgeButtonVisibility.value = args.newValue;
        else if (name === 'drawSystemWallpaperBehindWebViewChanged')
            drawSystemWallpaperBehindWebView.value = args.newValue;
        else if (name === 'systemNightModeChanged')
            systemNightMode.value = args.newValue;
        else if (name === 'bridgeThemeChanged')
            bridgeTheme.value = args.newValue;
        else if (name === 'statusBarAppearanceChanged')
            statusBarAppearance.value = args.newValue;
        else if (name === 'navigationBarAppearanceChanged')
            navigationBarAppearance.value = args.newValue;
        else if (name === 'canLockScreenChanged')
            canLockScreen.value = args.newValue;
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