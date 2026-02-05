from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from app import models, schemas
from app.database import get_db
from sqlalchemy.orm import Session
from fastapi import Depends
from typing import Any, Text, Dict, List
import subprocess
import logging
import requests
from app.schemas  import GenerationResponse

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("LLM")

LLAMA_BINARY = "/Users/sudheeshpillai/Documents/Projects/MallAssistant/llama.cpp/build/bin/llama-cli"
GGUF_MODEL = "/Users/sudheeshpillai/Documents/Projects/MallAssistant/phi3_service/models/phi-3-mini.Q4_K_M.gguf"
SYSTEM_PROMPT = """You are a helpful mall assistant. Answer questions about stores, products, prices, offers, and navigation inside the mall.
Use any database information provided to generate concise, accurate, and friendly responses."""
LLM_SERVER_URL = "http://localhost:9000/v1"
RAG_URL = "http://localhost:8001"


class ActionFindFood(Action):
    def name(self) -> str:
        return "action_find_food"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: dict):
        dispatcher.utter_message(text="You can find meals under ₹500 at Shop 1 in the food court.")
        return []

class ActionFindStore(Action):
    def name(self) -> str:
        return "action_find_store"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: dict):
        dispatcher.utter_message(text="You can find the store on the second floor near the escalator.")
        return []

class ActionAskOffers(Action):
    def name(self) -> str:
        return "action_ask_offers"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: dict):
        dispatcher.utter_message(text="Here are the current offers: 20% off on electronics, 15% off on fashion.")
        return []
    
class ActionOffers(Action):
    def name(self) -> str:
        return "action_offers"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: dict):
        
        db = next(get_db())
        print(db)
        db_shop = db.query(models.Shop).all()
        print("db_shop ===>")
        print(db_shop)
    
        if db_shop:
            response = "; ".join([f"{r.name}: {r.offers}" for r in db_shop])
            dispatcher.utter_message(text=f"Current offers: {response}")
        else:
            dispatcher.utter_message(text="No offers available at the moment.")
        return []

class ActionCategoryQuery(Action):
    def name(self) -> str:
        return "action_category_query"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: dict):
        
        db = next(get_db())
        print(db)
        category = next(tracker.get_latest_entity_values("category"), None)
        if category:
            db_shop = db.query(models.Shop).all()
            print("db_shop ===>")
            print(db_shop)
            if db_shop:
                response = ", ".join([f"{r.name} (Floor {r.floor})" for r in db_shop])
                dispatcher.utter_message(text=f"{category.title()} stores: {response}")
            else:
                dispatcher.utter_message(text=f"No stores found for {category}")
        else:
            dispatcher.utter_message(text="Please specify the category (e.g., electronics, food).")
        return []

class ActionQueryMallDBDynamic(Action):
    def name(self) -> Text:
        return "action_query_mall_db_dynamic"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        user_message = tracker.latest_message.get("text")
        entities = tracker.latest_message.get("entities", [])

        filters = []
        db = next(get_db())
        

        # Parse entities dynamically
        for ent in entities:
            if ent['entity'] == 'category':
                filters.append(models.Shop.category.ilike(f"%{ent['value']}%"))
            elif ent['entity'] == 'price':
                try:
                    price_limit = int(ent['value'])
                    filters.append(models.Shop.max_price <= price_limit)  
                except ValueError:
                    continue
            elif ent['entity'] == 'location':
                filters.append(models.Shop.floor.ilike(f"%{ent['value']}%"))

        # Query DBdb.query(models.Shop).all()

        if filters:
            results = db.query(models.Shop).filter(*filters).all()
        else:
            results = db.query(models.Shop).all()

        if results:
            shop_info = ", ".join([f"{shop.name} at floor {shop.floor}, minimum price of ₹{shop.min_price} and max price of₹{shop.max_price} and offers {shop.offers}" for shop in results])
            prompt = f"{user_message}\nAvailable options: {shop_info}"
        else:
            prompt = "No matching shops found."

        # Generate response
        # response_text = persistent_llm.query(prompt, user_message)
        response_text = requests.post(f"{RAG_URL}/completions", json={"message": user_message}, timeout=60)
        print(response_text.json())
        dispatcher.utter_message(text=response_text.json())
        return []
    
class PersistentLLM:
    def __init__(self, LLAMA_BINARY, GGUF_MODEL, system_prompt=""):
        self.LLAMA_BINARY = LLAMA_BINARY
        self.GGUF_MODEL = GGUF_MODEL
        self.system_prompt = system_prompt
        self.conversation_history = []

    def query(self, prompt_text, question, timeout=5.0):
        

        try:
            full_prompt = self.system_prompt + "\n" + prompt_text
            # formatted_prompt = f"<|user|>{full_prompt}<|end|><|assistant|>"
            # print(formatted_prompt)
            
            payload = {
                "model": "",
                "messages": [
                    {
                    "role": "system",
                    "content": full_prompt
                    },
                    {
                    "role": "user",
                    "content": question
                    }
                ]
            }
            headers = {"Content-Type": "application/json"}
        
            response = requests.post(f"{LLM_SERVER_URL}/chat/completions", json=payload, headers=headers)
            response.raise_for_status()  # Will raise an exception for bad status codes
            
            completion = response.json()
            print('Completion=>')
            print(completion)
            return completion["choices"][0]['message']['content']
            # result = subprocess.run(
            #     [
            #         self.LLAMA_BINARY,
            #         "-m", self.GGUF_MODEL,
            #         "--n_predict", "100",
            #         "--temp", "0.7",
            #         "--top_k", "40",
            #         "--top_p", "0.9",
            #         "--threads", "4",
            #         "--prompt", full_prompt,
            #         "--no-conversation"
            #     ],
            #     capture_output=True,
            #     text=True,
            #     timeout=60
            # )
            # stdout_output = result.stdout.strip()
            # stderr_output = result.stderr.strip()

            # # Log outputs
            # logger.info("=== Phi-3-mini stdout ===\n%s\n=====================", stdout_output)
            # if stderr_output:
            #     logger.warning("=== Phi-3-mini stderr ===\n%s\n=====================", stderr_output)

            # output = result.stdout.strip()
            # print('output ==> ')
            # print(output)
            # if not output:
            #     return "Sorry, I could not generate a response."    
            # return output
        except subprocess.TimeoutExpired:
            return "Sorry, the assistant took too long to respond."
        except Exception as e:
            return f"Error: {str(e)}"
          

persistent_llm = PersistentLLM(LLAMA_BINARY, GGUF_MODEL, SYSTEM_PROMPT)

