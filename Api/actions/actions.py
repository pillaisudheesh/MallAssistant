from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

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
