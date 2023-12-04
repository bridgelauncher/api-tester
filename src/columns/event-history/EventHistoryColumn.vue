<script setup lang="ts">
import Card from '@/components/Card.vue';
import IconButton from '@/components/buttons/IconButton.vue';
import { useBridgeEventStore } from '@/stores/useBridgeEventStore';
import { mdiNuke } from '@mdi/js';

const store = useBridgeEventStore();

</script>

<template>
    <div class="column">
        <Card title="Event history">

            <template #actions>
                <IconButton
                    :icon="mdiNuke"
                    @click="store.clearHistory()" />
            </template>

            <main>
                
            </main>
            
        </Card>
    </div>
</template>

<style scoped lang="scss">
.card > main {}
</style>