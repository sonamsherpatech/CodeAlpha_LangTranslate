from pydantic import BaseModel, Field
from typing import Dict, Optional

class TranslationRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=5000, description="The text to translate")
    source_lang: str = Field(default="auto", description="Source language code (e.g., 'en', 'fr', 'es', 'np', 'auto')")
    target_lang: str = Field(..., min_length=2, description="Target language code (e.g., 'fr', 'de', 'es', 'np')")

class TranslationResponse(BaseModel):
    original_text: str
    translated_text: str
    source_lang: str
    target_lang: str

class LanguageResponse(BaseModel):
    languages: Dict[str, str]