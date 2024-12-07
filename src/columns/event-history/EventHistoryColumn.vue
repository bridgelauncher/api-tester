<script setup lang="ts">
import { useBridgeEventStore } from '@/stores/useBridgeEventStore';
import { mdiNuke } from '@mdi/js';
import { formatTimeAgo } from '@vueuse/core';
import Card from '@/components/Card.vue';
import IconButton from '@/components/buttons/IconButton.vue';
import Searchbar from '@/components/Searchbar.vue';
import CheckboxField from '@/components/fields/CheckboxField.vue';
import OptionStripField from '@/components/fields/OptionStripField.vue';
import { p2 } from '@/utils/format-utils';

const store = useBridgeEventStore();

function getEntryTimestamp(time: Date)
{
    return `${p2(time.getHours())}:${p2(time.getMinutes())}:${p2(time.getSeconds())}.${time.getMilliseconds().toString().padEnd(3, '0')}`
}

</script>

<template>
    <div class="column">
        <Card title="Event history">

            <template #actions>
                <IconButton
                    :icon="mdiNuke"
                    @click="store.clearHistory()" />
            </template>

            <Searchbar v-model="store.searchPhrase" />

            <div class="separator"></div>

            <div class="checkbox-container">
                <OptionStripField
                    label=""
                    :options="[
                        ['No JSON', 'none'],
                        ['Normal', 'normal'],
                        ['Indented', 'indented'],
                    ]"
                    v-model="store.jsonDisplay" />
                <CheckboxField label="WindowInsets" v-model="store.showWindowInsetEvents" />
            </div>

            <div class="separator"></div>

            <main>
                <div v-for="entry in store.eventHistoryFiltered" class="entry col">
                    <div class="sec">
                        <span class="uppercase">{{ entry.category }}</span>
                        <span class="bullet"></span>
                        <span :title="entry.time.toLocaleString()">
                            {{ getEntryTimestamp(entry.time) }}
                            <span class="type-sec">({{ formatTimeAgo(entry.time) }})</span>
                        </span>
                    </div>
                    <div class="pri"><b>{{ entry.event.name }}</b></div>
                    <div v-if="store.jsonDisplay !== 'none'"
                        class="sec type-mono keep-whitespace"
                        v-text="JSON.stringify(entry.event, undefined, store.jsonDisplay === 'indented' ? 2 : 0)"></div>
                </div>
            </main>

        </Card>
    </div>
</template>

<style scoped lang="scss">
.card > main {
    padding-left: 0;
    padding-right: 0;
}

.checkbox-container {
    display: flex;
    flex-direction: row;
    padding: sz.$pad-min;
    gap: sz.$pad-min;

    > .option-strip {
        flex: 1;

        @media screen and (max-width: 420px) {
            font-family: t.$ff-main;
            font-size: sz.$font-sec;
            color: c.$text-sec;
        }
    }

    > .checkbox.field {
        margin: 0;
        width: auto;
    }
}

.keep-whitespace {
    white-space: pre-wrap;
    word-break: break-word;
}

.entry {
    padding: sz.$pad-half sz.$pad;

    .uppercase {
        text-transform: uppercase;
    }

    > .pri {
        margin: sz.$pad-min 0;
    }

    .type-mono {
        word-break: break-word;
    }
}
</style>