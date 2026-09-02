from fastapi import APIRouter, HTTPException, status
from app.schemas.translation import TranslationRequest, TranslationResponse, LanguageResponse
from app.services.translator import TranslationService

router = APIRouter()

@router.get("/health", tags=["Health"])
def health_check():
    return {"status": "healthy", "service": "Language Translation API"}

@router.get("/languages", response_model=LanguageResponse, tags=["Translation"])
def get_languages():
    """
    Returns all supported languages for the UI dropdowns
    """
    try:
        languages = TranslationService.get_supported_language()
        return LanguageResponse(languages=languages)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.post("/translate", response_model=TranslationResponse, tags=["Translation"])
def translate(request: TranslationRequest):
    """
    Translate input text to the target language.
    """
    try:
        translated_text = TranslationService.translate_text(
            text=request.text,
            source_lang=request.source_lang,
            target_lang=request.target_lang
        )
        return TranslationResponse(
            original_text=request.text,
            translated_text=translated_text,
            source_lang=request.source_lang,
            target_lang=request.target_lang
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

