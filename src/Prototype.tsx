/**
 * Component: SewaPath
 * Layer: Web Application Root
 * Purpose: Full-web, multilingual, 4-step public-service navigation aid for
 *          the Maharashtra income certificate route through Aaple Sarkar.
 * Props: None
 * Dependencies: @radix-ui/react-icons, ./analytics
 * Author: Vikas Sahani
 * Date: August 22, 2026
 */
import { useEffect, useState } from "react";
import { ChevronRightIcon, LockClosedIcon, SpeakerLoudIcon } from "@radix-ui/react-icons";
import { startListening, stopListening, abortListening, cancelSpeech, speak, type VoiceError } from "./voice";
import {
  disableAnalytics,
  enableAnalytics,
  getAnalyticsConsent,
  initAnalytics,
  isAnalyticsConfigured,
  trackEvent,
  type AnalyticsConsent,
} from "./analytics";
import { CITIZEN_SERVICES, type CitizenService } from "./data/services";

/* ─── Types ─────────────────────────────────────────────────── */
type Language = "mr" | "hi" | "en";
type Screen = "listen" | "route" | "next" | "friction";

/* ─── Constants ─────────────────────────────────────────────── */
const OFFICIAL_URL =
  "https://aaplesarkar.mahaonline.gov.in/en/CommonForm/CitizenServices_RTS";

const LANG_LABELS: Record<Language, string> = {
  mr: "मराठी",
  hi: "हिंदी",
  en: "English",
};

const LANG_ATTR: Record<Language, string> = {
  mr: "mr-IN",
  hi: "hi-IN",
  en: "en-IN",
};

/* ─── Copy interface ─────────────────────────────────────────── */
interface Copy {
  /* Step labels */
  eyebrow1: string;
  eyebrow2: string;
  eyebrow3: string;
  eyebrow4: string;
  /* Screen 1 */
  title: string;
  intro: string;
  searchLabel: string;
  searchPlaceholder: string;
  searchSubmit: string;
  orSpeak: string;
  speakBtnLabel: string;
  speakSubtext: string;
  listeningNote: string;
  privacy: string;
  /* Screen 2 */
  heard: string;
  fallbackRouteTitle: string;
  fallbackChecklistHeading: string;
  verifyTitle: string;
  verifyBody: string;
  verifyLink: string;
  official: string;
  externalNote: string;
  stuckBtnLabel: string;
  safety: string;
  /* Screen 3 */
  nextTitle: string;
  nextBody: string;
  nextChecklist: string[];
  nextOfficial: string;
  nextRestart: string;
  satisfactionQuestion: string;
  satisfactionYes: string;
  satisfactionNo: string;
  satisfactionThanks: string;
  /* Screen 4 */
  frictionTitle: string;
  frictionBody: string;
  frictionBack: string;
  frictionSubmitted: string;
  frictionOptions: Array<{ label: string; reason: string; icon: string }>;
  /* Footer / nav */
  footerDisclosure: string;
  purposeLabel: string;
  privacyLabel: string;
  safetyLabel: string;
  accessibilityLabel: string;
  reportLabel: string;
  back: string;
  /* Analytics consent */
  consentPrompt: string;
  consentDetail: string;
  consentAllow: string;
  consentDeny: string;
  /* Voice Errors */
  voiceErrorUnsupported: string;
  voiceErrorNoSpeech: string;
  voiceErrorNotAllowed: string;
  voiceErrorNetwork: string;
}

/* ─── Translations ───────────────────────────────────────────── */
const COPY: Record<Language, Copy> = {
  mr: {
    eyebrow1: "सेवापाथ · पायरी १ पैकी ४",
    eyebrow2: "सेवापाथ · पायरी २ पैकी ४",
    eyebrow3: "सेवापाथ · पायरी ३ पैकी ४",
    eyebrow4: "सेवापाथ · पायरी ४ पैकी ४",

    title: "आपले उत्पन्न प्रमाणपत्र सुलभ आणि सुरक्षित",
    intro: "सरकारी सेवा शोधण्यासाठी खाली लिहा किंवा बोला.",
    searchLabel: "तुम्हाला काय हवे आहे?",
    searchPlaceholder: "येथे लिहा… जसे की: उत्पन्न प्रमाणपत्र, रेशन कार्ड",
    searchSubmit: "पुढे जा",
    orSpeak: "— किंवा बोलून सांगा —",
    speakBtnLabel: "🎤 बोला",
    speakSubtext: "बोलण्यासाठी वरचे बटण दाबा",
    listeningNote: "ऐकतो आहे… आवाज फक्त तुमच्या ब्राउझरमध्ये.",
    privacy: "तुमची माहिती सुरक्षित आहे. इथे कागदपत्रे अपलोड होत नाहीत.",

    heard: "तुम्हाला ही सेवा हवी आहे:",
    fallbackRouteTitle: "अज्ञात सेवेसाठी मार्ग",
    fallbackChecklistHeading: "ही कागदपत्रे तयार ठेवा:",
    verifyTitle: "अंतिम माहिती अधिकृत पोर्टलवरच तपासा",
    verifyBody:
      "ही यादी फक्त तयारीसाठी आहे. अंतिम कागदपत्रे, शुल्क, पात्रता आणि वेळमर्यादा अधिकृत सेवायादीवर तपासा.",
    verifyLink: "अधिकृत सेवायादी तपासा →",
    official: "अधिकृत वेबसाईटवर अर्ज करा",
    externalNote: "बाहेरील सरकारी वेबसाईट उघडते",
    stuckBtnLabel: "अडचण आली? येथे सांगा",
    safety: "या मार्गदर्शकात फक्त अनामिक अडचणींचे संकेत मोजले जातात.",

    nextTitle: "अधिकृत पोर्टलनंतर पुढे काय?",
    nextBody: "अर्ज केल्यानंतर ही माहिती जतन करा आणि स्थिती फक्त अधिकृत मार्गावर तपासा.",
    nextChecklist: [
      "शुल्क भरल्यानंतर तुमचा 'Application ID' जतन करा",
      "त्या ID वापरून आपले सरकार पोर्टलवर अर्जाची स्थिती तपासा",
      "किंवा मूळ कागदपत्रांसह मदतीसाठी जवळच्या 'आपले सरकार सेवा केंद्रात' जा",
    ],
    nextOfficial: "अधिकृत पोर्टल पुन्हा उघडा",
    nextRestart: "पुन्हा सुरुवात करा",

    satisfactionQuestion: "हे मार्गदर्शक उपयुक्त ठरले का?",
    satisfactionYes: "होय",
    satisfactionNo: "नाही",
    satisfactionThanks: "तुमच्या अभिप्रायाबद्दल धन्यवाद.",

    frictionTitle: "कुठे अडचण आली?",
    frictionBody: "खाली एक पर्याय निवडा. तुमची ओळख किंवा अर्जाची माहिती सांगण्याची गरज नाही.",
    frictionBack: "मार्गाकडे परत जा",
    frictionSubmitted: "धन्यवाद. हा अनामिक संकेत नोंदवला गेला.",
    frictionOptions: [
      { label: "योग्य सेवा सापडली नाही", reason: "service_not_found", icon: "🔍" },
      { label: "पात्रता स्पष्ट नव्हती", reason: "eligibility_unclear", icon: "❓" },
      { label: "आवश्यक कागदपत्रे स्पष्ट नव्हती", reason: "documents_unclear", icon: "📄" },
      { label: "भाषा किंवा परिभाषा कठीण वाटली", reason: "language_difficulty", icon: "💬" },
      { label: "लॉगिन किंवा OTP अडचण", reason: "login_or_otp", icon: "🔑" },
      { label: "अपलोड, पेमेंट किंवा नेटवर्क अडचण", reason: "upload_payment_network", icon: "📶" },
      { label: "अर्जाची स्थिती किंवा पावती सापडली नाही", reason: "status_not_found", icon: "📋" },
      { label: "अर्ज उशिरा झाला किंवा नाकारला गेला", reason: "delayed_or_rejected", icon: "⏳" },
      { label: "व्यक्ती किंवा सेवा केंद्राची मदत लागली", reason: "needed_assisted_help", icon: "🤝" },
      { label: "ऑफलाइन मार्ग सुरक्षित वाटला म्हणून निवडला", reason: "chose_offline", icon: "🏢" },
    ],

    footerDisclosure: "स्वतंत्र सार्वजनिक सेवा मार्गदर्शक · सरकारी पोर्टल नाही",
    purposeLabel: "उद्देश",
    privacyLabel: "गोपनीयता",
    safetyLabel: "सुरक्षा",
    accessibilityLabel: "सुलभता",
    reportLabel: "चिंता नोंदवा",
    back: "← परत जा",
    consentPrompt: "अचूक माहितीसाठी ट्रॅकिंग परवानगी द्यायची का?",
    consentDetail:
      "मूळ अनामिक माहिती आधीपासून गोळा होते. परवानगी दिल्यास अधिक तपशीलवार विश्लेषण मिळते.",
    consentAllow: "परवानगी द्या",
    consentDeny: "नको",
    voiceErrorUnsupported: "तुमच्या ब्राउझरमध्ये व्हॉइस सपोर्ट नाही. कृपया टाइप करा.",
    voiceErrorNoSpeech: "आवाज ऐकू आला नाही. कृपया पुन्हा प्रयत्न करा.",
    voiceErrorNotAllowed: "मायक्रोफोन परवानगी नाकारली.",
    voiceErrorNetwork: "नेटवर्क त्रुटी. कृपया टाइप करा.",
  },

  hi: {
    eyebrow1: "सेवापाथ · चरण १ में से ४",
    eyebrow2: "सेवापाथ · चरण २ में से ४",
    eyebrow3: "सेवापाथ · चरण ३ में से ४",
    eyebrow4: "सेवापाथ · चरण ४ में से ४",

    title: "अपना आय प्रमाणपत्र आसान और सुरक्षित बनाएं",
    intro: "सरकारी सेवा खोजने के लिए नीचे लिखें या बोलें।",
    searchLabel: "आपको क्या चाहिए?",
    searchPlaceholder: "यहाँ लिखें… जैसे: आय प्रमाणपत्र, राशन कार्ड",
    searchSubmit: "आगे बढ़ें",
    orSpeak: "— या बोलकर बताएं —",
    speakBtnLabel: "🎤 बोलें",
    speakSubtext: "बोलने के लिए ऊपर का बटन दबाएं",
    listeningNote: "सुन रहे हैं… आवाज़ केवल आपके ब्राउज़र में।",
    privacy: "आपकी जानकारी सुरक्षित है। यहाँ दस्तावेज़ अपलोड नहीं होते।",

    heard: "हमें समझ आया कि आपको यह सेवा चाहिए:",
    fallbackRouteTitle: "अज्ञात सेवा का मार्ग",
    fallbackChecklistHeading: "ये दस्तावेज़ तैयार रखें:",
    verifyTitle: "अंतिम जानकारी केवल आधिकारिक पोर्टल पर जाँचें",
    verifyBody:
      "यह सूची केवल तैयारी के लिए है। अंतिम दस्तावेज़, शुल्क, पात्रता और समय-सीमा आधिकारिक सेवा सूची पर जाँचें।",
    verifyLink: "आधिकारिक सेवा सूची जाँचें →",
    official: "आधिकारिक वेबसाइट पर आवेदन करें",
    externalNote: "बाहरी सरकारी वेबसाइट खुलती है",
    stuckBtnLabel: "परेशानी आई? यहाँ बताएं",
    safety: "इस मार्गदर्शक में केवल गुमनाम अड़चन संकेत गिने जाते हैं।",

    nextTitle: "आधिकारिक पोर्टल के बाद क्या करें?",
    nextBody: "आवेदन के बाद यह जानकारी सुरक्षित रखें और स्थिति केवल आधिकारिक मार्ग पर देखें।",
    nextChecklist: [
      "शुल्क का भुगतान करने के बाद अपना 'Application ID' सुरक्षित रखें",
      "उस ID का उपयोग करके आपले सरकार पोर्टल पर स्थिति जांचें",
      "या मूल दस्तावेजों के साथ मदद के लिए नजदीकी 'आपले सरकार सेवा केंद्र' जाएं",
    ],
    nextOfficial: "आधिकारिक पोर्टल फिर खोलें",
    nextRestart: "फिर से शुरू करें",

    satisfactionQuestion: "क्या यह मार्गदर्शक उपयोगी था?",
    satisfactionYes: "हाँ",
    satisfactionNo: "नहीं",
    satisfactionThanks: "आपकी प्रतिक्रिया के लिए धन्यवाद।",

    frictionTitle: "कहाँ अटक गए?",
    frictionBody: "नीचे एक विकल्प चुनें। अपनी पहचान या आवेदन की जानकारी देने की ज़रूरत नहीं।",
    frictionBack: "रास्ते पर वापस जाएं",
    frictionSubmitted: "धन्यवाद। यह गुमनाम संकेत दर्ज किया गया है।",
    frictionOptions: [
      { label: "सही सेवा नहीं मिली", reason: "service_not_found", icon: "🔍" },
      { label: "पात्रता स्पष्ट नहीं थी", reason: "eligibility_unclear", icon: "❓" },
      { label: "आवश्यक दस्तावेज़ स्पष्ट नहीं थे", reason: "documents_unclear", icon: "📄" },
      { label: "भाषा या शब्दावली समझ नहीं आई", reason: "language_difficulty", icon: "💬" },
      { label: "लॉगिन या OTP समस्या", reason: "login_or_otp", icon: "🔑" },
      { label: "अपलोड, भुगतान या नेटवर्क विफल", reason: "upload_payment_network", icon: "📶" },
      { label: "आवेदन की स्थिति या रसीद नहीं मिली", reason: "status_not_found", icon: "📋" },
      { label: "आवेदन में देरी हुई या अस्वीकृत हुआ", reason: "delayed_or_rejected", icon: "⏳" },
      { label: "किसी व्यक्ति या सेवा केंद्र की मदद की जरूरत पड़ी", reason: "needed_assisted_help", icon: "🤝" },
      { label: "ऑफलाइन मार्ग सुरक्षित लगा इसलिए चुना", reason: "chose_offline", icon: "🏢" },
    ],

    footerDisclosure: "स्वतंत्र सार्वजनिक सेवा मार्गदर्शक · सरकारी पोर्टल नहीं",
    purposeLabel: "उद्देश्य",
    privacyLabel: "गोपनीयता",
    safetyLabel: "सुरक्षा",
    accessibilityLabel: "पहुंच",
    reportLabel: "चिंता दर्ज करें",
    back: "← वापस जाएं",
    consentPrompt: "सटीक जानकारी के लिए ट्रैकिंग की अनुमति दें?",
    consentDetail:
      "मूल अनाम डेटा पहले से एकत्र हो रहा है। अनुमति देने पर विस्तृत विश्लेषण मिलेगा।",
    consentAllow: "अनुमति दें",
    consentDeny: "नहीं",
    voiceErrorUnsupported: "आपके ब्राउज़र में वॉइस सपोर्ट नहीं है। कृपया टाइप करें।",
    voiceErrorNoSpeech: "आवाज़ सुनाई नहीं दी। कृपया पुनः प्रयास करें।",
    voiceErrorNotAllowed: "माइक्रोफ़ोन की अनुमति अस्वीकार की गई।",
    voiceErrorNetwork: "नेटवर्क त्रुटि। कृपया टाइप करें。",
  },

  en: {
    eyebrow1: "SEWAPATH · STEP 1 OF 4",
    eyebrow2: "SEWAPATH · STEP 2 OF 4",
    eyebrow3: "SEWAPATH · STEP 3 OF 4",
    eyebrow4: "SEWAPATH · STEP 4 OF 4",

    title: "Find your income certificate route, simply and safely",
    intro: "Write or speak what you need — in the language that feels easiest.",
    searchLabel: "What do you need?",
    searchPlaceholder: "Write here… e.g. income certificate, ration card",
    searchSubmit: "Proceed",
    orSpeak: "— or tell us by speaking —",
    speakBtnLabel: "🎤 Speak",
    speakSubtext: "Press the button above to speak",
    listeningNote: "Listening… voice stays in your browser only.",
    privacy: "Your information stays private. No documents are uploaded here.",

    heard: "We understood that you need:",
    fallbackRouteTitle: "Unknown Service Route",
    fallbackChecklistHeading: "Keep these documents ready:",
    verifyTitle: "Verify the final answer on the official portal",
    verifyBody:
      "This is a preparation aid only. Check the current documents, fees, eligibility, and timeline on the official Maharashtra service list before acting.",
    verifyLink: "Verify official service instructions →",
    official: "Apply on the official website",
    externalNote: "Opens an external government website",
    stuckBtnLabel: "Faced an issue? Tell us",
    safety: "This guide only counts anonymous friction signals.",

    nextTitle: "What happens after the official portal?",
    nextBody: "Keep your acknowledgement details safe and check progress only through the official route.",
    nextChecklist: [
      "Save your Application ID after paying the fee",
      "Track status on Aaple Sarkar using the ID",
      "Or visit an Aaple Sarkar Seva Kendra with original documents for in-person help",
    ],
    nextOfficial: "Open the official portal again",
    nextRestart: "Start again",

    satisfactionQuestion: "Was this guide helpful?",
    satisfactionYes: "Yes",
    satisfactionNo: "No",
    satisfactionThanks: "Thank you for your feedback.",

    frictionTitle: "Where did you get stuck?",
    frictionBody: "Choose one option below. No need to share your identity or application details.",
    frictionBack: "Back to the route",
    frictionSubmitted: "Thank you. This anonymous signal was recorded.",
    frictionOptions: [
      { label: "Could not find the correct service", reason: "service_not_found", icon: "🔍" },
      { label: "Eligibility was unclear", reason: "eligibility_unclear", icon: "❓" },
      { label: "Required documents were unclear", reason: "documents_unclear", icon: "📄" },
      { label: "Language or terminology was difficult", reason: "language_difficulty", icon: "💬" },
      { label: "OTP, login, or identity verification failed", reason: "login_or_otp", icon: "🔑" },
      { label: "Upload, payment, or network failed", reason: "upload_payment_network", icon: "📶" },
      { label: "Could not find status or receipt", reason: "status_not_found", icon: "📋" },
      { label: "Application was delayed or rejected", reason: "delayed_or_rejected", icon: "⏳" },
      { label: "Needed help from a person or service centre", reason: "needed_assisted_help", icon: "🤝" },
      { label: "Chose offline because it felt safer or clearer", reason: "chose_offline", icon: "🏢" },
    ],

    footerDisclosure: "Independent public-service guide · not a government portal",
    purposeLabel: "Purpose",
    privacyLabel: "Privacy",
    safetyLabel: "Safety",
    accessibilityLabel: "Accessibility",
    reportLabel: "Report a concern",
    back: "← Go back",
    consentPrompt: "Allow precision tracking to improve this guide?",
    consentDetail:
      "Aggregate journey data is already collected without a cookie. Allowing precision gives us per-session improvement signals.",
    consentAllow: "Allow precision",
    consentDeny: "No thanks",
    voiceErrorUnsupported: "Your browser does not support voice input. Please type.",
    voiceErrorNoSpeech: "No speech detected. Please try again.",
    voiceErrorNotAllowed: "Microphone permission denied.",
    voiceErrorNetwork: "Network error. Please type.",
  },
};

/* ─── Component ─────────────────────────────────────────────── */
export default function SewaPath() {
  const [language, setLanguage] = useState<Language>("mr");
  const [activeServiceId, setActiveServiceId] = useState<string>("income_certificate");
  const [screen, setScreen] = useState<Screen>("listen");
  const [isListening, setIsListening] = useState(false);
  const [voiceError, setVoiceError] = useState<VoiceError>(null);
  const [request, setRequest] = useState("");
  const [frictionSubmitted, setFrictionSubmitted] = useState(false);
  const [satisfactionSubmitted, setSatisfactionSubmitted] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState<AnalyticsConsent>(
    () => getAnalyticsConsent(),
  );

  const analyticsConfigured = isAnalyticsConfigured();
  const t = COPY[language];

  /* Initialise GA4 baseline on mount; upgrade immediately if previously granted */
  useEffect(() => {
    initAnalytics(analyticsConsent === "granted");
    trackEvent("journey_started", { language });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Update HTML lang attribute dynamically for SEO and accessibility
  useEffect(() => {
    document.documentElement.lang = LANG_ATTR[language];
  }, [language]);

  // Screen time tracking
  useEffect(() => {
    const startTime = Date.now();
    return () => {
      const durationSeconds = Math.round((Date.now() - startTime) / 1000);
      if (durationSeconds > 0) {
        trackEvent("screen_time_spent", { screen, duration_seconds: durationSeconds });
      }
    };
  }, [screen]);

  // Flow completion tracking
  useEffect(() => {
    if (screen === "next") {
      trackEvent("flow_completed", { language });
    }
  }, [screen, language]);

  const handleConsent = (granted: boolean) => {
    if (granted && enableAnalytics()) {
      setAnalyticsConsent("granted");
      trackEvent("analytics_consent_granted", { method: "banner" });
    } else {
      disableAnalytics();
      setAnalyticsConsent("denied");
    }
  };

  useEffect(() => {
    return () => {
      abortListening();
      cancelSpeech();
    };
  }, []);

  const getVoiceErrorMessage = (err: VoiceError): string => {
    switch(err) {
      case 'unsupported': return t.voiceErrorUnsupported;
      case 'no-speech': return t.voiceErrorNoSpeech;
      case 'not-allowed': return t.voiceErrorNotAllowed;
      case 'network': return t.voiceErrorNetwork;
      default: return "";
    }
  };

  const matchService = (query: string) => {
    const q = query.toLowerCase();
    for (const s of CITIZEN_SERVICES) {
      if (s.keywords.some(k => q.includes(k.toLowerCase()))) {
        return s.id;
      }
    }
    return "income_certificate";
  };

  const submitRequest = (overrideRequest?: string) => {
    const finalRequest = (overrideRequest ?? request).trim();
    if (!finalRequest) return;
    
    if (overrideRequest) {
      setRequest(finalRequest);
    }
    
    setIsListening(false);
    stopListening();
    
    const matchedServiceId = matchService(finalRequest);
    setActiveServiceId(matchedServiceId);
    setScreen("route");
    
    trackEvent("service_request_submitted", {
      language,
      input_method: isListening ? "voice" : "typed",
      service: matchedServiceId,
    });
    
    if (isListening) {
      const sData = CITIZEN_SERVICES.find(s => s.id === matchedServiceId)?.translations[language];
      if (sData) {
        speak(`${sData.routeTitle}. ${sData.checklistHeading} ${sData.checklist.join(", ")}`, LANG_ATTR[language]);
      }
    }
  };

  const startVoiceInput = () => {
    setVoiceError(null);
    setIsListening(true);
    setRequest("");
    
    startListening(
      LANG_ATTR[language],
      (interim) => { setRequest(interim); },
      (final) => { 
        setRequest(final); 
        if (final.trim()) {
          setTimeout(() => submitRequest(final), 500);
        }
      },
      (err) => { 
        setVoiceError(err);
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      }
    );
    trackEvent("voice_input_started", { language });
  };

  /* ── Render ─────────────────────────────────────────────── */
  return (
    <div className="sewapath-app" lang={LANG_ATTR[language]}>

      {/* ── Sticky header ───────────────────────────────────── */}
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="/" aria-label="SewaPath home">
            <img src="/assets/sewapath/logo.png" alt="SewaPath" draggable={false} />
          </a>
          <div className="lang-switcher" aria-label="Choose language" role="group">
            {(Object.keys(LANG_LABELS) as Language[]).map((lang) => (
              <button
                key={lang}
                type="button"
                className={language === lang ? "lang-option active" : "lang-option"}
                aria-pressed={language === lang}
                onClick={() => {
                  setLanguage(lang);
                  setIsListening(false);
                  trackEvent("language_selected", { language: lang });
                }}
              >
                {LANG_LABELS[lang]}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ── Main ────────────────────────────────────────────── */}
      <main className="site-main">

        {/* ══ Screen 1: Listen / Search ══════════════════════ */}
        {screen === "listen" && (
          <section className="screen-listen" aria-labelledby="listen-h1">
            <div className="listen-grid">

              {/* Left column — headline + entry */}
              <div className="listen-body">
                <div className="eyebrow">{t.eyebrow1}</div>
                <h1 className="screen-h1" id="listen-h1">{t.title}</h1>
                <p className="intro-copy">{t.intro}</p>

                <div className="entry-block">

                  {/* ── PRIMARY: Text search — always visible ── */}
                  <div className="search-primary">
                    <label className="search-label" htmlFor="service-request">
                      {t.searchLabel}
                    </label>
                    <div className="search-row">
                      <input
                        id="service-request"
                        type="text"
                        className="search-input"
                        value={request}
                        onChange={(e) => setRequest(e.target.value)}
                        placeholder={t.searchPlaceholder}
                        autoComplete="off"
                        onKeyDown={(e) => e.key === "Enter" && submitRequest()}
                        aria-label={t.searchLabel}
                      />
                    </div>
                    <button
                      type="button"
                      className="search-submit"
                      onClick={() => submitRequest()}
                      disabled={!request.trim()}
                    >
                      {t.searchSubmit}
                      <ChevronRightIcon width={18} height={18} aria-hidden />
                    </button>
                  </div>

                  {/* ── Divider ── */}
                  <div className="or-divider" aria-hidden="true">
                    <span>{t.orSpeak}</span>
                  </div>

                  {/* ── SECONDARY: Voice — clearly labelled action ── */}
                  <div className="voice-section" aria-live="polite">
                    <button
                      type="button"
                      className={isListening ? "voice-speak-btn listening" : "voice-speak-btn"}
                      aria-label={isListening ? t.listeningNote : t.speakBtnLabel}
                      onClick={() => {
                        if (isListening) {
                          stopListening();
                          submitRequest();
                        } else {
                          startVoiceInput();
                        }
                      }}
                    >
                      <SpeakerLoudIcon width={22} height={22} aria-hidden />
                      <span>
                        {isListening ? t.listeningNote : t.speakBtnLabel}
                      </span>
                      {isListening && <span className="speak-pulse-dot" aria-hidden />}
                    </button>
                    {!isListening && (
                      <p className="speak-subtext">
                        {voiceError ? (
                          <span className="voice-error">{getVoiceErrorMessage(voiceError)}</span>
                        ) : (
                          t.speakSubtext
                        )}
                      </p>
                    )}
                  </div>
                  {/* ── Services Pills ── */}
                  <div className="services-pills" aria-label="Available Services">
                    {CITIZEN_SERVICES.map(service => (
                      <button
                        key={service.id}
                        type="button"
                        className="service-pill"
                        onClick={() => {
                          setRequest(service.translations[language].routeTitle);
                          setActiveServiceId(service.id);
                          setScreen("route");
                          trackEvent("service_pill_clicked", { service: service.id });
                        }}
                      >
                        {service.translations[language].routeTitle}
                      </button>
                    ))}
                  </div>

                  {/* ── Privacy note ── */}
                  <p className="privacy-note">
                    <LockClosedIcon width={14} height={14} aria-hidden />
                    <span>{t.privacy}</span>
                  </p>
                </div>
              </div>

              {/* Right column — illustration */}
              <div className="listen-visual" aria-hidden="true">
                <img
                  className="hero-illustration"
                  src="/assets/sewapath/maharashtra-journey.png"
                  alt=""
                  draggable={false}
                />
              </div>
            </div>
          </section>
        )}

        {/* ══ Screen 2: Route ════════════════════════════════ */}
        {screen === "route" && (() => {
          const activeService = CITIZEN_SERVICES.find(s => s.id === activeServiceId);
          const serviceData = activeService?.translations[language];
          
          return (
          <section className="screen-route" aria-labelledby="route-h1">
            <div className="route-inner">

              <button
                type="button"
                className="back-btn"
                onClick={() => setScreen("listen")}
              >
                {t.back}
              </button>

              <div className="eyebrow">{t.eyebrow2}</div>
              <h1 className="screen-h1" id="route-h1">{serviceData?.routeTitle || t.fallbackRouteTitle}</h1>

              {/* What the user asked for */}
              <div className="understood-card">
                <span className="uc-label">{t.heard}</span>
                <strong>{request || (serviceData?.checklist.join(", ") || "")}</strong>
              </div>

              {/* Preparation checklist — static, not interactive */}
              <p className="checklist-heading">{serviceData?.checklistHeading || t.fallbackChecklistHeading}</p>
              <ul className="checklist-static" aria-label={serviceData?.checklistHeading || t.fallbackChecklistHeading}>
                {(serviceData?.checklist || []).map((item, i) => (
                  <li key={item} className="checklist-item">
                    <span className="check-mark" aria-hidden="true">✓</span>
                    <div className="check-content">
                      <strong className="check-name">{item}</strong>
                      {serviceData?.checklistHints[i] && (
                        <span className="check-hint">{serviceData?.checklistHints[i]}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {/* Verification notice */}
              <aside className="verification-card" aria-label="Official information check">
                <strong>{t.verifyTitle}</strong>
                <p>{t.verifyBody}</p>
                <a
                  href={OFFICIAL_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    trackEvent("official_source_check_clicked", {
                      service: activeServiceId,
                    })
                  }
                >
                  {t.verifyLink}
                </a>
              </aside>

              {serviceData?.citation && (
                <div className="trust-citation" style={{marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--sewa-muted)', textAlign: 'center'}}>
                  <LockClosedIcon style={{marginRight: 4, verticalAlign: 'text-bottom'}} />
                  {serviceData.citation}
                </div>
              )}

              {/* Primary CTA — open official portal */}
              <a
                className="official-cta"
                href={OFFICIAL_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  trackEvent("official_portal_clicked", {
                    service: activeServiceId,
                  });
                  setScreen("next");
                }}
              >
                <span className="cta-main">{t.official}</span>
                <span className="cta-sub">{t.externalNote}</span>
                <ChevronRightIcon width={20} height={20} aria-hidden className="cta-arrow" />
              </a>

              {/* Secondary — report friction */}
              <button
                type="button"
                className="stuck-btn"
                onClick={() => {
                  setFrictionSubmitted(false);
                  setScreen("friction");
                  trackEvent("friction_prompt_opened", { language });
                }}
              >
                {t.stuckBtnLabel}
              </button>

              <p className="route-safety">{t.safety}</p>
            </div>
          </section>
          );
        })()}

        {/* ══ Screen 3: Next steps ═══════════════════════════ */}
        {screen === "next" && (
          <section className="screen-next" aria-labelledby="next-h1">
            <div className="route-inner">
              <button type="button" className="back-btn" onClick={() => setScreen("route")}>
                {t.back}
              </button>
              <div className="eyebrow">{t.eyebrow3}</div>
              <h1 className="screen-h1" id="next-h1">{t.nextTitle}</h1>
              <p className="intro-copy">{t.nextBody}</p>

              <aside className="verification-card" aria-label="Official information check">
                <strong>{t.verifyTitle}</strong>
                <p>{t.verifyBody}</p>
                <a
                  href={OFFICIAL_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    trackEvent("official_source_check_clicked", {
                      service: activeServiceId,
                    })
                  }
                >
                  {t.verifyLink}
                </a>
              </aside>

              <ul className="checklist-static" aria-label={t.nextTitle}>
                {t.nextChecklist.map((item) => (
                  <li key={item} className="checklist-item">
                    <span className="check-mark" aria-hidden="true">✓</span>
                    <div className="check-content">
                      <strong className="check-name">{item}</strong>
                    </div>
                  </li>
                ))}
              </ul>

              <a
                className="official-cta"
                href={OFFICIAL_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackEvent("official_portal_reopened", {
                    service: "income_certificate_maharashtra",
                  })
                }
              >
                <span className="cta-main">{t.nextOfficial}</span>
                <span className="cta-sub">{t.externalNote}</span>
                <ChevronRightIcon width={20} height={20} aria-hidden className="cta-arrow" />
              </a>

              {/* Satisfaction Tracking */}
              <div className="satisfaction-card" aria-live="polite">
                {satisfactionSubmitted ? (
                  <p className="satisfaction-thanks">{t.satisfactionThanks}</p>
                ) : (
                  <>
                    <p className="satisfaction-question">{t.satisfactionQuestion}</p>
                    <div className="satisfaction-buttons">
                      <button
                        type="button"
                        className="satisfaction-btn"
                        onClick={() => {
                          setSatisfactionSubmitted(true);
                          trackEvent("task_satisfaction", { rating: "yes", language });
                        }}
                      >
                        👍 {t.satisfactionYes}
                      </button>
                      <button
                        type="button"
                        className="satisfaction-btn"
                        onClick={() => {
                          setSatisfactionSubmitted(true);
                          trackEvent("task_satisfaction", { rating: "no", language });
                        }}
                      >
                        👎 {t.satisfactionNo}
                      </button>
                    </div>
                  </>
                )}
              </div>

              <button
                type="button"
                className="stuck-btn outline"
                style={{ marginTop: "12px" }}
                onClick={() => {
                  setRequest("");
                  setScreen("listen");
                  setSatisfactionSubmitted(false); // Reset satisfaction on restart
                  trackEvent("journey_restarted", { language });
                }}
              >
                {t.nextRestart}
              </button>
            </div>
          </section>
        )}

        {/* ══ Screen 4: Friction ═════════════════════════════ */}
        {screen === "friction" && (
          <section className="screen-friction" aria-labelledby="friction-h1">
            <div className="route-inner">
              <button type="button" className="back-btn" onClick={() => setScreen("route")}>
                {t.frictionBack}
              </button>
              <div className="eyebrow">{t.eyebrow4}</div>
              <h1 className="screen-h1" id="friction-h1">{t.frictionTitle}</h1>
              <p className="intro-copy">{t.frictionBody}</p>

              {frictionSubmitted ? (
                <div className="submitted-card" role="status">
                  <span className="submitted-check" aria-hidden="true">✓</span>
                  <strong>{t.frictionSubmitted}</strong>
                </div>
              ) : (
                <div className="friction-options" role="list">
                  {t.frictionOptions.map((option) => (
                    <button
                      key={option.reason}
                      type="button"
                      className="friction-option"
                      role="listitem"
                      onClick={() => {
                        setFrictionSubmitted(true);
                        trackEvent("friction_feedback_selected", {
                          language,
                          friction_reason: option.reason,
                        });
                      }}
                    >
                      <span className="friction-icon" aria-hidden="true">{option.icon}</span>
                      <span className="friction-label">{option.label}</span>
                      <ChevronRightIcon width={14} height={14} aria-hidden className="friction-arrow" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="site-footer">
        <div className="footer-inner">
          <p className="footer-disclosure">{t.footerDisclosure}</p>
          <nav className="footer-nav" aria-label="SewaPath disclosures">
            <a href="/purpose/">{t.purposeLabel}</a>
            <a href="/privacy/">{t.privacyLabel}</a>
            <a href="/safety/">{t.safetyLabel}</a>
            <a href="/accessibility/">{t.accessibilityLabel}</a>
          </nav>
          <p className="footer-report">
            <a href="mailto:vikassahani17@gmail.com">{t.reportLabel}</a>
          </p>
        </div>
      </footer>

      {/* ── Precision-tracking consent bar ──────────────────── */}
      {analyticsConfigured && analyticsConsent === "unknown" && (
        <aside className="consent-bar" aria-label="Analytics choice" role="complementary">
          <div className="consent-bar-text">
            <strong>{t.consentPrompt}</strong>
            <p>{t.consentDetail}</p>
          </div>
          <div className="consent-bar-actions">
            <button type="button" className="consent-allow" onClick={() => handleConsent(true)}>
              {t.consentAllow}
            </button>
            <button type="button" className="consent-deny" onClick={() => handleConsent(false)}>
              {t.consentDeny}
            </button>
          </div>
        </aside>
      )}
    </div>
  );
}
