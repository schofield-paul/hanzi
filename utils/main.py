from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pinyin_jyutping

# Initialize FastAPI app
app = FastAPI()

# Initialize the PinyinJyutping object
p = pinyin_jyutping.PinyinJyutping()

# Define the request body using Pydantic
class TranslationRequest(BaseModel):
    text: str
    tone_numbers: bool = False
    spaces: bool = False

@app.post("/translate")
async def translate_to_pinyin(request: TranslationRequest):
    try:
        # Use the input options to perform the translation
        pinyin_result = p.pinyin(
            request.text, 
            tone_numbers=request.tone_numbers, 
            spaces=request.spaces
        )
        
        # Return the translated text as a JSON response
        return {"pinyin": pinyin_result}
    except Exception as e:
        # Handle any errors that might occur
        raise HTTPException(status_code=500, detail=f"Translation Error: {str(e)}")

