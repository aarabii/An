"use client";

import { useSyncExternalStore } from "react";

interface NavigatorUAData {
    platform: string;
}

function getIsMac(): boolean {
    if (typeof navigator === "undefined") return false;

    const uaData = (
        navigator as Navigator & { userAgentData?: NavigatorUAData }
    ).userAgentData;

    return uaData?.platform === "macOS" || /Mac/i.test(navigator.userAgent);
}

// Platform never changes during a session, so subscribe is a no-op.
const emptySubscribe = () => () => {};

export function useIsMac() {
    return useSyncExternalStore(
        emptySubscribe,
        getIsMac, // client snapshot
        () => false, // server snapshot (SSR fallback, avoids hydration mismatch)
    );
}
