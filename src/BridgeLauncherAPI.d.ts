
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
        labelNormalized: string;
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
    export type WindowInsets = [left: number, top: number, right: number, bottom: number];

    // system info
    function getAndroidAPILevel(): number;
    function getLastErrorMessage(): string;

    // apps
    function requestAppUninstall(packageName: string, showToastIfFailed: boolean = true): boolean;
    function requestOpenAppInfo(packageName: string, showToastIfFailed: boolean = true): boolean;
    function requestLaunchApp(packageName: string, showToastIfFailed: boolean = true): boolean;

    // wallpaper
    function setWallpaperOffsetSteps(x: number, y: number): void;
    function setWallpaperOffsets(x: number, y: number): void;
    function sendWallpaperTap(x: number, y: number): void;
    function requestChangeSystemWallpaper(showToastIfFailed: boolean = true): boolean;

    // bridge button
    function getBridgeButtonVisibility(): BridgeButtonVisibility;
    function setBridgeButtonVisibility(state: BridgeButtonVisibility, showToastIfFailed: boolean = true): boolean;

    // draw system wallpaper behind webview
    function getDrawSystemWallpaperBehindWebViewEnabled(): boolean;
    function setDrawSystemWallpaperBehindWebViewEnabled(enable: boolean, showToastIfFailed: boolean = true): boolean;

    // system theme
    function getSystemNightMode(): SystemNightMode | 'error' | 'unknown';
    function resolveIsSystemInDarkTheme(): boolean;
    function setSystemNightMode(mode: SystemNightMode, showToastIfFailed: boolean = true): boolean;

    // Bridge theme
    function getBridgeTheme(): BridgeTheme;
    function setBridgeTheme(theme: BridgeTheme, showToastIfFailed: boolean = true): boolean;

    // status bar
    function getStatusBarAppearance(): SystemBarAppearance;
    function setStatusBarAppearance(appearance: SystemBarAppearance, showToastIfFailed: boolean = true): boolean;

    // navigation bar
    function getNavigationBarAppearance(): SystemBarAppearance;
    function setNavigationBarAppearance(appearance: SystemBarAppearance, showToastIfFailed: boolean = true): boolean;

    // screen locking
    function getCanLockScreen(): boolean;
    function requestLockScreen(showToastIfFailed: boolean = true): boolean;

    // misc requests
    function requestOpenBridgeSettings(showToastIfFailed: boolean = true): boolean;
    function requestOpenBridgeAppDrawer(showToastIfFailed: boolean = true): boolean;
    function requestOpenDeveloperConsole(showToastIfFailed: boolean = true): boolean;
    function requestExpandNotificationShade(showToastIfFailed: boolean = true): boolean;

    // toast
    function showToast(message: string, long: boolean = false): void;

    // window insets and cutouts
    function getStatusBarsWindowInsets(): WindowInsets;
    function getStatusBarsIgnoringVisibilityWindowInsets(): WindowInsets;

    function getNavigationBarsWindowInsets(): WindowInsets;
    function getNavigationBarsIgnoringVisibilityWindowInsets(): WindowInsets;

    function getCaptionBarWindowInsets(): WindowInsets;
    function getCaptionBarIgnoringVisibilityWindowInsets(): WindowInsets;

    function getSystemBarsWindowInsets(): WindowInsets;
    function getSystemBarsIgnoringVisibilityWindowInsets(): WindowInsets;

    function getImeWindowInsets(): WindowInsets;
    function getImeAnimationSourceWindowInsets(): WindowInsets;
    function getImeAnimationTargetWindowInsets(): WindowInsets;

    function getTappableElementWindowInsets(): WindowInsets;
    function getTappableElementIgnoringVisibilityWindowInsets(): WindowInsets;

    function getSystemGesturesWindowInsets(): WindowInsets;
    function getMandatorySystemGesturesWindowInsets(): WindowInsets;

    function getDisplayCutoutWindowInsets(): WindowInsets;
    function getWaterfallWindowInsets(): WindowInsets;

    function getDisplayCutoutPath(): string | null;
    function getDisplayShapePath(): string | null;
}

declare var onBridgeEvent: ((...[code, args]: Bridge.StateUpdateEvents) => void) | undefined;
