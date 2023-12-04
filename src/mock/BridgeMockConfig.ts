export function createDefaultBridgeMockConfig()
{
    return {
        // system
        apiLevel: 34,

        // fetch
        projectUrl: '/',
        appsUrl: '/mock/apps.json',
        makeGetDefaultIconUrl: (packageName: string) => `/mock/icons/default/${packageName}.png`,

        // wallpaper
        wallpaperEventLogging: true,

        // Bridge button
        initialBridgeButtonVisibility: <Bridge.BridgeButtonVisibility>'hidden',

        // draw system wallpaper behind web view
        initialDrawSystemWallpaperBehindWebViewEnabled: true,

        // system night mode
        initialSystemNightMode: <Bridge.SystemNightMode>'auto',
        
        // Bridge theme
        initialBridgeTheme: <Bridge.BridgeTheme>'system',

        // screen locking 
        initialCanLockScreen: true,

        // misc actions

        // toast

        // window insets & cutouts
        windowInsetsSeparator: ';',
        statusBarHeight: 24,
        initialStatusBarAppearance: <Bridge.SystemBarAppearance>'hide',
        navigationBarHeight: 48,
        initialNavigationBarAppearance: <Bridge.SystemBarAppearance>'hide',
    };
}

export type BridgeMockConfig = ReturnType<typeof createDefaultBridgeMockConfig>;