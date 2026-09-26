"use client";

import { useSyncExternalStore } from "react";

interface NavigatorUAData {
    platform: string;
}

declare global {
    interface Navigator {
        userAgentData?: NavigatorUAData;
    }
}

function getIsMac(): boolean {
    if (typeof navigator === "undefined") return false;
    return navigator.userAgentData?.platform === "macOS" || /Mac/i.test(navigator.userAgent);
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
