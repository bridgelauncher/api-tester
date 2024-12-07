export {}

// used to be declare module 'vue' but that broke at some point
// https://github.com/vuejs/language-tools/issues/3372
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties
    {
        Bridge: typeof Bridge;
    }
}
