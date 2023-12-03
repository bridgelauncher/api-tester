
type With<TCode extends string, TArgs = undefined> = [
    code: TCode,
    args: TArgs,
];

type WithoutArgs<TCode extends string> = [
    code: TCode,
    args: undefined,
];

declare namespace Bridge
{
    export interface InstalledAppInfo
    {
        uid: number;
        packageName: string;
        label: string;
    }

    export interface AppEventArgs
    {
        packageName: string;
    }

    export type StateUpdateEvents =
        [
            code: 'app.installed'
            | 'app.changed'
            | 'app.removed',
            args: AppEventArgs,
        ]
        | [
            code: 'bridge.beforePause'
            | 'bridge.afterResume',
            args: undefined,
        ] | [
            code: 'change.isSystemInDarkTheme'
            | 'change.drawSystemWallpaperBehindWebView'
            | 'change.bridgeButtonVisibility'
            | 'change.systemBars'
            | 'change.bridgeTheme'
            | 'change.hasLockScreenPermission',
            args: undefined,
        ];

    export type BridgeEventCode = StateUpdateEvents['code'];

    export type BridgeButtonVisibility = 'shown' | 'hidden';
    export type BridgeTheme = 'system' | 'dark' | 'light';
    export type SystemBarAppearance = 'hide' | 'light-fg' | 'dark-fg';
    export type SystemNightMode = 'no' | 'yes' | 'auto' | 'custom';
    /** 
     * A string containing 4 decimals in the following format: `left;top;right;bottom`  
     * @example const [l, t, r, b] = Bridge.getWhateverWindowInsets().split(';')
     */
    export type WindowInsets = string;

    export interface JSToAndroidAPI
    {
        // system
        getAndroidAPILevel(): number;
        getLastErrorMessage(): string;

        // fetch
        getProjectURL(): string;
        getAppsURL(): string;

        // apps
        requestAppUninstall(packageName: string, showToastIfFailed: boolean = true): boolean;
        requestOpenAppInfo(packageName: string, showToastIfFailed: boolean = true): boolean;
        requestLaunchApp(packageName: string, showToastIfFailed: boolean = true): boolean;

        // wallpaper
        setWallpaperOffsetSteps(x: number, y: number): void;
        setWallpaperOffsets(x: number, y: number): void;
        sendWallpaperTap(x: number, y: number): void;
        requestChangeSystemWallpaper(showToastIfFailed: boolean = true): boolean;

        // bridge button
        getBridgeButtonVisibility(): BridgeButtonVisibility;
        requestSetBridgeButtonVisibility(state: BridgeButtonVisibility, showToastIfFailed: boolean = true): boolean;

        // draw system wallpaper behind webview
        getDrawSystemWallpaperBehindWebViewEnabled(): boolean;
        requestSetDrawSystemWallpaperBehindWebViewEnabled(enable: boolean, showToastIfFailed: boolean = true): boolean;

        // system theme
        getSystemNightMode(): SystemNightMode | 'error' | 'unknown';
        resolveIsSystemInDarkTheme(): boolean;
        requestSetSystemNightMode(mode: SystemNightMode, showToastIfFailed: boolean = true): boolean;

        // Bridge theme
        getBridgeTheme(): BridgeTheme;
        requestSetBridgeTheme(theme: BridgeTheme, showToastIfFailed: boolean = true): boolean;

        // status bar
        getStatusBarAppearance(): SystemBarAppearance;
        requestSetStatusBarAppearance(appearance: SystemBarAppearance, showToastIfFailed: boolean = true): boolean;

        // navigation bar
        getNavigationBarAppearance(): SystemBarAppearance;
        requestSetNavigationBarAppearance(appearance: SystemBarAppearance, showToastIfFailed: boolean = true): boolean;

        // screen locking
        getCanLockScreen(): boolean;
        requestLockScreen(showToastIfFailed: boolean = true): boolean;

        // misc requests
        requestOpenBridgeSettings(showToastIfFailed: boolean = true): boolean;
        requestOpenBridgeAppDrawer(showToastIfFailed: boolean = true): boolean;
        requestOpenDeveloperConsole(showToastIfFailed: boolean = true): boolean;
        requestExpandNotificationShade(showToastIfFailed: boolean = true): boolean;

        // toast
        showToast(message: string, long: boolean = false): void;

        // window insets and cutouts
        getWindowInsetsSeparator(): string;

        getStatusBarsWindowInsets(): WindowInsets;
        getStatusBarsIgnoringVisibilityWindowInsets(): WindowInsets;

        getNavigationBarsWindowInsets(): WindowInsets;
        getNavigationBarsIgnoringVisibilityWindowInsets(): WindowInsets;

        getCaptionBarWindowInsets(): WindowInsets;
        getCaptionBarIgnoringVisibilityWindowInsets(): WindowInsets;

        getSystemBarsWindowInsets(): WindowInsets;
        getSystemBarsIgnoringVisibilityWindowInsets(): WindowInsets;

        getImeWindowInsets(): WindowInsets;
        getImeAnimationSourceWindowInsets(): WindowInsets;
        getImeAnimationTargetWindowInsets(): WindowInsets;

        getTappableElementWindowInsets(): WindowInsets;
        getTappableElementIgnoringVisibilityWindowInsets(): WindowInsets;

        getSystemGesturesWindowInsets(): WindowInsets;
        getMandatorySystemGesturesWindowInsets(): WindowInsets;

        getDisplayCutoutWindowInsets(): WindowInsets;
        getWaterfallWindowInsets(): WindowInsets;

        getDisplayCutoutPath(): string | null;
        getDisplayShapePath(): string | null;
    }

}

declare var Bridge: Bridge.JSToAndroidAPI;
declare var onBridgeEvent: ((...[code, args]: Bridge.StateUpdateEvents) => void) | undefined;
