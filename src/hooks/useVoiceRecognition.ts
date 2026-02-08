import { useState, useEffect, useCallback, useRef } from 'react';

export interface VoiceRecognitionState {
    isListening: boolean;
    transcript: string;
    error: string | null;
    isSupported: boolean;
}

// Type definitions for Web Speech API
interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
    resultIndex: number;
}

interface SpeechRecognitionResultList {
    length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
    isFinal: boolean;
    [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
    error: string;
    message: string;
}

interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start(): void;
    stop(): void;
    abort(): void;
    onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
    onend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
    onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
}

declare global {
    interface Window {
        SpeechRecognition: {
            new(): SpeechRecognition;
        };
        webkitSpeechRecognition: {
            new(): SpeechRecognition;
        };
    }
}

export const useVoiceRecognition = () => {
    const [state, setState] = useState<VoiceRecognitionState>({
        isListening: false,
        transcript: '',
        error: null,
        isSupported: 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window,
    });

    const recognitionRef = useRef<SpeechRecognition | null>(null);

    useEffect(() => {
        if (!state.isSupported) return;

        const SpeechRecognitionConstructor = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognitionConstructor();

        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            setState(prev => ({ ...prev, isListening: true, error: null }));
        };

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            let transcript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                transcript += event.results[i][0].transcript;
            }
            setState(prev => ({ ...prev, transcript }));
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            let errorMessage = 'An error occurred with voice recognition.';

            switch (event.error) {
                case 'no-speech':
                    errorMessage = 'No speech detected. Please try again.';
                    break;
                case 'audio-capture':
                    errorMessage = 'Microphone not accessible. Check permissions.';
                    break;
                case 'not-allowed':
                    errorMessage = 'Microphone access denied. Enable in browser settings.';
                    break;
                case 'network':
                    errorMessage = 'Network error. Check your connection.';
                    break;
                case 'aborted':
                    errorMessage = 'Listening stopped.';
                    break;
                default:
                    errorMessage = `Error: ${event.error}`;
            }

            setState(prev => ({ ...prev, isListening: false, error: errorMessage }));
        };

        recognition.onend = () => {
            setState(prev => ({ ...prev, isListening: false }));
        };

        recognitionRef.current = recognition;

        return () => {
            // Cleanup not strictly necessary for single instance but good practice
            if (state.isListening) {
                recognition.stop();
            }
        };
    }, [state.isSupported, state.isListening]);

    const startListening = useCallback(() => {
        if (recognitionRef.current && !state.isListening) {
            try {
                recognitionRef.current.start();
            } catch (e) {
                console.error("Failed to start recognition:", e);
                // Handle case where it might already be started or specialized browser quirk
            }
        }
    }, [state.isListening]);

    const stopListening = useCallback(() => {
        if (recognitionRef.current && state.isListening) {
            recognitionRef.current.stop();
        }
    }, [state.isListening]);

    const resetTranscript = useCallback(() => {
        setState(prev => ({ ...prev, transcript: '', error: null }));
    }, []);

    return {
        ...state,
        startListening,
        stopListening,
        resetTranscript
    };
};
