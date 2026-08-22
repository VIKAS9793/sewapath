/**
 * Module: analytics
 * Layer: Shared
 * Purpose: Load optional GA4 measurement only after explicit visitor consent.
 * Dependencies: VITE_GA_MEASUREMENT_ID build variable and Google gtag.js.
 * Author: Vikas Sahani
 * Date: August 22, 2026
 */

type EventParameters = Record<string, string | number | boolean>;
export type AnalyticsConsent = "unknown" | "granted" | "denied";

const CONSENT_STORAGE_KEY = "sewapath.analytics-consent";
let analyticsReady = false;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    uetq?: Array<unknown>;
  }
}

/**
 * Return the configured GA4 Measurement ID without exposing it in application copy.
 *
 * @returns A trimmed Measurement ID or an empty string when Cloudflare has not configured one.
 */
function getMeasurementId() {
  return import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() ?? "";
}

/**
 * Report whether the current build has a GA4 Measurement ID configured.
 *
 * @returns True when the build can offer the optional analytics choice.
 */
export function isAnalyticsConfigured() {
  return Boolean(getMeasurementId());
}

/**
 * Read the visitor's stored analytics choice without creating a tracking cookie.
 *
 * @returns The stored consent state, or unknown for a first visit.
 */
export function getAnalyticsConsent(): AnalyticsConsent {
  if (typeof window === "undefined") return "unknown";

  const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  return stored === "granted" || stored === "denied" ? stored : "unknown";
}

/**
 * Load gtag.js and configure GA4 after a visitor explicitly opts in.
 *
 * @returns True when the tag was initialized for this page.
 */
export function enableAnalytics() {
  const measurementId = getMeasurementId();
  if (!measurementId || typeof window === "undefined") return false;

  window.localStorage.setItem(CONSENT_STORAGE_KEY, "granted");
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = window.gtag ?? ((...args: unknown[]) => window.dataLayer?.push(args));

  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("consent", "update", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  if (!document.querySelector(`script[data-sewapath-ga4="${measurementId}"]`)) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    script.dataset.sewapathGa4 = measurementId;
    document.head.appendChild(script);
  }

  analyticsReady = true;
  return true;
}

/**
 * Store a refusal and revoke analytics storage if a visitor changes their choice.
 */
export function disableAnalytics() {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(CONSENT_STORAGE_KEY, "denied");
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }
  analyticsReady = false;
}

/**
 * Track an allowlisted product event without sending citizen-entered text or identifiers.
 *
 * @param eventName Stable event name used by the measurement plan.
 * @param parameters Aggregate parameters such as language or input method.
 */
export function trackEvent(eventName: string, parameters: EventParameters = {}) {
  if (!analyticsReady || typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, parameters);
  }

  if (Array.isArray(window.uetq)) {
    window.uetq.push("event", eventName, parameters);
  }
}
