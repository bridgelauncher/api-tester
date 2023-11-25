<script setup lang="ts">

</script>

<template>
    <div class="action-list-item" v-wave>
        <slot></slot>    
    </div>
</template>

<style scoped lang="scss">
.action-list-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: sz.$pad-min sz.$pad;
    min-height: sz.$click-target;
    cursor: pointer;
}
</style>