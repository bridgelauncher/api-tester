export function createDefaultBridgeMockConfig()
{
    return {

        // system
        apiLevel: 34,

        // fetch
        projectUrl: '/',
        appsUrl: '/mock/apps.json',
        makeGetDefaultIconUrl: (packageName: string) => `/mock/icons/default/${packageName}.png`,

        // system bars
        statusBarHeight: 24,
        statusBarAppearance: <Bridge.SystemBarAppearance>'hide',
        navigtionBarHeight: 48,
        navigationBarAppearance: <Bridge.SystemBarAppearance>'hide',

        // window insets
        windowInsetsSeparator: ';',
    };
}

export type BridgeMockConfig = ReturnType<typeof createDefaultBridgeMockConfig>;