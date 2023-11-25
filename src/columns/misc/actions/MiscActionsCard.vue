<script setup lang="ts">
import Card from '@/components/Card.vue';
import ActionListItem from './ActionListItem.vue';

function throwError()
{
    throw new Error('Manually triggered error.');
}

</script>

<template>
    <Card title="Actions">
        <main>
            <ActionListItem @click="">
                Open Bridge settings
            </ActionListItem>
            <ActionListItem @click="">
                Open developer console
            </ActionListItem>
            <ActionListItem @click="">
                Expand notification shade
            </ActionListItem>
            <ActionListItem @click="">
                Lock screen
            </ActionListItem>
            <ActionListItem @click="">
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