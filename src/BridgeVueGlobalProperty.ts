import 'vue';

declare module 'vue' {
    interface ComponentCustomProperties
    {
        Bridge: typeof Bridge;
    }
}