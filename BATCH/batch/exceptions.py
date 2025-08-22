class BatchCookingException(Exception):
    """Exception générique du batch cooking."""

class MongoConnectionException(BatchCookingException):
    """Erreur de connexion MongoDB."""

class InvalidRecipeIdException(BatchCookingException):
    """Erreur sur les IDs de recette fournis."""

class RecipeNotFoundException(BatchCookingException):
    """Aucune recette trouvée."""

class InvalidStepPatternException(BatchCookingException):
    """Pattern d'étape mal formé dans une recette."""