import { simplifyString } from "@/utils/misc-utils";
import { defineStore } from "pinia";
import { ref } from "vue";

export interface InstalledAppInfo extends Bridge.InstalledAppInfo
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
    const apps = ref<InstalledAppInfo[]>([]);

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
            const respApps = await resp.json() as Bridge.InstalledAppInfo[];
            apps.value = respApps.map<InstalledAppInfo>(a => ({
                ...a,
                labelSimplified: simplifyString(a.label),
            }));
            requestStatus.value = RequestStatus.Idle;
        }
        catch (err)
        {
            console.error(err);
            requestStatus.value = RequestStatus.Error;
            requestErrorMessage.value = `${err}`;
        }
    }

    requestAppsAsync();

    return {
        apps,
        requestAppsAsync,
        requestStatus,
        requestErrorMessage,
    };
});