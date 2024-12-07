import { simplifyString } from "@/utils/misc-utils";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useBridgeEventStore } from "./useBridgeEventStore";
import type { BridgeGetAppsResponse, BridgeInstalledAppInfo } from "@bridgelauncher/api";

export interface InstalledAppInfo extends BridgeInstalledAppInfo
{
    labelSimplified: string;
}

export enum RequestStatus
{
    Idle,
    InProgress,
    Error,
}

export const useAppsStore = defineStore('apps', () =>
{
    const bridgeEvents = useBridgeEventStore();

    const apps = ref(new Map<string, InstalledAppInfo>());

    const requestStatus = ref(RequestStatus.Error);
    const requestErrorMessage = ref('');

    async function requestAppsAsync()
    {
        if (requestStatus.value === RequestStatus.InProgress) return;

        requestStatus.value = RequestStatus.InProgress;
        requestErrorMessage.value = '';

        try
        {
            const resp = await fetch(Bridge.getAppsURL());
            const respApps = await resp.json() as BridgeGetAppsResponse;

            const newApps = new Map<string, InstalledAppInfo>();

            for (const a of respApps.apps) 
            {
                newApps.set(a.packageName, processAppFromAPI(a));
            }

            apps.value = newApps;
            requestStatus.value = RequestStatus.Idle;
        }
        catch (err)
        {
            console.error(err);
            requestStatus.value = RequestStatus.Error;
            requestErrorMessage.value = `${err}`;
        }
    }

    function processAppFromAPI(a: BridgeInstalledAppInfo): InstalledAppInfo
    {
        return {
            ...a,
            labelSimplified: simplifyString(a.label),
        };
    }

    requestAppsAsync();

    bridgeEvents.addEventListener(ev =>
    {
        if (ev.name === 'appInstalled' || ev.name === 'appChanged')
        {
            apps.value.set(ev.app.packageName, processAppFromAPI(ev.app));
        }
        else if (ev.name === 'appRemoved')
        {
            apps.value.delete(ev.packageName);
        }
    });

    return {
        apps,
        requestAppsAsync,
        requestStatus,
        requestErrorMessage,
    };
});