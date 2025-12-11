import posthog from 'posthog-js';

// Инициализация PostHog
export const initPostHog = () => {
    if (typeof window !== 'undefined') {
        posthog.init('phc_pDLxpntcW1G2cYVzpZBJTgQRCfga3J3QtQRa7X9NIj7', {
            api_host: 'https://us.i.posthog.com',
            person_profiles: 'identified_only',
            capture_pageview: true,
            capture_pageleave: true,
            autocapture: true,
        });
    }
};

// Идентификация пользователя
export const identifyUser = (userId: string, traits?: Record<string, any>) => {
    posthog.identify(userId, traits);
};

// Отслеживание событий
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    posthog.capture(eventName, properties);
};

// Сброс пользователя при логауте
export const resetUser = () => {
    posthog.reset();
};

// Установка свойств пользователя
export const setUserProperties = (properties: Record<string, any>) => {
    posthog.setPersonProperties(properties);
};

export default posthog;