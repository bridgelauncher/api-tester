<script setup lang="ts">
import { ref } from 'vue';
import Card from '@/components/Card.vue';
import OptionStripField from '@/components/fields/OptionStripField.vue';
import { opt } from '@/components/fields/fields';


const bridgeButtonShown = ref(false);
const drawSystemWallpaperBehindWebView = ref(false);

enum SystemThemeOptions
{
    Auto,
    Light,
    Dark,
}

const systemTheme = ref(SystemThemeOptions.Auto);


enum SystemBarAppearanceOptions
{
    Hidden,
    LightIcons,
    DarkIcons,
}

const statusBarAppearance = ref(SystemBarAppearanceOptions.Hidden);
const navigationBarAppearance = ref(SystemBarAppearanceOptions.Hidden);

</script>

<template>
    <Card title="Toggles">
        <main>
            <OptionStripField
                label="Bridge button"
                v-model="bridgeButtonShown"
                :options="[
                    opt('Hide', false),
                    opt('Show', true),
                ]" />

            <OptionStripField
                label="Draw system wallpaper behind WebView"
                v-model="drawSystemWallpaperBehindWebView"
                :options="[
                    opt('Disabled', false),
                    opt('Enabled', true),
                ]" />

            <OptionStripField
                label="System theme"
                v-model="systemTheme"
                :options="[
                    opt('Auto', SystemThemeOptions.Auto),
                    opt('Light', SystemThemeOptions.Light),
                    opt('Dark', SystemThemeOptions.Dark),
                ]" />

            <OptionStripField
                label="Status bar"
                v-model="statusBarAppearance"
                :options="[
                    opt('Hide', SystemBarAppearanceOptions.Hidden),
                    opt('Light FG', SystemBarAppearanceOptions.LightIcons),
                    opt('Dark FG', SystemBarAppearanceOptions.DarkIcons),
                ]" />

            <OptionStripField
                label="Navigation bar"
                v-model="navigationBarAppearance"
                :options="[
                    opt('Hide', SystemBarAppearanceOptions.Hidden),
                    opt('Light FG', SystemBarAppearanceOptions.LightIcons),
                    opt('Dark FG', SystemBarAppearanceOptions.DarkIcons),
                ]" />

        </main>
    </Card>
</template>

<style scoped lang="scss"></style>@/components/fields/option-strip-field@/components/fields/fields