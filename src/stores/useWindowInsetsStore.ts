import { defineStore } from "pinia";
import { computed, ref, toValue } from "vue";

export enum WindowInsetSide { Left, Top, Right, Bottom }

export function getInsetSide(insets: Bridge.WindowInsets, side: WindowInsetSide)
{
    return parseFloat(insets.split(Bridge.getWindowInsetsSeparator())[side]);
}

export const useWindowInsetsStore = defineStore('windowInsets', () => 
{
    const systemBarsInsets = Bridge.getSystemBarsWindowInsets();
    const statusBarHeight = ref(getInsetSide(systemBarsInsets, WindowInsetSide.Top));
    const navigationBarHeight = ref(getInsetSide(systemBarsInsets, WindowInsetSide.Bottom));

    return {
        statusBarHeight,
        navigationBarHeight,
    };
});