import posthog from "posthog-js";

const POSTHOG_KEY = process.env.REACT_APP_POSTHOG_KEY;
const POSTHOG_HOST =
    process.env.REACT_APP_POSTHOG_HOST ?? "https://us.i.posthog.com";

/**
 * Analytics is optional: without a key the app runs normally and every
 * tracking call below becomes a no-op.
 */
let enabled = false;

export const initPostHog = () => {
    if (typeof window === "undefined" || !POSTHOG_KEY) {
        return;
    }

    posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        person_profiles: "identified_only",
        capture_pageview: false, // the router reports page views itself
        capture_pageleave: true,
        autocapture: true,
    });

    enabled = true;
};

export const identifyUser = (
    userId: string,
    traits?: Record<string, any>
) => {
    if (!enabled) return;
    posthog.identify(userId, traits);
};

export const trackEvent = (
    eventName: string,
    properties?: Record<string, any>
) => {
    if (!enabled) return;
    posthog.capture(eventName, properties);
};

export const resetUser = () => {
    if (!enabled) return;
    posthog.reset();
};

export const setUserProperties = (properties: Record<string, any>) => {
    if (!enabled) return;
    posthog.setPersonProperties(properties);
};

export default posthog;
