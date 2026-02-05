
from fastapi import Depends, HTTPException, status, APIRouter
from fastapi.security.http import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from jose import jwt, JWTError
import os
import requests
import json

router = APIRouter(prefix="/mallassistant/api/chatbot", tags=["Chatbot"])
SECRET_KEY = os.getenv("SECRET_KEY") 
security = HTTPBearer()
RAG_URL = "http://localhost:8001"

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    print('verify_token')
    print(credentials)
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        print(payload)
        return payload  # you can return user info
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

mall_shops = [
    {"name": "Food Corner", "category": "food", "price_range": (100, 500), "location": "1st Floor"},
    {"name": "ElectroMart", "category": "electronics", "price_range": (500, 5000), "location": "2nd Floor"},
    {"name": "Fashion Hub", "category": "clothing", "price_range": (300, 2000), "location": "1st Floor"},
]


class ChatRequest(BaseModel):
    query: str  

@router.post("/ask")
def ask_bot(request: ChatRequest, user=Depends(verify_token)):
    # Placeholder logic
    print('request')
    print(request)
    # q = request.query.lower()

    payload = {"sender": user["sub"], "message": request.query}
    try:
        # rasa_url = "http://localhost:5005/webhooks/rest/webhook"
        # res = requests.post(rasa_url, json=payload)
        res = requests.post(f"{RAG_URL}/completions", json=payload, timeout=60)
        res.raise_for_status()
        print(res)
        messages = res.text
        print(messages)
        return {"response": messages or "Sorry, I couldn't find an answer."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error connecting to Rasa: {str(e)}")

    # Simple rule-based responses
    # if "food" in q and "under" in q:
    #     try:
    #         max_price = int("".join([c for c in q if c.isdigit()]))
    #         matches = [shop for shop in mall_shops if shop["category"]=="food" and shop["price_range"][1] <= max_price]
    #         if matches:
    #             return {"response": f"You can find meals under ₹{max_price} at {matches[0]['name']} on {matches[0]['location']}"}
    #         else:
    #             return {"response": f"No food shops found under ₹{max_price}."}
    #     except:
    #         return {"response": "I couldn't understand the price."}

    # elif "where" in q and "shop" in q:
    #     for shop in mall_shops:
    #         if shop["name"].lower() in q:
    #             return {"response": f"{shop['name']} is located at {shop['location']}"}
    #     return {"response": "Shop not found."}

    # else:
    #     return {"response": "I'm here to help! You can ask me about shops, offers, prices, or locations."}
