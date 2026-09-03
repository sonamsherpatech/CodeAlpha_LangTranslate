"use client"

import { fetchLanguage, translateText } from "@/services/api";
import { ArrowRightLeft, Check, Copy, Languages, Loader2, Volume2, X } from "lucide-react";
import { useEffect, useState } from "react"

export default function Home() {
    const [languages, setLanguages] = useState<Record<string, string>>({});
    const [sourceLang, setSourceLang] = useState<string>("auto");
    const [targetLang, setTargetLang] = useState<string>("es");
    const [inputText, setInputText] = useState<string>("");
    const [translatedText, setTranslatedText] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [copiedSource, setCopiedSource] = useState<boolean>(false);
    const [copiedTarget, setCopiedTarget] = useState<boolean>(false);

    // Fetch supported languages on mount
    useEffect(() => {
        async function loadLanguages() {
            try {
                const langData = await fetchLanguage();
                setLanguages(langData);
            } catch (err) {
                console.error(err);
                setError("Failed to load languages. Please ensure backend is running");
            }
        }
        loadLanguages();
    }, []);

    // Handle translation
    const handleTranslate = async () => {
        if (!inputText.trim()) {
            setTranslatedText("");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await translateText({
                text: inputText,
                source_lang: sourceLang,
                target_lang: targetLang,
            });
            setTranslatedText(response.translated_text);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occured during translation.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Swap Languages
    const handleSwap = () => {
        if (sourceLang === "auto") return;

        const prevSource = sourceLang;
        const prevTarget = targetLang;
        setSourceLang(prevTarget);
        setTargetLang(prevSource);
        setInputText(translatedText);
        setTranslatedText(inputText);
    }

    // Copy helpers
    const copyToClipboard = (text: string, isSource: boolean) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        if (isSource) {
            setCopiedSource(true);
            setTimeout(() => setCopiedSource(false), 2000);
        } else {
            setCopiedTarget(true);
            setTimeout(() => setCopiedTarget(false), 2000);
        }
    }

    // Text to Speech
    const speakText = (text: string, langCode: string) => {
        if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        if (langCode !== "auto") {
            utterance.lang = langCode;
        }
        window.speechSynthesis.speak(utterance);
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-blue-50/40 text-slate-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <header className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-black-700 text-xs sm:text-sm font-semibold mb-3 shadow-xs">
                        LangTranslate
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
                        Universal Language Translator
                    </h1>
                    <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
                        Seamlessly translate text across 100+ languages in real time with high accuracy.
                    </p>
                </header>

                {/* Error Notification */}
                {error && (
                    <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center justify-between shadow-xs">
                        <span className="font-medium">{error}</span>
                        <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700 p-1">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {/* Main Card */}
                <div className="bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-5 sm:p-8 shadow-xl shadow-slate-200/60">
                    {/* Controls Bar */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-100">
                        {/* Source Language Select */}
                        <div className="w-full sm:w-5/12 flex items-center gap-2">
                            <select
                                value={sourceLang}
                                onChange={(e) => setSourceLang(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-300 hover:border-slate-400 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-
  500 focus:bg-white transition-all capitalize cursor-pointer shadow-xs"
                            >
                                <option value="auto">Auto Detect Language</option>
                                {Object.entries(languages).map(([name, code]) => (
                                    <option key={`src-${code}-${name}`} value={code}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Swap Button */}
                        <button
                            onClick={handleSwap}
                            disabled={sourceLang === "auto"}
                            title={sourceLang === "auto" ? "Cannot swap with Auto Detect" : "Swap Languages"}
                            className="p-2.5 rounded-full bg-slate-100 hover:bg-red-50 border border-slate-200 hover:border-red-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-slate-600
  hover:text-red-600 cursor-pointer shadow-xs"
                        >
                            <ArrowRightLeft className="w-4 h-4" />
                        </button>

                        {/* Target Language Select */}
                        <div className="w-full sm:w-5/12 flex items-center gap-2">
                            <select
                                value={targetLang}
                                onChange={(e) => setTargetLang(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-300 hover:border-slate-400 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-
  500 focus:bg-white transition-all capitalize cursor-pointer shadow-xs"
                            >
                                {Object.entries(languages).map(([name, code]) => (
                                    <option key={`tgt-${code}-${name}`} value={code}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Translation Workspaces */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                        {/* Input Box */}
                        <div className="flex flex-col bg-slate-50/70 border border-slate-200 rounded-2xl p-4 min-h-[280px] focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-100 transition-
  all">
                            <textarea
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Type or paste text to translate..."
                                maxLength={5000}
                                className="w-full flex-grow bg-transparent resize-none border-none outline-none text-slate-800 placeholder-slate-400 text-base leading-relaxed"
                            />
                            <div className="flex items-center justify-between pt-3 border-t border-slate-200/80 mt-2">
                                <div className="flex items-center gap-1">
                                    {inputText && (
                                        <>
                                            <button
                                                onClick={() => speakText(inputText, sourceLang)}
                                                title="Listen"
                                                className="p-2 rounded-lg hover:bg-slate-200/70 text-slate-500 hover:text-slate-800 transition"
                                            >
                                                <Volume2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => copyToClipboard(inputText, true)}
                                                title="Copy"
                                                className="p-2 rounded-lg hover:bg-slate-200/70 text-slate-500 hover:text-slate-800 transition"
                                            >
                                                {copiedSource ? (
                                                    <Check className="w-4 h-4 text-emerald-600" />
                                                ) : (
                                                    <Copy className="w-4 h-4" />
                                                )}
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setInputText("");
                                                    setTranslatedText("");
                                                }}
                                                title="Clear"
                                                className="p-2 rounded-lg hover:bg-slate-200/70 text-slate-500 hover:text-slate-800 transition"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </>
                                    )}
                                </div>
                                <span className="text-xs text-slate-400 font-mono">
                                    {inputText.length} / 5000
                                </span>
                            </div>
                        </div>

                        {/* Output Box */}
                        <div className="flex flex-col bg-red-50/30 border border-red-100 rounded-2xl p-4 min-h-[280px] relative">
                            {isLoading && (
                                <div className="absolute inset-0 bg-white/80 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center gap-2 z-10">
                                    <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
                                    <span className="text-xs font-semibold text-red-700">Translating text...</span>
                                </div>
                            )}
                            <textarea
                                readOnly
                                value={translatedText}
                                placeholder="Translation will appear here..."
                                className="w-full grow bg-transparent resize-none border-none outline-none text-slate-800 placeholder-slate-400 text-base leading-relaxed cursor-text"
                            />
                            <div className="flex items-center justify-between pt-3 border-t border-red-100 mt-2">
                                <div className="flex items-center gap-1">
                                    {translatedText && (
                                        <>
                                            <button
                                                onClick={() => speakText(translatedText, targetLang)}
                                                title="Listen"
                                                className="p-2 rounded-lg hover:bg-red-100/60 text-slate-600 hover:text-slate-900 transition"
                                            >
                                                <Volume2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => copyToClipboard(translatedText, false)}
                                                title="Copy Translation"
                                                className="p-2 rounded-lg hover:bg-red-100/60 text-slate-600 hover:text-slate-900 transition"
                                            >
                                                {copiedTarget ? (
                                                    <Check className="w-4 h-4 text-emerald-600" />
                                                ) : (
                                                    <Copy className="w-4 h-4" />
                                                )}
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handleTranslate}
                            disabled={isLoading || !inputText.trim()}
                            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" /> Translating...
                                </>
                            ) : (
                                <>
                                    Translate
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )


}