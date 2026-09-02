from deep_translator import GoogleTranslator
from typing import Dict
import logging

logger = logging.getLogger(__name__)

class TranslationService:
    @staticmethod
    def get_supported_language() -> Dict[str, str]:
        """
        Returns a dictnoary of supported languages: { 'language_name': 'language_code' }
        """
        try:
            return GoogleTranslator().get_supported_languages(as_dict=True)
        except Exception as e:
            logger.error(f"Error fetching supported languages: {e}")
            raise RuntimeError("Failed to retrieve supported languages.")

    @staticmethod
    def translate_text(text: str, source_lang: str, target_lang: str) -> str:
        """
        Translate text from source_lang to target_lang.
        """
        try:
            # Hangle empty/whitespace string
            if not text.strip():
                return ""

            translator = GoogleTranslator(source=source_lang, target=target_lang)
            translated = translator.translate(text)
            return translated
        except Exception as e:
            logger.error(f"Translated failed: {e}")
            raise RuntimeError(f"Translation error: {str(e)}")

    