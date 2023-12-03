import BridgeMock from "./BridgeMock";

export default function injectBridgeMockInDev()
{
    if (import.meta.env.DEV && !window.Bridge)
    {
        window.Bridge = new BridgeMock();
    }
}