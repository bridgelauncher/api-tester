<script setup lang="ts">
import { ref } from 'vue';
import Card from '@/components/Card.vue';
import InputField from '@/components/fields/InputField.vue';
import TextButton from '@/components/buttons/TextButton.vue';

const toastText = ref('Hello there!');

</script>

<template>
    <Card title="Show toast">
        <main>
            <InputField v-model="toastText" placeholder="Enter toast text..." />
            <div class="row">
                <TextButton>
                    Show short
                </TextButton>
                <TextButton>
                    Show long
                </TextButton>
            </div>
        </main>
    </Card>
</template>

<style scoped lang="scss">
.row {
    justify-content: center;
    flex-wrap: wrap;
    gap: sz.$pad-half;
    margin-top: sz.$pad;
}
</style>