<script setup lang="ts">
import Card from '@/components/Card.vue';
import { useBridgeStore } from '@/stores/useBridgeStore';
import { mdiNuke } from '@mdi/js';

const bridgeStore = useBridgeStore();

</script>

<template>
    <div class="column">
        <Card title="State updates"
            :actions="[{ icon: mdiNuke, onClick: () => bridgeStore.clearStateUpdateHistory() }]">
            <main>

            </main>
        </Card>
    </div>
</template>

<style scoped lang="scss">
.card > main {}
</style>