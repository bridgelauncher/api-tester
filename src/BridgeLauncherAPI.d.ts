
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
    export type BridgeTheme = 'auto' | 'dark' | 'light';
    export type SystemBarAppearance = 'hidden' | 'light-fg' | 'dark-fg';

    // apps
    function getInstalledApps(): InstalledAppInfo[];
    function requestAppUninstall(packageName: string): void;
    function launchApp(packageName: string): void;

    // wallpaper offsets
    function setWallpaperOffsetSteps(x: number, y: number): void;
    function setWallpaperOffsets(x: number, y: number): void;
    
    // bridge button
    function getBridgeButtonVisibility(): BridgeButtonVisibility;
    function setBridgeButtonVisibility(state: BridgeButtonVisibility): void;

    // draw system wallpaper behind webview
    function getDrawSystemWallpaperBehindWebViewEnabled(): boolean;
    function setDrawSystemWallpaperBehindWebViewEnabled(enable: boolean): void;

    // system theme
    function getIsSystemInDarkTheme(): boolean;
    function setIsSystemInDarkTheme(shouldBeInDarkTheme: boolean): void;

    // Bridge theme
    function getBridgeTheme(): BridgeTheme;
    function setBridgeTheme(theme: BridgeTheme): void;

    // status bar
    function getStatusBarAppearance(): SystemBarAppearance;
    function setStatusBarAppearance(appearance: SystemBarAppearance): void;
    function getStatusBarHeight(): number;

    // navigation bar
    function getNavigationBarAppearance(): SystemBarAppearance;
    function setNavigationBarAppearance(appearance: SystemBarAppearance): void;
    function getNavigationBarHeight(): number;

    // screen locking
    function getCanLockScreen(): boolean;
    function requestLockScreen(quiet: boolean): boolean;
    
    // misc requests
    function requestOpenBridgeSettings(): void;
    function requestOpenDeveloperConsole(): void;
    function requestExpandNotificationShade(): void;
    function requestChangeSystemWallpaper(): void;

    // toast
    function showToast(message: string, long: boolean = false): void;
}

declare var onBridgeEvent: ((...[code, args]: Bridge.StateUpdateEvents) => void) | undefined;
