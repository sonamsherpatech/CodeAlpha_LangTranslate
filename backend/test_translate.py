from deep_translator import GoogleTranslator

translator = GoogleTranslator(source='auto', target='fr')
result = translator.translate("Hello, How are you?")
print("Translation Result:",result)