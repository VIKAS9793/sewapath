/**
 * Component/Module: SewaPathPrototype
 * Layer: Layer 1 Intake | Shared
 * Purpose: Provide a calm, multilingual first step for finding a public service route.
 * Props/Inputs: None
 * Dependencies: MobileScroll, KeyboardInput, Radix UI icons, public SewaPath assets
 * Author: Vikas Sahani
 * Date: August 22, 2026
 */
import { useEffect, useMemo, useState } from "react";
import { ChevronRightIcon, LockClosedIcon, SpeakerLoudIcon } from "@radix-ui/react-icons";
import { KeyboardInput, MobileScroll, useKeyboard } from "./mobile";
import {
  disableAnalytics,
  enableAnalytics,
  getAnalyticsConsent,
  isAnalyticsConfigured,
  trackEvent,
  type AnalyticsConsent,
} from "./analytics";

type Language = "mr" | "hi" | "en";
type Screen = "listen" | "route" | "next" | "friction";

const OFFICIAL_SERVICE_DIRECTORY_URL =
  "https://aaplesarkar.mahaonline.gov.in/en/CommonForm/CitizenServices_RTS";

const languageLabels: Record<Language, string> = {
  mr: "मराठी",
  hi: "हिंदी",
  en: "English",
};

const copy = {
  mr: {
    title: "आपले उत्पन्न प्रमाणपत्र सुलभ आणि सुरक्षित",
    intro: "सरकारी सेवा शोधण्यासाठी तुमच्या भाषेतून सुरुवात करा.",
    example: "मला उत्पन्न प्रमाणपत्र हवे आहे",
    voice: "बोलून सांगा",
    type: "टाइप करून सांगा",
    privacy: "तुमची माहिती सुरक्षित आहे. इथे कागदपत्रे अपलोड होत नाहीत.",
    heard: "तुम्हाला ही सेवा हवी आहे असे आम्हाला समजले:",
    routeTitle: "उत्पन्न प्रमाणपत्रासाठी मार्ग",
    routeBody: "अधिकृत पोर्टलवर अर्ज करण्याआधी ही छोटी यादी तयार ठेवा.",
    checklist: ["ओळखपत्र", "पत्ता पुरावा", "उत्पन्नाचा पुरावा"],
    official: "अधिकृत पोर्टल उघडा",
    stuck: "कुठे अडचण आली? सांगूया",
    back: "परत जा",
    demoNote: "डेमोमध्ये आवाज रेकॉर्ड केला जात नाही.",
    safety: "या डेमोमध्ये आम्ही फक्त अनामिक अडचणींचे संकेत मोजतो.",
  },
  hi: {
    title: "अपना आय प्रमाणपत्र आसान और सुरक्षित बनाएं",
    intro: "सरकारी सेवा खोजने के लिए अपनी भाषा से शुरुआत करें।",
    example: "मुझे आय प्रमाणपत्र चाहिए",
    voice: "बोलकर बताएं",
    type: "टाइप करके बताएं",
    privacy: "आपकी जानकारी सुरक्षित है। यहां दस्तावेज़ अपलोड नहीं होते।",
    heard: "हमें समझ आया कि आपको यह सेवा चाहिए:",
    routeTitle: "आय प्रमाणपत्र का रास्ता",
    routeBody: "आधिकारिक पोर्टल पर आवेदन करने से पहले यह छोटी सूची तैयार रखें।",
    checklist: ["पहचान पत्र", "पते का प्रमाण", "आय का प्रमाण"],
    official: "आधिकारिक पोर्टल खोलें",
    stuck: "कहां अटके? बताएं",
    back: "वापस जाएं",
    demoNote: "डेमो में आवाज़ रिकॉर्ड नहीं होती।",
    safety: "इस डेमो में हम केवल गुमनाम अड़चन संकेत गिनते हैं।",
  },
  en: {
    title: "Find your income certificate route, simply and safely",
    intro: "Start in the language that feels most comfortable to you.",
    example: "I need an income certificate",
    voice: "Tell us by voice",
    type: "Type instead",
    privacy: "Your information stays private. No documents are uploaded here.",
    heard: "We understood that you need:",
    routeTitle: "Your income certificate route",
    routeBody: "Keep this short checklist ready before opening the official portal.",
    checklist: ["Identity proof", "Address proof", "Income proof"],
    official: "Open official portal",
    stuck: "Where did you get stuck?",
    back: "Go back",
    demoNote: "This demo does not record audio.",
    safety: "This demo only counts anonymous friction signals.",
  },
} as const;

const officialCheckCopy: Record<Language, { title: string; body: string; link: string }> = {
  mr: {
    title: "अंतिम माहिती अधिकृत पोर्टलवरच तपासा",
    body: "ही यादी फक्त तयारीसाठी आहे. अंतिम कागदपत्रे, शुल्क, पात्रता आणि वेळमर्यादा आपले सरकारच्या अधिकृत सेवायादीवरच तपासा.",
    link: "अधिकृत सेवायादी तपासा",
  },
  hi: {
    title: "अंतिम जानकारी केवल आधिकारिक पोर्टल पर जाँचें",
    body: "यह सूची केवल तैयारी के लिए है। अंतिम दस्तावेज़, शुल्क, पात्रता और समय-सीमा आपले सरकार की आधिकारिक सेवा सूची पर ही जाँचें।",
    link: "आधिकारिक सेवा सूची जाँचें",
  },
  en: {
    title: "Verify the final answer on the official portal",
    body: "This is a preparation aid, not an eligibility or document decision. Check the current documents, fees, eligibility, timeline, and form on the official Maharashtra service list before acting.",
    link: "Verify official service instructions",
  },
};

const analyticsCopy: Record<Language, { prompt: string; detail: string; allow: string; deny: string }> = {
  mr: {
    prompt: "SewaPath सुधारण्यासाठी अनामिक वापराची माहिती शेअर करायची का?",
    detail: "नाव, कागदपत्रे किंवा तुम्ही टाइप केलेले वाक्य पाठवले जात नाही.",
    allow: "हो, मदत करा",
    deny: "आत्ता नको",
  },
  hi: {
    prompt: "SewaPath को बेहतर बनाने के लिए गुमनाम उपयोग जानकारी साझा करें?",
    detail: "नाम, दस्तावेज़ या आपका लिखा हुआ वाक्य नहीं भेजा जाता।",
    allow: "हां, मदद करें",
    deny: "अभी नहीं",
  },
  en: {
    prompt: "Share anonymous usage data to help improve SewaPath?",
    detail: "Names, documents, and what you type are never sent.",
    allow: "Allow analytics",
    deny: "Not now",
  },
};

const nextCopy: Record<Language, { title: string; body: string; checklist: string[]; official: string; restart: string }> = {
  mr: {
    title: "अधिकृत पोर्टलनंतर पुढे काय?",
    body: "अर्ज केल्यानंतर ही माहिती जतन करा आणि स्थिती फक्त अधिकृत मार्गावर तपासा.",
    checklist: ["अर्ज किंवा पोचपावती क्रमांक जतन करा", "अधिकृत पोर्टलवर अर्जाची स्थिती तपासा", "मदत हवी असल्यास अधिकृत सेवा केंद्र वापरा"],
    official: "अधिकृत पोर्टल पुन्हा उघडा",
    restart: "पुन्हा सुरुवात करा",
  },
  hi: {
    title: "आधिकारिक पोर्टल के बाद क्या करें?",
    body: "आवेदन के बाद यह जानकारी सुरक्षित रखें और स्थिति केवल आधिकारिक मार्ग पर देखें।",
    checklist: ["आवेदन या रसीद नंबर सुरक्षित रखें", "आधिकारिक पोर्टल पर आवेदन की स्थिति देखें", "मदद चाहिए तो अधिकृत सेवा केंद्र का उपयोग करें"],
    official: "आधिकारिक पोर्टल फिर खोलें",
    restart: "फिर से शुरू करें",
  },
  en: {
    title: "What happens after the official portal?",
    body: "Keep your acknowledgement details safe and check progress only through the official route.",
    checklist: ["Save the application or acknowledgement number", "Track status on the official portal", "Use an authorised service centre if you need assisted help"],
    official: "Open the official portal again",
    restart: "Start again",
  },
};

const frictionCopy: Record<Language, { title: string; body: string; back: string; submitted: string; options: Array<{ label: string; reason: string }> }> = {
  mr: {
    title: "कुठे अडचण आली?",
    body: "तुमची ओळख किंवा अर्जाची माहिती न देता एक पर्याय निवडा.",
    back: "मार्गाकडे परत जा",
    submitted: "धन्यवाद. हा अनामिक संकेत नोंदवला गेला.",
    options: [
      { label: "सेवा सापडली नाही", reason: "service_not_found" },
      { label: "कागदपत्रे स्पष्ट नव्हती", reason: "documents_unclear" },
      { label: "लॉगिन किंवा OTP अडचण", reason: "login_or_otp" },
      { label: "तांत्रिक अडचण", reason: "technical_issue" },
    ],
  },
  hi: {
    title: "कहां अटक गए?",
    body: "अपनी पहचान या आवेदन की जानकारी दिए बिना एक विकल्प चुनें।",
    back: "रास्ते पर वापस जाएं",
    submitted: "धन्यवाद। यह गुमनाम संकेत दर्ज किया गया है।",
    options: [
      { label: "सेवा नहीं मिली", reason: "service_not_found" },
      { label: "दस्तावेज़ स्पष्ट नहीं थे", reason: "documents_unclear" },
      { label: "लॉगिन या OTP समस्या", reason: "login_or_otp" },
      { label: "तकनीकी समस्या", reason: "technical_issue" },
    ],
  },
  en: {
    title: "Where did you get stuck?",
    body: "Choose one option without sharing your identity or application details.",
    back: "Back to the route",
    submitted: "Thank you. This anonymous signal was recorded.",
    options: [
      { label: "Could not find the service", reason: "service_not_found" },
      { label: "Documents were unclear", reason: "documents_unclear" },
      { label: "Login or OTP issue", reason: "login_or_otp" },
      { label: "Technical problem", reason: "technical_issue" },
    ],
  },
};

export default function Prototype() {
  const [language, setLanguage] = useState<Language>("mr");
  const [screen, setScreen] = useState<Screen>("listen");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [request, setRequest] = useState("");
  const [frictionSubmitted, setFrictionSubmitted] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState<AnalyticsConsent>(() => getAnalyticsConsent());
  const keyboard = useKeyboard();
  const text = useMemo(() => copy[language], [language]);
  const analyticsConfigured = isAnalyticsConfigured();

  useEffect(() => {
    if (analyticsConsent === "granted") enableAnalytics();
  }, [analyticsConsent]);

  const handleAnalyticsChoice = (granted: boolean) => {
    if (granted && enableAnalytics()) {
      setAnalyticsConsent("granted");
      trackEvent("analytics_consent_granted", { method: "banner" });
      return;
    }

    disableAnalytics();
    setAnalyticsConsent("denied");
  };

  const submitRequest = () => {
    if (!request.trim()) return;
    keyboard.hide();
    setIsListening(false);
    setIsTyping(false);
    setScreen("route");
    trackEvent("service_request_submitted", {
      language,
      input_method: isListening ? "voice_demo" : "typed",
      service: "income_certificate_maharashtra",
    });
  };

  const startVoiceDemo = () => {
    setIsTyping(false);
    setIsListening(true);
    setRequest(text.example);
    trackEvent("voice_demo_started", { language });
  };

  return (
    <MobileScroll className="app-screen">
      <main className="screen-content sewapath-screen" aria-label="SewaPath service navigator">
        <header className="app-header">
          <div className="brand-crop" aria-label="SewaPath">
            <img src="/assets/sewapath/logo.png" alt="SewaPath" draggable={false} />
          </div>
          <div className="language-switcher" aria-label="Choose language">
            {(Object.keys(languageLabels) as Language[]).map((option) => (
              <button
                key={option}
                className={language === option ? "language-option active" : "language-option"}
                type="button"
                aria-pressed={language === option}
                onClick={() => {
                  setLanguage(option);
                  trackEvent("language_selected", { language: option });
                }}
              >
                {languageLabels[option]}
              </button>
            ))}
          </div>
        </header>

        {screen === "listen" ? (
          <section className="listen-panel" aria-labelledby="welcome-title">
            <div className="eyebrow">SEWAPATH · STEP 1 OF 4</div>
            <h1 id="welcome-title">{text.title}</h1>
            <p className="intro-copy">{text.intro}</p>

            <img
              className="journey-illustration"
              src="/assets/sewapath/maharashtra-journey.png"
              alt="A citizen and a public service worker connected by a journey across Maharashtra"
              draggable={false}
            />

            <div className="voice-card" aria-live="polite">
              <div className="voice-card-copy">
                <span className="voice-label">{isListening ? "LISTENING…" : "TRY AN EXAMPLE"}</span>
                <strong>{isListening ? text.example : text.example}</strong>
                <small>{isListening ? text.demoNote : "Speak or type — you stay in control."}</small>
              </div>
              <button
                className={isListening ? "voice-button listening" : "voice-button"}
                type="button"
                aria-label={isListening ? "Finish voice demo" : text.voice}
                onClick={() => (isListening ? submitRequest() : startVoiceDemo())}
              >
                <SpeakerLoudIcon width="25" height="25" aria-hidden="true" />
                <span>{isListening ? "✓" : ""}</span>
              </button>
            </div>

            <button
              className="text-entry-trigger"
              type="button"
              onClick={() => {
                setIsTyping(true);
                setIsListening(false);
                trackEvent("typed_entry_opened", { language });
              }}
            >
              {text.type} <ChevronRightIcon width="16" height="16" aria-hidden="true" />
            </button>

            {isTyping && (
              <div className="typed-entry" aria-label="Type your service request">
                <label htmlFor="service-request">{text.type}</label>
                <div className="typed-entry-row">
                  <KeyboardInput
                    id="service-request"
                    value={request}
                    onChange={(event) => setRequest(event.currentTarget.value)}
                    placeholder={text.example}
                    autoFocus
                  />
                  <button className="submit-button" type="button" onClick={submitRequest}>
                    <ChevronRightIcon width="20" height="20" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}

            <p className="privacy-note">
              <LockClosedIcon width="15" height="15" aria-hidden="true" />
              <span>{text.privacy}</span>
            </p>
          </section>
        ) : screen === "route" ? (
          <section className="route-panel" aria-labelledby="route-title">
            <button className="back-button" type="button" onClick={() => setScreen("listen")}>
              <span aria-hidden="true">←</span> {text.back}
            </button>
            <div className="eyebrow">SEWAPATH · STEP 2 OF 4</div>
            <h1 id="route-title">{text.routeTitle}</h1>
            <p className="intro-copy">{text.routeBody}</p>

            <div className="understood-card">
              <span>{text.heard}</span>
              <strong>{request || text.example}</strong>
            </div>

            <ol className="checklist">
              {text.checklist.map((item, index) => (
                <li key={item}>
                  <span className="step-number">{index + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>

            <aside className="verification-card" aria-label="Official information check">
              <strong>{officialCheckCopy[language].title}</strong>
              <p>{officialCheckCopy[language].body}</p>
              <a
                href={OFFICIAL_SERVICE_DIRECTORY_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackEvent("official_source_check_clicked", { service: "income_certificate_maharashtra" })
                }
              >
                {officialCheckCopy[language].link}
              </a>
            </aside>

            <a
              className="official-link"
              href={OFFICIAL_SERVICE_DIRECTORY_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                trackEvent("official_portal_clicked", { service: "income_certificate_maharashtra" });
                setScreen("next");
              }}
            >
              {text.official} <ChevronRightIcon width="18" height="18" aria-hidden="true" />
            </a>

            <button
              className="friction-link"
              type="button"
              onClick={() => {
                setFrictionSubmitted(false);
                setScreen("friction");
                trackEvent("friction_prompt_opened", { language });
              }}
            >
              {text.stuck} <ChevronRightIcon width="16" height="16" aria-hidden="true" />
            </button>

            <p className="route-safety-note">{text.safety}</p>
          </section>
        ) : screen === "next" ? (
          <section className="route-panel next-panel" aria-labelledby="next-title">
            <button className="back-button" type="button" onClick={() => setScreen("route")}>
              <span aria-hidden="true">â†</span> {text.back}
            </button>
            <div className="eyebrow">SEWAPATH Â· STEP 3 OF 4</div>
            <h1 id="next-title">{nextCopy[language].title}</h1>
            <p className="intro-copy">{nextCopy[language].body}</p>
            <aside className="verification-card" aria-label="Official information check">
              <strong>{officialCheckCopy[language].title}</strong>
              <p>{officialCheckCopy[language].body}</p>
              <a
                href={OFFICIAL_SERVICE_DIRECTORY_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackEvent("official_source_check_clicked", { service: "income_certificate_maharashtra" })
                }
              >
                {officialCheckCopy[language].link}
              </a>
            </aside>
            <ol className="checklist">
              {nextCopy[language].checklist.map((item, index) => (
                <li key={item}>
                  <span className="step-number">{index + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
            <a
              className="official-link"
              href={OFFICIAL_SERVICE_DIRECTORY_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("official_portal_reopened", { service: "income_certificate_maharashtra" })}
            >
              {nextCopy[language].official} <ChevronRightIcon width="18" height="18" aria-hidden="true" />
            </a>
            <button
              className="text-entry-trigger"
              type="button"
              onClick={() => {
                setRequest("");
                setScreen("listen");
                trackEvent("journey_restarted", { language });
              }}
            >
              {nextCopy[language].restart} <ChevronRightIcon width="16" height="16" aria-hidden="true" />
            </button>
          </section>
        ) : (
          <section className="route-panel friction-panel" aria-labelledby="friction-title">
            <button className="back-button" type="button" onClick={() => setScreen("route")}>
              <span aria-hidden="true">â†</span> {frictionCopy[language].back}
            </button>
            <div className="eyebrow">SEWAPATH Â· STEP 4 OF 4</div>
            <h1 id="friction-title">{frictionCopy[language].title}</h1>
            <p className="intro-copy">{frictionCopy[language].body}</p>
            {frictionSubmitted ? (
              <div className="understood-card" role="status">
                <strong>{frictionCopy[language].submitted}</strong>
              </div>
            ) : (
              <div className="friction-options" role="list">
                {frictionCopy[language].options.map((option) => (
                  <button
                    key={option.reason}
                    type="button"
                    onClick={() => {
                      setFrictionSubmitted(true);
                      trackEvent("friction_feedback_selected", { language, friction_reason: option.reason });
                    }}
                  >
                    {option.label} <ChevronRightIcon width="16" height="16" aria-hidden="true" />
                  </button>
                ))}
              </div>
            )}
          </section>
        )}

        {analyticsConfigured && analyticsConsent === "unknown" && (
          <aside className="analytics-consent" aria-label="Analytics choice">
            <strong>{analyticsCopy[language].prompt}</strong>
            <p>{analyticsCopy[language].detail}</p>
            <div className="analytics-consent-actions">
              <button type="button" onClick={() => handleAnalyticsChoice(true)}>
                {analyticsCopy[language].allow}
              </button>
              <button type="button" onClick={() => handleAnalyticsChoice(false)}>
                {analyticsCopy[language].deny}
              </button>
            </div>
          </aside>
        )}

        <footer className="site-footer">
          <p>Independent public-service guide · not a government portal</p>
          <nav aria-label="SewaPath disclosures">
            <a href="/purpose/">Purpose</a>
            <a href="/privacy/">Privacy</a>
            <a href="/safety/">Safety</a>
            <a href="/accessibility/">Accessibility</a>
          </nav>
          <a href="mailto:vikassahani17@gmail.com">Report a privacy, safety, accessibility, or content concern</a>
        </footer>
      </main>
    </MobileScroll>
  );
}
