<script setup lang="ts">
import { ref } from 'vue';
import { options } from '@/components/fields/fields';
import { useTogglesStore } from '@/stores/useTogglesStore';
import Card from '@/components/Card.vue';
import OptionStripField from '@/components/fields/OptionStripField.vue';

const toggles = useTogglesStore();

</script>

<template>
    <Card title="Toggles">
        <main>
            <OptionStripField
                label="Bridge button"
                v-model="toggles.bridgeButtonVisibility"
                :options="options<Bridge.BridgeButtonVisibility>(
                    ['Hidden', 'hidden'],
                    ['Shown', 'shown'],
                )" />

            <OptionStripField
                label="Draw system wallpaper behind WebView"
                v-model="toggles.drawSystemWallpaperBehindWebView"
                :options="options<boolean>(
                    ['Disabled', false],
                    ['Enabled', true],
                )" />

            <OptionStripField
                label="System night mode"
                v-model="toggles.systemNightMode"
                :options="options<Bridge.SystemNightMode>(
                    ['Auto', 'auto'],
                    ['Custom', 'custom'],
                    ['Light', 'no'],
                    ['Dark', 'yes'],
                )" />

            <OptionStripField
                label="Bridge theme"
                v-model="toggles.bridgeTheme"
                :options="options<Bridge.BridgeTheme>(
                    ['System', 'system'],
                    ['Light', 'light'],
                    ['Dark', 'dark'],
                )" />

            <OptionStripField
                label="Status bar"
                v-model="toggles.statusBarAppearance"
                :options="options<Bridge.SystemBarAppearance>(
                    ['Hide', 'hide'],
                    ['Light FG', 'light-fg'],
                    ['Dark FG', 'dark-fg'],
                )" />

            <OptionStripField
                label="Navigation bar"
                v-model="toggles.navigationBarAppearance"
                :options="options(
                    ['Hide', 'hide'],
                    ['Light FG', 'light-fg'],
                    ['Dark FG', 'dark-fg'],
                )" />

        </main>
    </Card>
</template>

<style scoped lang="scss"></style>