/**
 * Module: analytics
 * Layer: Shared
 * Purpose: Send privacy-safe interaction events to optional Google Analytics and Bing UET integrations.
 * Dependencies: Optional window.gtag and window.uetq integrations configured outside source code
 * Author: Vikas Sahani
 * Date: August 22, 2026
 */

type EventParameters = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    uetq?: Array<unknown>;
  }
}

/**
 * Track a low-risk product event without sending citizen-entered text or identifiers.
 *
 * @param eventName Stable event name used by the measurement plan.
 * @param parameters Allowlisted aggregate parameters such as language or input method.
 */
export function trackEvent(eventName: string, parameters: EventParameters = {}) {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, parameters);
  }

  if (Array.isArray(window.uetq)) {
    window.uetq.push("event", eventName, parameters);
  }
}
