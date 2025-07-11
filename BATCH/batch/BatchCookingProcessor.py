import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

from collections import defaultdict
from typing import List, Dict, Any
import json
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Charger les variables d'environnement
load_dotenv()

# Connexion à MongoDB (via URI sécurisée dans .env)
MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB = os.getenv("MONGO_DB")
MONGO_COLLECTION = os.getenv("MONGO_COLLECTION")

client = MongoClient(MONGO_URI)
db = client[MONGO_DB]
collection = db[MONGO_COLLECTION]

CATEGORY_ACTION_ORDER = {
    "éplucher": 0,
    "laver": 1,
    "couper": 2,
    "cuire": 3,
    "ajouter": 4,
    "mélanger": 5,
    "assaisonner": 6
}

MUTUALIZED_ACTIONS = {"éplucher", "laver", "couper"}

def get_recipes_by_ids(ids: List[int]) -> List[Dict[str, Any]]:
    print("🔍 get_recipes_by_ids a reçu :", ids, type(ids[0]) if ids else "liste vide")
    results = list(collection.find({"_id": {"$in": ids}}, {"_id": 0}))
    print(f"✅ Recettes trouvées : {len(results)}")
    return results

def group_steps_by_category_action(recipes: List[Dict[str, Any]]) -> Dict[str, Any]:
    mutualized_steps_by_category = defaultdict(list)
    recipe_specific_steps = []

    for recipe in recipes:
        individual_steps = []
        for step in recipe.get("steps", []):
            if isinstance(step, dict):
                patterns = step.get("pattern", [])
                if not isinstance(patterns, list):
                    patterns = [patterns]
                step_text = step.get("text", "")
            else:
                continue

            is_mutualized = False
            for pattern in patterns:
                if not pattern:
                    continue
                try:
                    action_category = pattern["action"]["category_action"]
                    print("action_category:", action_category, type(action_category))
                    if action_category in MUTUALIZED_ACTIONS:
                        mutualized_steps_by_category[action_category].append(step_text)
                        is_mutualized = True
                        break
                except KeyError:
                    continue

            if not is_mutualized:
                individual_steps.append(step_text)

        recipe_specific_steps.append({
            "title": recipe.get("title", "Recette inconnue"), 
            "steps": individual_steps})

    sorted_categories = sorted(
        mutualized_steps_by_category.keys(),
        key=lambda cat: CATEGORY_ACTION_ORDER.get(cat, float('inf'))
    )

    mutualized_steps = [
        {"category": category, "steps": mutualized_steps_by_category[category]}
        for category in sorted_categories
    ]

    return {
        "mutualizedSteps": mutualized_steps,
        "recipes": recipe_specific_steps
    }


# def generate_shopping_list(recipes: List[Dict[str, Any]]) -> Dict[str, Dict[str, Any]]:
#     shopping_list = defaultdict(lambda: {'quantity': 0, 'unit': '', 'category': ''})

#     for recipe in recipes:
#         for ing in recipe.get('ingredients', []):
#             key = ing['ingredient']
#             try:
#                 quantity = float(ing['quantity'])
#             except (ValueError, TypeError):
#                 quantity = 0
#             shopping_list[key]['quantity'] += quantity
#             shopping_list[key]['unit'] = ing['unit']
#             shopping_list[key]['category'] = ing['category']

#     return dict(shopping_list)

def main():
    if len(sys.argv) < 2:
        print("Usage: python BatchCookingProcessor.py id1,id2,id3,...")
        sys.exit(1)

    try:
        ids = list(map(int, sys.argv[1].split(',')))
    except ValueError:
        print("Erreur: les IDs doivent être des entiers séparés par des virgules.")
        sys.exit(1)

    recipes = get_recipes_by_ids(ids)
    if not recipes:
        print("Aucune recette trouvée.")
        sys.exit(1)

    batch_plan = group_steps_by_category_action(recipes)
    # shopping_list = generate_shopping_list(recipes)
    
    # print("\nShopping List:")
    # for ingredient, data in shopping_list.items():
    #     print(f"- {ingredient}: {data['quantity']} {data['unit']} ({data['category']})")

# 👉 Ce bloc ne s’exécute que si tu fais python BatchCookingProcessor.py directement
if __name__ == "__main__":
    main()
