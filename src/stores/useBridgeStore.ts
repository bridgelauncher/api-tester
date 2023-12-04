import { defineStore } from "pinia";
import { ref } from "vue";

interface InstalledAppInfo extends Bridge.InstalledAppInfo
{
    labelSimplified: string;
}


let uid = 0;
function app(label: string, packageName: string): InstalledAppInfo
{
    return {
        uid: uid++,
        packageName,
        label,
        labelSimplified: simplifyString(label),
    };
}

export function simplifyString(s: string)
{
    return s
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');
}

export enum LoadingStatus
{
    Idle,
    InProgress,
    Error,
}

export enum WindowInsetSide { Left, Top, Right, Bottom }

export function getInsetSide(insets: Bridge.WindowInsets, side: WindowInsetSide)
{
    return parseFloat(insets.split(Bridge.getWindowInsetsSeparator())[side]);
}

export const useBridgeStore = defineStore('Bridge', () => 
{
    const systemBarsInsets = Bridge.getSystemBarsWindowInsets()
    console.log('@useBridgeStore.getSystemBarsWindowInsets:', systemBarsInsets);
    const statusBarHeight = ref(getInsetSide(systemBarsInsets, WindowInsetSide.Top));
    const navigationBarHeight = ref(getInsetSide(systemBarsInsets, WindowInsetSide.Bottom));

    const installedApps = ref<InstalledAppInfo[]>([]);

    const loadAppsStatus = ref(LoadingStatus.Error);
    const loadAppsErrorMessage = ref('');

    async function loadApps()
    {
        if (loadAppsStatus.value === LoadingStatus.InProgress) return;

        loadAppsStatus.value = LoadingStatus.InProgress;
        loadAppsErrorMessage.value = '';

        try
        {
            const resp = await fetch(Bridge.getAppsURL());
            const apps = await resp.json() as Bridge.InstalledAppInfo[];
            installedApps.value = apps.map<InstalledAppInfo>(a => ({
                ...a,
                labelSimplified: simplifyString(a.label),
            }));
            loadAppsStatus.value = LoadingStatus.Idle;
        }
        catch (err)
        {
            console.error(err);
            loadAppsStatus.value = LoadingStatus.Error;
            loadAppsErrorMessage.value = `${err}`;
        }
    }

    loadApps();

    function clearStateUpdateHistory()
    {

    }

    return {
        statusBarHeight,
        navigationBarHeight,

        installedApps,
        loadApps,
        loadAppsStatus,
        loadAppsErrorMessage,

        clearStateUpdateHistory,
    };
});