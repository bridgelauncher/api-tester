import { createDefaultBridgeMockConfig as createDefaultBridgeMockConfig, type BridgeMockConfig } from "./BridgeMockConfig";

export default class BridgeMock implements Bridge.JSToAndroidAPI
{
    public config: BridgeMockConfig;

    protected _prefix = '[BridgeMock]';

    protected _lastErrorMessage: string | null = null;
    
    protected _wallpaperOffsetStepsX: number = 1;
    protected _wallpaperOffsetStepsY: number = 1;
    protected _wallpaperOffsetX: number = 0;
    protected _wallpaperOffsetY: number = 0;


    protected _bridgeButtonVisibility: Bridge.BridgeButtonVisibility;
    protected _drawSystemWallpaperBehindWebViewEnabled: boolean;
    protected _systemNightMode: Bridge.SystemNightModeOrError;
    protected _bridgeTheme: Bridge.BridgeTheme;
    protected _statusBarAppearance: Bridge.SystemBarAppearance;
    protected _navigationBarAppearance: Bridge.SystemBarAppearance;
    protected _canLockScreen: boolean;

    constructor(config?: BridgeMockConfig)
    {
        this.config = config ?? createDefaultBridgeMockConfig();

        this._bridgeButtonVisibility = this.config.initialBridgeButtonVisibility;
        this._drawSystemWallpaperBehindWebViewEnabled = this.config.initialDrawSystemWallpaperBehindWebViewEnabled;
        this._systemNightMode = this.config.initialSystemNightMode;
        this._bridgeTheme = this.config.initialBridgeTheme;
        this._statusBarAppearance = this.config.initialStatusBarAppearance;
        this._navigationBarAppearance = this.config.initialNavigationBarAppearance;
        this._canLockScreen = this.config.initialCanLockScreen;
    }

    // system

    getAndroidAPILevel(): number
    {
        return this.config.apiLevel;
    }

    getLastErrorMessage(): string | null
    {
        return this._lastErrorMessage;
    }


    // fetch

    getProjectURL(): string
    {
        return this.config.projectUrl;
    }

    getAppsURL(): string
    {
        return this.config.appsUrl;
    }


    // apps

    requestAppUninstall(packageName: string, showToastIfFailed?: boolean): boolean
    {
        alert(`${this._prefix} requestAppUninstall: ${packageName}`);
        return true;
    }

    requestOpenAppInfo(packageName: string, showToastIfFailed?: boolean): boolean
    {
        alert(`${this._prefix} requestOpenAppInfo: ${packageName}`);
        return true;
    }

    requestLaunchApp(packageName: string, showToastIfFailed?: boolean): boolean
    {
        alert(`${this._prefix} Requested launch ${packageName}`);
        return true;
    }


    // wallpaper

    private _padNum(n: number) 
    {
        return n.toFixed(4).padEnd(6);
    }

    setWallpaperOffsetSteps(x: number, y: number): void
    {
        this._wallpaperOffsetStepsX = x;
        this._wallpaperOffsetStepsY = y;
        if (this.config.wallpaperEventLogging)
            console.log(`${this._prefix} setWallpaperOffsetSteps: x = ${this._padNum(x)} y = ${y} (pages: x = ${Math.round(1 / x) - 1}, y = ${Math.round(1 / y) - 1})`);
    }

    setWallpaperOffsets(x: number, y: number): void
    {
        this._wallpaperOffsetX = x;
        this._wallpaperOffsetY = y;
        if (this.config.wallpaperEventLogging)
            console.log(`${this._prefix} setWallpaperOffsets: x = ${this._padNum(x)} y = ${this._padNum(y)} (pages: x = ${this._padNum(x / this._wallpaperOffsetStepsX)} y = ${this._padNum(y / this._wallpaperOffsetStepsY)})`);
    }

    sendWallpaperTap(x: number, y: number): void
    {
        if (this.config.wallpaperEventLogging)
            console.log(`${this._prefix} sendWallpaperTap: x = ${x}, y = ${y}`);
    }

    requestChangeSystemWallpaper(showToastIfFailed?: boolean): boolean
    {
        alert(`${this._prefix} requestChangeSystemWallpaper`);
        return true;
    }


    // Bridge button

    getBridgeButtonVisibility(): Bridge.BridgeButtonVisibility
    {
        return this._bridgeButtonVisibility;
    }

    requestSetBridgeButtonVisibility(state: Bridge.BridgeButtonVisibility, showToastIfFailed?: boolean): boolean
    {
        this._bridgeButtonVisibility = state;
        return true;
    }


    // draw system wallpaper behind webview

    getDrawSystemWallpaperBehindWebViewEnabled(): boolean
    {
        return this._drawSystemWallpaperBehindWebViewEnabled;
    }

    requestSetDrawSystemWallpaperBehindWebViewEnabled(enable: boolean, showToastIfFailed?: boolean): boolean
    {
        this._drawSystemWallpaperBehindWebViewEnabled = enable;
        return true;
    }


    // system night mode

    getSystemNightMode(): Bridge.SystemNightModeOrError
    {
        return this._systemNightMode;
    }

    resolveIsSystemInDarkTheme(): boolean
    {
        return this._systemNightMode === 'yes'
            || (
                this._systemNightMode !== 'no'
                && matchMedia('(prefers-color-scheme: dark)').matches
            );
    }

    requestSetSystemNightMode(mode: Bridge.SystemNightMode, showToastIfFailed?: boolean): boolean
    {
        this._systemNightMode = mode;
        return true;
    }


    // Bridge theme

    getBridgeTheme(): Bridge.BridgeTheme
    {
        return this._bridgeTheme;
    }

    requestSetBridgeTheme(theme: Bridge.BridgeTheme, showToastIfFailed?: boolean): boolean
    {
        this._bridgeTheme = theme;
        return true;
    }


    // system bars

    getStatusBarAppearance(): Bridge.SystemBarAppearance
    {
        return this._statusBarAppearance;
    }

    requestSetStatusBarAppearance(appearance: Bridge.SystemBarAppearance, showToastIfFailed?: boolean): boolean
    {
        this._statusBarAppearance = appearance;
        return true;
    }

    getNavigationBarAppearance(): Bridge.SystemBarAppearance
    {
        return this._navigationBarAppearance;
    }

    requestSetNavigationBarAppearance(appearance: Bridge.SystemBarAppearance, showToastIfFailed?: boolean): boolean
    {
        this._navigationBarAppearance = appearance;
        return true;
    }


    // screen locking

    getCanLockScreen(): boolean
    {
        return this._canLockScreen;
    }

    requestLockScreen(showToastIfFailed?: boolean): boolean
    {
        alert(`${this._prefix} requestLockScreen`);
        return true;
    }


    // misc actions

    requestOpenBridgeSettings(showToastIfFailed?: boolean): boolean
    {
        alert(`${this._prefix} requestOpenBridgeSettings`);
        return true;
    }

    requestOpenBridgeAppDrawer(showToastIfFailed?: boolean): boolean
    {
        alert(`${this._prefix} requestOpenBridgeAppDrawer`);
        return true;
    }

    requestOpenDeveloperConsole(showToastIfFailed?: boolean): boolean
    {
        alert(`${this._prefix} requestOpenDeveloperConsole`);
        return true;
    }

    requestExpandNotificationShade(showToastIfFailed?: boolean): boolean
    {
        alert(`${this._prefix} requestExpandNotificationShade`);
        return true;
    }


    // toast

    showToast(message: string, long?: boolean): void
    {
        console.log(`${this._prefix} showToast: ${long ? 'long' : 'short'}, message: ${message}`);
    }


    // window insets & cutouts

    getWindowInsetsSeparator(): string
    {
        return this.config.windowInsetsSeparator;
    }

    getStatusBarsWindowInsets(): string
    {
        return this.windowInsetsString(0, this.config.initialStatusBarAppearance === 'hide' ? 0 : this.config.statusBarHeight, 0, 0);
    }

    getStatusBarsIgnoringVisibilityWindowInsets(): string
    {
        return this.windowInsetsString(0, this.config.statusBarHeight, 0, 0);
    }

    getNavigationBarsWindowInsets(): string
    {
        return this.windowInsetsString(0, 0, 0, this.config.initialNavigationBarAppearance === 'hide' ? 0 : this.config.navigationBarHeight);
    }

    getNavigationBarsIgnoringVisibilityWindowInsets(): string
    {
        return this.windowInsetsString(0, 0, 0, this.config.navigationBarHeight);
    }

    getCaptionBarWindowInsets(): string
    {
        throw new Error("Method not implemented.");
    }

    getCaptionBarIgnoringVisibilityWindowInsets(): string
    {
        throw new Error("Method not implemented.");
    }

    getSystemBarsWindowInsets(): string
    {
        return this.windowInsetsString(
            0,
            this.config.initialStatusBarAppearance === 'hide' ? 0 : this.config.statusBarHeight,
            0,
            this.config.initialNavigationBarAppearance === 'hide' ? 0 : this.config.navigationBarHeight
        );
    }

    getSystemBarsIgnoringVisibilityWindowInsets(): string
    {
        return this.windowInsetsString(
            0,
            this.config.statusBarHeight,
            0,
            this.config.navigationBarHeight
        );
    }

    getImeWindowInsets(): string
    {
        throw new Error("Method not implemented.");
    }

    getImeAnimationSourceWindowInsets(): string
    {
        throw new Error("Method not implemented.");
    }

    getImeAnimationTargetWindowInsets(): string
    {
        throw new Error("Method not implemented.");
    }

    getTappableElementWindowInsets(): string
    {
        throw new Error("Method not implemented.");
    }

    getTappableElementIgnoringVisibilityWindowInsets(): string
    {
        throw new Error("Method not implemented.");
    }

    getSystemGesturesWindowInsets(): string
    {
        throw new Error("Method not implemented.");
    }

    getMandatorySystemGesturesWindowInsets(): string
    {
        throw new Error("Method not implemented.");
    }

    getDisplayCutoutWindowInsets(): string
    {
        throw new Error("Method not implemented.");
    }

    getWaterfallWindowInsets(): string
    {
        throw new Error("Method not implemented.");
    }

    getDisplayCutoutPath(): string | null
    {
        throw new Error("Method not implemented.");
    }

    getDisplayShapePath(): string | null
    {
        throw new Error("Method not implemented.");
    }


    // helpers

    protected windowInsetsString(left: number, top: number, right: number, bottom: number)
    {
        return [left, top, right, bottom].join(this.config.windowInsetsSeparator);
    }
}