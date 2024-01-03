<script setup lang="ts">
import { ref } from 'vue';
import { options } from '@/components/fields/fields';
import { useTogglesStore } from '@/stores/useTogglesStore';
import Card from '@/components/Card.vue';
import OptionStripField from '@/components/fields/OptionStripField.vue';
import type { BridgeButtonVisibility, OverscrollEffects, BridgeTheme, SystemBarAppearance, SystemNightMode } from '@bridgelauncher/api';

const toggles = useTogglesStore();

</script>

<template>
    <Card title="Toggles">
        <main>
            <OptionStripField
                label="Bridge button"
                v-model="toggles.bridgeButtonVisibility"
                :options="options<BridgeButtonVisibility>(
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
                label="Draw overscroll effects"
                v-model="toggles.overscrollEffects"
                :options="options<OverscrollEffects>(
                    ['Disabled', 'none'],
                    ['Enabled', 'default'],
                )" />

            <OptionStripField
                label="System night mode"
                v-model="toggles.systemNightMode"
                :options="options<SystemNightMode>(
                    ['Auto', 'auto'],
                    ['Custom', 'custom'],
                    ['Light', 'no'],
                    ['Dark', 'yes'],
                )" />

            <OptionStripField
                label="Bridge theme"
                v-model="toggles.bridgeTheme"
                :options="options<BridgeTheme>(
                    ['System', 'system'],
                    ['Light', 'light'],
                    ['Dark', 'dark'],
                )" />

            <OptionStripField
                label="Status bar"
                v-model="toggles.statusBarAppearance"
                :options="options<SystemBarAppearance>(
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