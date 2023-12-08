import type { BridgeButtonVisibility, BridgeEventListenerArgs, BridgeTheme, JSToBridgeAPI, SystemBarAppearance, SystemNightMode, SystemNightModeOrError, WindowInsets, WindowInsetsJson } from "@/Bridge";
import { createDefaultBridgeMockConfig as createDefaultBridgeMockConfig, type BridgeMockConfig } from "./BridgeMockConfig";

export function windowInsets(left: number, top: number, right: number, bottom: number): WindowInsets
{
    return { left, top, right, bottom };
}

export default class BridgeMock implements JSToBridgeAPI
{
    public config: BridgeMockConfig;

    protected _prefix = '[BridgeMock]';

    protected _lastErrorMessage: string | null = null;

    protected _wallpaperOffsetStepsX: number = 1;
    protected _wallpaperOffsetStepsY: number = 1;
    protected _wallpaperOffsetX: number = 0;
    protected _wallpaperOffsetY: number = 0;


    protected _bridgeButtonVisibility: BridgeButtonVisibility;
    protected _drawSystemWallpaperBehindWebViewEnabled: boolean;
    protected _systemNightMode: SystemNightModeOrError;
    protected _bridgeTheme: BridgeTheme;
    protected _statusBarAppearance: SystemBarAppearance;
    protected _navigationBarAppearance: SystemBarAppearance;
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

    getDefaultAppIconURL(packageName: string): string 
    {
        return this.config.makeGetDefaultIconUrl(packageName);
    }


    // apps

    requestAppUninstall(packageName: string, showToastIfFailed?: boolean): boolean
    {
        alert(`${this._prefix} requestAppUninstall: ${packageName}`);
        this.raiseBridgeEvent('appRemoved', { packageName });
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
        if (this.config.logWallpaperEvents)
            console.log(`${this._prefix} setWallpaperOffsetSteps: x = ${this._padNum(x)} y = ${y} (pages: x = ${Math.round(1 / x) - 1}, y = ${Math.round(1 / y) - 1})`);
    }

    setWallpaperOffsets(x: number, y: number): void
    {
        this._wallpaperOffsetX = x;
        this._wallpaperOffsetY = y;
        if (this.config.logWallpaperScrolling)
            console.log(`${this._prefix} setWallpaperOffsets: x = ${this._padNum(x)} y = ${this._padNum(y)} (pages: x = ${this._padNum(x / this._wallpaperOffsetStepsX)} y = ${this._padNum(y / this._wallpaperOffsetStepsY)})`);
    }

    sendWallpaperTap(x: number, y: number): void
    {
        if (this.config.logWallpaperEvents)
            console.log(`${this._prefix} sendWallpaperTap: x = ${x}, y = ${y}`);
    }

    requestChangeSystemWallpaper(showToastIfFailed?: boolean): boolean
    {
        alert(`${this._prefix} requestChangeSystemWallpaper`);
        return true;
    }


    // Bridge button

    getBridgeButtonVisibility(): BridgeButtonVisibility
    {
        return this._bridgeButtonVisibility;
    }

    requestSetBridgeButtonVisibility(state: BridgeButtonVisibility, showToastIfFailed?: boolean): boolean
    {
        this._bridgeButtonVisibility = state;
        this.raiseBridgeEvent('bridgeButtonVisibilityChanged', { newValue: state });
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
        this.raiseBridgeEvent('drawSystemWallpaperBehindWebViewChanged', { newValue: enable });
        return true;
    }


    // system night mode

    getSystemNightMode(): SystemNightModeOrError
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

    requestSetSystemNightMode(mode: SystemNightMode, showToastIfFailed?: boolean): boolean
    {
        this._systemNightMode = mode;
        this.raiseBridgeEvent('systemNightModeChanged', { newValue: mode });
        return true;
    }


    // Bridge theme

    getBridgeTheme(): BridgeTheme
    {
        return this._bridgeTheme;
    }

    requestSetBridgeTheme(theme: BridgeTheme, showToastIfFailed?: boolean): boolean
    {
        this._bridgeTheme = theme;
        this.raiseBridgeEvent('bridgeThemeChanged', { newValue: theme });
        return true;
    }


    // system bars

    getStatusBarAppearance(): SystemBarAppearance
    {
        return this._statusBarAppearance;
    }

    requestSetStatusBarAppearance(appearance: SystemBarAppearance, showToastIfFailed?: boolean): boolean
    {
        this._statusBarAppearance = appearance;
        this.raiseBridgeEvent('statusBarAppearanceChanged', { newValue: appearance });
        this.raiseBridgeEvent('statusBarsWindowInsetsChanged', { newValue: this._getStatusBarsWindowInsets() });
        this.raiseBridgeEvent('systemBarsWindowInsetsChanged', { newValue: this._getSystemBarsWindowInsets() });
        return true;
    }

    getNavigationBarAppearance(): SystemBarAppearance
    {
        return this._navigationBarAppearance;
    }

    requestSetNavigationBarAppearance(appearance: SystemBarAppearance, showToastIfFailed?: boolean): boolean
    {
        this._navigationBarAppearance = appearance;
        this.raiseBridgeEvent('navigationBarAppearanceChanged', { newValue: appearance });
        this.raiseBridgeEvent('navigationBarsWindowInsetsChanged', { newValue: this._getNavigationBarsWindowInsets() });
        this.raiseBridgeEvent('systemBarsWindowInsetsChanged', { newValue: this.getSystemBarsWindowInsets() });
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

    protected _getStatusBarsWindowInsets(): WindowInsets
    {
        return windowInsets(0, this._statusBarAppearance === 'hide' ? 0 : this.config.statusBarHeight, 0, 0);
    }

    getStatusBarsWindowInsets(): string
    {
        return this.windowInsetsString(this._getStatusBarsWindowInsets());
    }

    getStatusBarsIgnoringVisibilityWindowInsets(): string
    {
        return this.windowInsetsString(0, this.config.statusBarHeight, 0, 0);
    }

    protected _getNavigationBarsWindowInsets(): WindowInsets
    {
        return windowInsets(0, 0, 0, this._navigationBarAppearance === 'hide' ? 0 : this.config.navigationBarHeight);
    }

    getNavigationBarsWindowInsets(): string
    {
        return this.windowInsetsString(this._getNavigationBarsWindowInsets());
    }

    getNavigationBarsIgnoringVisibilityWindowInsets(): string
    {
        return this.windowInsetsString(0, 0, 0, this.config.navigationBarHeight);
    }

    getCaptionBarWindowInsets(): string
    {
        return this.windowInsetsString(this.config.captionBarWindowInsets);
    }

    getCaptionBarIgnoringVisibilityWindowInsets(): string
    {
        return this.windowInsetsString(this.config.captionBarIgnoringVisibilityWindowInsets);
    }

    protected _getSystemBarsWindowInsets(): WindowInsets
    {
        return windowInsets(
            0,
            this._statusBarAppearance === 'hide' ? 0 : this.config.statusBarHeight,
            0,
            this._navigationBarAppearance === 'hide' ? 0 : this.config.navigationBarHeight,
        );
    }

    getSystemBarsWindowInsets(): string
    {
        return this.windowInsetsString(this._getSystemBarsWindowInsets());
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

    getImeWindowInsets(): WindowInsetsJson
    {
        return this.windowInsetsString(this.config.imeWindowInsets);
    }

    getImeAnimationSourceWindowInsets(): WindowInsetsJson
    {
        return this.windowInsetsString(this.config.imeAnimationSourceWindowInsets);
    }

    getImeAnimationTargetWindowInsets(): WindowInsetsJson
    {
        return this.windowInsetsString(this.config.imeAnimationTargetWindowInsets);
    }

    getTappableElementWindowInsets(): WindowInsetsJson
    {
        return this.windowInsetsString(this.config.tappableElementWindowInsets);
    }

    getTappableElementIgnoringVisibilityWindowInsets(): WindowInsetsJson
    {
        return this.windowInsetsString(this.config.tappableElementIgnoringVisibilityWindowInsets);
    }

    getSystemGesturesWindowInsets(): WindowInsetsJson
    {
        return this.windowInsetsString(this.config.systemGesturesWindowInsets);
    }

    getMandatorySystemGesturesWindowInsets(): WindowInsetsJson
    {
        return this.windowInsetsString(this.config.mandatorySystemGesturesWindowInsets);
    }

    getDisplayCutoutWindowInsets(): WindowInsetsJson
    {
        return this.windowInsetsString(this.config.displayCutoutWindowInsets);
    }

    getWaterfallWindowInsets(): WindowInsetsJson
    {
        return this.windowInsetsString(this.config.waterfallWindowInsets);
    }


    getDisplayCutoutPath(): string | null
    {
        return this.config.displayCutoutPath;
    }

    getDisplayShapePath(): string | null
    {
        return this.config.displayShapePath;
    }


    // helpers

    protected windowInsetsString(insets: WindowInsets): WindowInsetsJson;
    protected windowInsetsString(left: number, top: number, right: number, bottom: number): WindowInsetsJson;
    protected windowInsetsString(leftOrInsets: number | WindowInsets, top?: number, right?: number, bottom?: number): WindowInsetsJson
    {
        if (typeof leftOrInsets === 'object')
            return JSON.stringify(leftOrInsets);
        else
            return JSON.stringify(<WindowInsets>{ left: leftOrInsets, top, right, bottom });
    }

    protected raiseBridgeEvent(...event: BridgeEventListenerArgs)
    {
        if (this.config.logRaisedBridgeEvents)
        {
            const [name, args] = event;
            console.log(`[BridgeMock] raiseBridgeEvent(${name}): args:`, args);
        }

        onBridgeEvent?.(...event);
    }
}