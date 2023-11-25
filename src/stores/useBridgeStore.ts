import { defineStore } from "pinia";
import { ref } from "vue";

let uid = 0;
function app(label: string, packageName: string): Bridge.InstalledAppInfo
{
    return {
        uid: uid++,
        label,
        packageName,
        labelNormalized: normalizeSearchPhrase(label),
    };
}

export function normalizeSearchPhrase(phrase: string)
{
    return phrase
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');
}

export const useBridgeStore = defineStore('Bridge', () => 
{
    const statusBarHeight = ref(24);
    const navigationBarHeight = ref(48);

    const installedApps = ref<Bridge.InstalledAppInfo[]>([
        app('App name 1', 'com.example.app1'),
        app('Launchma', 'ask.you.launchma'),
    ]);

    function reloadApps()
    {

    }

    function clearStateUpdateHistory()
    {

    }

    return {
        statusBarHeight,
        navigationBarHeight,

        installedApps,
        reloadApps,

        clearStateUpdateHistory,
    };
});