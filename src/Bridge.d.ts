
type With<TCode extends string, TArgs = undefined> = [
    code: TCode,
    args: TArgs,
];

type WithoutArgs<TCode extends string> = [
    code: TCode,
    args: undefined,
];

export interface BridgeInstalledAppInfo
{
    packageName: string;
    label: string;
}

export type BridgeButtonVisibility = 'shown' | 'hidden';
export type BridgeTheme = 'system' | 'dark' | 'light';
export type SystemBarAppearance = 'hide' | 'light-fg' | 'dark-fg';
export type SystemNightMode = 'no' | 'yes' | 'auto' | 'custom';
export type SystemNightModeOrError = SystemNightMode | 'error' | 'unknown';

/** 
 * {@link WindowInsets} serialized to a JSON string.
 */
export type WindowInsetsJson = string;

export interface WindowInsets
{
    left: number;
    top: number;
    right: number;
    bottom: number;
};

export interface JSToBridgeAPI
{
    // system
    getAndroidAPILevel(): number;
    getLastErrorMessage(): string | null;

    // fetch
    getProjectURL(): string;
    getAppsURL(): string;
    getDefaultAppIconURL(packageName: string): string 

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
    getSystemNightMode(): SystemNightModeOrError;
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
    getStatusBarsWindowInsets(): WindowInsetsJson;
    getStatusBarsIgnoringVisibilityWindowInsets(): WindowInsetsJson;

    getNavigationBarsWindowInsets(): WindowInsetsJson;
    getNavigationBarsIgnoringVisibilityWindowInsets(): WindowInsetsJson;

    getCaptionBarWindowInsets(): WindowInsetsJson;
    getCaptionBarIgnoringVisibilityWindowInsets(): WindowInsetsJson;

    getSystemBarsWindowInsets(): WindowInsetsJson;
    getSystemBarsIgnoringVisibilityWindowInsets(): WindowInsetsJson;

    getImeWindowInsets(): WindowInsetsJson;
    getImeAnimationSourceWindowInsets(): WindowInsetsJson;
    getImeAnimationTargetWindowInsets(): WindowInsetsJson;

    getTappableElementWindowInsets(): WindowInsetsJson;
    getTappableElementIgnoringVisibilityWindowInsets(): WindowInsetsJson;

    getSystemGesturesWindowInsets(): WindowInsetsJson;
    getMandatorySystemGesturesWindowInsets(): WindowInsetsJson;

    getDisplayCutoutWindowInsets(): WindowInsetsJson;
    getWaterfallWindowInsets(): WindowInsetsJson;

    getDisplayCutoutPath(): string | null;
    getDisplayShapePath(): string | null;
}

export type EmptyEventArgs = undefined;
export type AppRemovedEventArgs = { packageName: string; };
export type ValueChangeEventArgs<T> = { newValue: T; };

export interface BridgeEventMap 
{
    appInstalled: BridgeInstalledAppInfo;
    appChanged: BridgeInstalledAppInfo;
    appRemoved: AppRemovedEventArgs;

    beforePause: undefined;
    afterResume: undefined;

    bridgeButtonVisibilityChanged: ValueChangeEventArgs<BridgeButtonVisibility>;
    drawSystemWallpaperBehindWebViewChanged: ValueChangeEventArgs<boolean>;
    systemNightModeChanged: ValueChangeEventArgs<SystemNightModeOrError>;
    bridgeThemeChanged: ValueChangeEventArgs<BridgeTheme>;
    statusBarAppearanceChanged: ValueChangeEventArgs<SystemBarAppearance>;
    navigationBarAppearanceChanged: ValueChangeEventArgs<SystemBarAppearance>;

    canLockScreenChanged: ValueChangeEventArgs<boolean>;

    statusBarsWindowInsetsChanged: ValueChangeEventArgs<WindowInsets>;
    statusBarsIgnoringVisibilityWindowInsetsChanged: ValueChangeEventArgs<WindowInsets>;

    navigationBarsWindowInsetsChanged: ValueChangeEventArgs<WindowInsets>;
    navigationBarsIgnoringVisibilityWindowInsetsChanged: ValueChangeEventArgs<WindowInsets>;

    captionBarWindowInsetsChanged: ValueChangeEventArgs<WindowInsets>;
    captionBarIgnoringVisibilityWindowInsetsChanged: ValueChangeEventArgs<WindowInsets>;

    systemBarsWindowInsetsChanged: ValueChangeEventArgs<WindowInsets>;
    systemBarsIgnoringVisibilityWindowInsetsChanged: ValueChangeEventArgs<WindowInsets>;

    imeWindowInsetsChanged: ValueChangeEventArgs<WindowInsets>;
    imeAnimationSourceWindowInsetsChanged: ValueChangeEventArgs<WindowInsets>;
    imeAnimationTargetWindowInsetsChanged: ValueChangeEventArgs<WindowInsets>;

    tappableElementWindowInsetsChanged: ValueChangeEventArgs<WindowInsets>;
    tappableElementIgnoringVisibilityWindowInsetsChanged: ValueChangeEventArgs<WindowInsets>;

    systemGesturesWindowInsetsChanged: ValueChangeEventArgs<WindowInsets>;
    mandatorySystemGesturesWindowInsetsChanged: ValueChangeEventArgs<WindowInsets>;

    displayCutoutWindowInsetsChanged: ValueChangeEventArgs<WindowInsets>;
    waterfallWindowInsetsChanged: ValueChangeEventArgs<WindowInsets>;
}

export type BridgeEventName = keyof BridgeEventMap;

export type BridgeEventListenerArgs = {
    [K in BridgeEventName]: [name: K, args: BridgeEventMap[K]]
}[BridgeEventName];

export type BridgeEventListener = (...args: BridgeEventListenerArgs) => void;

declare global
{
    var Bridge: JSToBridgeAPI;
    var onBridgeEvent: BridgeEventListener | undefined;
}