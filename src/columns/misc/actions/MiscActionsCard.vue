<script setup lang="ts">
import Card from '@/components/Card.vue';
import ActionListItem from './ActionListItem.vue';
import { useTogglesStore } from '@/stores/useTogglesStore';

const toggles = useTogglesStore();

function throwError()
{
    throw new Error('Manually triggered error.');
}

</script>

<template>
    <Card title="Actions">
        <main>
            <ActionListItem @click="Bridge.requestOpenBridgeSettings()">
                Open Bridge settings
            </ActionListItem>
            <ActionListItem @click="Bridge.requestOpenDeveloperConsole()">
                Open developer console
            </ActionListItem>
            <ActionListItem @click="Bridge.requestExpandNotificationShade()">
                Expand notification shade
            </ActionListItem>
            <ActionListItem @click="Bridge.requestLockScreen()"
                :disabled="!toggles.canLockScreen">
                Lock screen
            </ActionListItem>
            <ActionListItem @click="Bridge.requestChangeSystemWallpaper()">
                Request change system wallpaper
            </ActionListItem>
        </main>
        <div class="separator"></div>
        <main>
            <ActionListItem @click="console.log('Log message', new Date())">
                console.log()
            </ActionListItem>
            <ActionListItem @click="console.info('Info message', new Date())">
                console.info()
            </ActionListItem>
            <ActionListItem @click="console.warn('Warning message', new Date())">
                console.warn()
            </ActionListItem>
            <ActionListItem @click="console.error('Error message', new Date())">
                console.error()
            </ActionListItem>
            <ActionListItem @click="throwError()">
                throw new Error()
            </ActionListItem>
        </main>
    </Card>
</template>

<style scoped lang="scss">
.card > main {
    padding-left: 0;
    padding-right: 0;
}
</style>