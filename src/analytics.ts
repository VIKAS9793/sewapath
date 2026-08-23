/**
 * Module: analytics
 * Layer: Shared
 * Purpose: GA4 Consent Mode v2 — cookieless aggregate baseline loads immediately;
 *          precision tracking upgrades to analytics_storage="granted" after explicit consent.
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
 * @returns A trimmed Measurement ID or an empty string when not configured.
 */
function getMeasurementId() {
  return import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() ?? "";
}

/**
 * Report whether the current build has a GA4 Measurement ID configured.
 * Used to decide whether to show the precision-upgrade consent banner.
 *
 * @returns True when the build can offer the optional precision-tracking choice.
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
 * Initialise GA4 with Consent Mode v2 defaults (all storage denied).
 *
 * This must be called on page load regardless of user consent.
 * With analytics_storage="denied", GA4 fires cookieless, non-identifying pings
 * that Google uses to model aggregate journeys and funnels. No _ga cookie is set
 * and no personal data is collected. No user consent is required for this baseline.
 *
 * If the visitor has previously granted precision consent, pass granted=true to
 * immediately upgrade to full per-session tracking without showing the banner.
 */
export function initAnalytics(grantedImmediately = false) {
  const measurementId = getMeasurementId();
  if (!measurementId || typeof window === "undefined") return;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = window.gtag ?? ((...args: unknown[]) => window.dataLayer?.push(args));

  // Set denied as the default — no cookie, cookieless modeled pings only
  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500,
  });

  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  // Load the gtag script once
  if (!document.querySelector(`script[data-sewapath-ga4="${measurementId}"]`)) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    script.dataset.sewapathGa4 = measurementId;
    document.head.appendChild(script);
  }

  // Upgrade immediately if the visitor already granted consent in a previous session
  if (grantedImmediately) {
    window.gtag("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    analyticsReady = true;
  }
}

/**
 * Upgrade from cookieless baseline to precision tracking after a visitor explicitly opts in.
 * The gtag script is already loaded by initAnalytics(); this only updates the consent signal.
 *
 * @returns True when precision tracking was successfully enabled.
 */
export function enableAnalytics(): boolean {
  const measurementId = getMeasurementId();
  if (!measurementId || typeof window === "undefined") return false;

  window.localStorage.setItem(CONSENT_STORAGE_KEY, "granted");

  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }

  analyticsReady = true;
  return true;
}

/**
 * Revert to cookieless-only baseline and revoke precision tracking consent.
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
 * Fires only when precision tracking is active (analyticsReady=true). The cookieless
 * baseline pings are handled automatically by gtag and do not require this function.
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
