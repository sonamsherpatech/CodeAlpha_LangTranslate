const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export interface TranslationRequest {
    text: string;
    source_lang: string;
    target_lang: string;
}

export interface TranslationResponse {
    original_text: string;
    translated_text: string;
    source_lang: string;
    target_lang: string;
}

export interface LangugageResponse {
    languages: Record<string, string>;
}

export async function fetchLanguage(): Promise<Record<string, string>> {
    const res = await fetch(`${API_BASE_URL}/languages`);
    if(!res.ok) {
        throw new Error(`Failed to fetch languages: ${res.statusText}`);
    }
    const data: LangugageResponse = await res.json();
    return data.languages;
}

export async function translateText(payload: TranslationRequest): Promise<TranslationResponse> {
    const res = await fetch(`${API_BASE_URL}/translate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if(!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "Translation request failed");
    }

    return res.json();
}