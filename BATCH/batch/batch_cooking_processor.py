import sys
import io
import json
import os

from collections import defaultdict
from typing import List, Dict, Any

from pymongo import MongoClient
from dotenv import load_dotenv

from .backend_log_handler import get_logger
from exceptions import (
    BatchCookingException,
    MongoConnectionException,
    InvalidRecipeIdException,
    RecipeNotFoundException,
    InvalidStepPatternException
)

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# ---------------------------------
# Logger
# ---------------------------------
BACKEND_LOG_URL = "http://back:8083/api/logs/event"
logger = get_logger("BatchCooking", BACKEND_LOG_URL)

# -------------------------
# Connexion MongoDB
# -------------------------
def get_collection():
    load_dotenv()

    MONGO_URI = os.getenv("MONGO_URI")
    MONGO_DB = os.getenv("MONGO_DB")
    MONGO_COLLECTION = os.getenv("MONGO_COLLECTION")
    
    if not all([MONGO_URI, MONGO_DB, MONGO_COLLECTION]):
        logger.error("Variables d'environnement MongoDB manquantes")
        raise MongoConnectionException("Les variables d'environnement MongoDB sont incomplètes.")
    
    try:
        client = MongoClient(MONGO_URI)
        db = client[MONGO_DB]
        return db[MONGO_COLLECTION]
    except Exception as e:
        logger.exception("Erreur de connexion MongoDB")
        raise MongoConnectionException("Impossible de se connecter à MongoDB") from e

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

# ---------------------------------
# Fonctions principales
# ---------------------------------
def get_recipes_by_ids(ids: List[int]) -> List[Dict[str, Any]]:
    logger.info("get_recipes_by_ids reçu: %s", ids)
    if not all(isinstance(i, int) for i in ids):
        raise InvalidRecipeIdException("Tous les IDs doivent être des entiers.")
    
    collection = get_collection()
    results = list(collection.find({"_id": {"$in": ids}}, {"_id": 0}))

    if not results:
        logger.warning("Aucune recette trouvée pour les IDs: %s", ids)
        raise RecipeNotFoundException(f"Aucune recette trouvée pour les IDs {ids}")
    
    logger.info("Recettes trouvées : %d", len(results))
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
                except KeyError as e:
                    logger.error("Pattern mal formé dans la recette '%s': %s", recipe.get("title", "inconnue"), pattern)
                    raise InvalidStepPatternException(f"Pattern invalide : {pattern}") from e

                if action_category in MUTUALIZED_ACTIONS:
                    mutualized_steps_by_category[action_category].append(step_text)
                    is_mutualized = True
                    break

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


def generate_shopping_list(recipes: List[Dict[str, Any]]) -> Dict[str, Dict[str, Any]]:
    shopping_list = defaultdict(lambda: {'quantity': 0, 'unit': '', 'category': ''})

    for recipe in recipes:
        for ing in recipe.get('ingredients', []):
            key = ing['ingredient']
            try:
                quantity = float(ing['quantity'])
            except (ValueError, TypeError):
                logger.warning(
                    "Quantité invalide pour l'ingrédient '%s' dans la recette '%s'. Affectation à 0.",
                    key,
                    recipe.get("title", "inconnue")
                )
                quantity = 0
            shopping_list[key]['quantity'] += quantity
            shopping_list[key]['unit'] = ing['unit']
            shopping_list[key]['category'] = ing['category']

    return dict(shopping_list)

def main():
    if len(sys.argv) < 2:
        logger.error("Usage incorrect: python batch_cooking_processing.py id1,id2,id3,...")
        sys.exit(1)

    try:
        ids = list(map(int, sys.argv[1].split(',')))
    except ValueError:
        logger.error("Les IDs doivent être des entiers séparés par des virgules: %s", sys.argv[1])
        raise InvalidRecipeIdException("IDs non valides fournis") 

    recipes = get_recipes_by_ids(ids)
    if not recipes:
        logger.warning("Aucune recette trouvée pour les IDs fournis: %s", ids)
        raise RecipeNotFoundException(f"Aucune recette trouvée pour les IDs {ids}")

if __name__ == "__main__":
    main()
