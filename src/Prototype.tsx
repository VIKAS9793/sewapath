/**
 * Component/Module: SewaPathPrototype
 * Layer: Layer 1 Intake | Shared
 * Purpose: Provide a calm, multilingual first step for finding a public service route.
 * Props/Inputs: None
 * Dependencies: MobileScroll, KeyboardInput, Radix UI icons, public SewaPath assets
 * Author: Vikas Sahani
 * Date: August 22, 2026
 */
import { useMemo, useState } from "react";
import { ChevronRightIcon, LockClosedIcon, SpeakerLoudIcon } from "@radix-ui/react-icons";
import { KeyboardInput, MobileScroll, useKeyboard } from "./mobile";
import { trackEvent } from "./analytics";

type Language = "mr" | "hi" | "en";
type Screen = "listen" | "route";

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

export default function Prototype() {
  const [language, setLanguage] = useState<Language>("mr");
  const [screen, setScreen] = useState<Screen>("listen");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [request, setRequest] = useState("");
  const keyboard = useKeyboard();
  const text = useMemo(() => copy[language], [language]);

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
        ) : (
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

            <a
              className="official-link"
              href="https://aaplesarkar.mahaonline.gov.in/en/CommonForm/CitizenServices_RTS"
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("official_portal_clicked", { service: "income_certificate_maharashtra" })}
            >
              {text.official} <ChevronRightIcon width="18" height="18" aria-hidden="true" />
            </a>

            <button
              className="friction-link"
              type="button"
              onClick={() => trackEvent("friction_prompt_opened", { language })}
            >
              {text.stuck} <ChevronRightIcon width="16" height="16" aria-hidden="true" />
            </button>

            <p className="route-safety-note">{text.safety}</p>
          </section>
        )}
      </main>
    </MobileScroll>
  );
}
