import { createDefaultBridgeMockConfig as createDefaultBridgeMockConfig, type BridgeMockConfig } from "./BridgeMockConfig";

export default class BridgeMock implements Bridge.JSToAndroidAPI
{
    public config: BridgeMockConfig;

    constructor(config?: BridgeMockConfig)
    {
        this.config = config ?? createDefaultBridgeMockConfig();
    }

    // system

    getAndroidAPILevel(): number
    {
        return this.config.apiLevel;
    }

    getLastErrorMessage(): string
    {
        throw new Error("Method not implemented.");
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
        alert(`[BridgeMock] Requested uninstall for ${packageName}`);
        return true;
    }

    requestOpenAppInfo(packageName: string, showToastIfFailed?: boolean): boolean
    {
        alert(`[BridgeMock] Requested open app info for ${packageName}`);
        return true;
    }

    requestLaunchApp(packageName: string, showToastIfFailed?: boolean): boolean
    {
        alert(`[BridgeMock] Requested launch ${packageName}`);
        return true;
    }


    // wallpaper

    private _wallpaperOffsetStepsX: number = 1;
    private _wallpaperOffsetStepsY: number = 1;
    private _wallpaperOffsetX: number = 0;
    private _wallpaperOffsetY: number = 0;

    private _padNum(n: number) 
    {
        return n.toFixed(4).padEnd(6);
    }

    setWallpaperOffsetSteps(x: number, y: number): void
    {
        this._wallpaperOffsetStepsX = x;
        this._wallpaperOffsetStepsY = y;
        console.log(`[BridgeMock] setWallpaperOffsetSteps: x = ${this._padNum(x)} y = ${y} (pages: x = ${Math.round(1 / x) - 1}, y = ${Math.round(1 / y) - 1})`);
    }

    setWallpaperOffsets(x: number, y: number): void
    {
        this._wallpaperOffsetX = x;
        this._wallpaperOffsetY = y;
        console.log(`[BridgeMock] setWallpaperOffsets: x = ${this._padNum(x)} y = ${this._padNum(y)} (pages: x = ${this._padNum(x / this._wallpaperOffsetStepsX)} y = ${this._padNum(y / this._wallpaperOffsetStepsY)})`);
    }

    sendWallpaperTap(x: number, y: number): void
    {
        console.log(`[BridgeMock] sendWallpaperTap: x = ${x}, y = ${y}`);
    }

    requestChangeSystemWallpaper(showToastIfFailed?: boolean): boolean
    {
        alert(`[BridgeMock] Requested change system wallpaper.`);
        return true;
    }


    // bridge button

    getBridgeButtonVisibility(): Bridge.BridgeButtonVisibility
    {
        throw new Error("Method not implemented.");
    }

    requestSetBridgeButtonVisibility(state: Bridge.BridgeButtonVisibility, showToastIfFailed?: boolean): boolean
    {
        throw new Error("Method not implemented.");
    }


    // draw system wallpaper behind webview

    getDrawSystemWallpaperBehindWebViewEnabled(): boolean
    {
        throw new Error("Method not implemented.");
    }

    requestSetDrawSystemWallpaperBehindWebViewEnabled(enable: boolean, showToastIfFailed?: boolean): boolean
    {
        throw new Error("Method not implemented.");
    }


    // system night mode

    getSystemNightMode(): Bridge.SystemNightMode | "error" | "unknown"
    {
        throw new Error("Method not implemented.");
    }

    resolveIsSystemInDarkTheme(): boolean
    {
        throw new Error("Method not implemented.");
    }

    requestSetSystemNightMode(mode: Bridge.SystemNightMode, showToastIfFailed?: boolean): boolean
    {
        throw new Error("Method not implemented.");
    }


    // Bridge theme

    getBridgeTheme(): Bridge.BridgeTheme
    {
        throw new Error("Method not implemented.");
    }

    requestSetBridgeTheme(theme: Bridge.BridgeTheme, showToastIfFailed?: boolean): boolean
    {
        throw new Error("Method not implemented.");
    }


    // system bars

    getStatusBarAppearance(): Bridge.SystemBarAppearance
    {
        throw new Error("Method not implemented.");
    }

    requestSetStatusBarAppearance(appearance: Bridge.SystemBarAppearance, showToastIfFailed?: boolean): boolean
    {
        throw new Error("Method not implemented.");
    }

    getNavigationBarAppearance(): Bridge.SystemBarAppearance
    {
        throw new Error("Method not implemented.");
    }

    requestSetNavigationBarAppearance(appearance: Bridge.SystemBarAppearance, showToastIfFailed?: boolean): boolean
    {
        throw new Error("Method not implemented.");
    }


    // screen locking

    getCanLockScreen(): boolean
    {
        throw new Error("Method not implemented.");
    }

    requestLockScreen(showToastIfFailed?: boolean): boolean
    {
        throw new Error("Method not implemented.");
    }


    // misc actions

    requestOpenBridgeSettings(showToastIfFailed?: boolean): boolean
    {
        throw new Error("Method not implemented.");
    }

    requestOpenBridgeAppDrawer(showToastIfFailed?: boolean): boolean
    {
        throw new Error("Method not implemented.");
    }

    requestOpenDeveloperConsole(showToastIfFailed?: boolean): boolean
    {
        throw new Error("Method not implemented.");
    }

    requestExpandNotificationShade(showToastIfFailed?: boolean): boolean
    {
        throw new Error("Method not implemented.");
    }


    // toast

    showToast(message: string, long?: boolean): void
    {
        throw new Error("Method not implemented.");
    }


    // window insets & cutouts

    getWindowInsetsSeparator(): string
    {
        return this.config.windowInsetsSeparator;
    }

    getStatusBarsWindowInsets(): string
    {
        return this.windowInsetsString(0, this.config.statusBarAppearance === 'hide' ? 0 : this.config.statusBarHeight, 0, 0);
    }

    getStatusBarsIgnoringVisibilityWindowInsets(): string
    {
        return this.windowInsetsString(0, this.config.statusBarHeight, 0, 0);
    }

    getNavigationBarsWindowInsets(): string
    {
        return this.windowInsetsString(0, 0, 0, this.config.navigationBarAppearance === 'hide' ? 0 : this.config.navigtionBarHeight);
    }

    getNavigationBarsIgnoringVisibilityWindowInsets(): string
    {
        return this.windowInsetsString(0, 0, 0, this.config.navigtionBarHeight);
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
            this.config.statusBarAppearance === 'hide' ? 0 : this.config.statusBarHeight,
            0,
            this.config.navigationBarAppearance === 'hide' ? 0 : this.config.navigtionBarHeight
        );
    }

    getSystemBarsIgnoringVisibilityWindowInsets(): string
    {
        return this.windowInsetsString(
            0,
            this.config.statusBarHeight,
            0,
            this.config.navigtionBarHeight
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