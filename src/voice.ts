/**
 * Voice STT & TTS Service
 * 
 * Uses the Web Speech API (SpeechRecognition for STT, SpeechSynthesis for TTS).
 * Privacy Note: Chrome's STT implementation sends audio to Google's cloud servers.
 * We receive only the transcribed text string. We do not process or store the raw audio.
 * TTS is handled entirely on-device.
 */

// Define Web Speech API types for TypeScript
interface SpeechRecognitionErrorEvent extends Event {
  error: 'no-speech' | 'aborted' | 'audio-capture' | 'network' | 'not-allowed' | 'service-not-allowed' | 'bad-grammar' | 'language-not-supported';
  message: string;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
}

declare global {
  interface Window {
    SpeechRecognition?: { new(): SpeechRecognition };
    webkitSpeechRecognition?: { new(): SpeechRecognition };
  }
}

export type VoiceState = 'idle' | 'listening' | 'processing' | 'error';
export type VoiceError = 'unsupported' | 'no-speech' | 'not-allowed' | 'network' | 'aborted' | 'unknown' | null;

let recognitionInstance: SpeechRecognition | null = null;

export function isSTTSupported(): boolean {
  return typeof window !== 'undefined' && !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}

export function isTTSSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function startListening(
  language: string,
  onInterim: (text: string) => void,
  onFinal: (text: string) => void,
  onError: (error: VoiceError) => void,
  onEnd: () => void
): void {
  if (!isSTTSupported()) {
    onError('unsupported');
    return;
  }

  const SpeechRecognitionConstructor = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognitionConstructor) return;

  recognitionInstance = new SpeechRecognitionConstructor();
  recognitionInstance.continuous = false; // single utterance
  recognitionInstance.interimResults = true;
  recognitionInstance.lang = language;

  let finalTranscript = '';

  recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
    let interimTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }
    
    if (interimTranscript) {
      onInterim(interimTranscript);
    }
    if (finalTranscript) {
      onFinal(finalTranscript);
    }
  };

  recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
    console.error('Speech recognition error:', event.error, event.message);
    if (event.error === 'no-speech') onError('no-speech');
    else if (event.error === 'not-allowed' || event.error === 'audio-capture') onError('not-allowed');
    else if (event.error === 'network') onError('network');
    else if (event.error === 'aborted') onError('aborted');
    else onError('unknown');
  };

  recognitionInstance.onend = () => {
    onEnd();
  };

  try {
    recognitionInstance.start();
  } catch (err) {
    console.error('Failed to start speech recognition:', err);
    onError('unknown');
  }
}

export function stopListening(): void {
  if (recognitionInstance) {
    try {
      recognitionInstance.stop();
    } catch (e) {
      console.warn("Error stopping recognition", e);
    }
  }
}

export function abortListening(): void {
  if (recognitionInstance) {
    try {
      recognitionInstance.abort();
    } catch (e) {
      console.warn("Error aborting recognition", e);
    }
  }
}

let currentUtterance: SpeechSynthesisUtterance | null = null;

export function speak(text: string, language: string, onEnd?: () => void): void {
  if (!isTTSSupported()) return;
  
  cancelSpeech(); // Cancel any ongoing speech

  currentUtterance = new SpeechSynthesisUtterance(text);
  currentUtterance.lang = language;
  
  if (onEnd) {
    currentUtterance.onend = () => {
      onEnd();
      currentUtterance = null;
    };
  }

  window.speechSynthesis.speak(currentUtterance);
}

export function cancelSpeech(): void {
  if (!isTTSSupported()) return;
  window.speechSynthesis.cancel();
  currentUtterance = null;
}
