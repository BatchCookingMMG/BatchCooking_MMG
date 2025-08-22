import unittest
from unittest.mock import patch, MagicMock
from batch.batch_cooking_processor import get_recipes_by_ids, group_steps_by_category_action

class TestBatchCookingProcessor(unittest.TestCase):

    @patch('batch.BatchCookingProcessor.get_collection')
    def test_get_recipes_by_ids(self, mock_get_collection):
        # Création d’un faux objet collection
        mock_collection = MagicMock()
        mock_get_collection.return_value = mock_collection

        # Simule les résultats de collection.find
        mock_collection.find.return_value = [
            {"title": "Pâtes", "steps": []},
            {"title": "Salade", "steps": []}
        ]

        ids = [1, 2]
        result = get_recipes_by_ids(ids)

        mock_collection.find.assert_called_once_with({"_id": {"$in": ids}}, {"_id": 0})
        self.assertEqual(len(result), 2)
        self.assertEqual(result[0]['title'], "Pâtes")

    def test_group_steps_by_category_action(self):
        recipes = [
            {
                "title": "Salade de carottes",
                "steps": [
                    {
                        "text": "Éplucher les carottes",
                        "pattern": [{"action": {"category_action": "éplucher"}}]
                    },
                    {
                        "text": "Couper les carottes",
                        "pattern": [{"action": {"category_action": "couper"}}]
                    },
                    {
                        "text": "Ajouter du citron",
                        "pattern": [{"action": {"category_action": "ajouter"}}]
                    }
                ]
            },
            {
                "title": "Soupe de poireaux",
                "steps": [
                    {
                        "text": "Laver les poireaux",
                        "pattern": [{"action": {"category_action": "laver"}}]
                    },
                    {
                        "text": "Cuire les légumes",
                        "pattern": [{"action": {"category_action": "cuire"}}]
                    }
                ]
            }
        ]

        batch_plan = group_steps_by_category_action(recipes)

        # Vérifier que les étapes mutualisées sont bien regroupées
        mutualized = batch_plan["mutualizedSteps"]
        all_mutualized_texts = [step for cat in mutualized for step in cat["steps"]]
        self.assertIn("Éplucher les carottes", all_mutualized_texts)
        self.assertIn("Laver les poireaux", all_mutualized_texts)
        self.assertIn("Couper les carottes", all_mutualized_texts)

        # Vérifier les étapes spécifiques par recette
        recipes_output = batch_plan["recipes"]
        self.assertEqual(recipes_output[0]["title"], "Salade de carottes")
        self.assertIn("Ajouter du citron", recipes_output[0]["steps"])

if __name__ == '__main__':
    unittest.main()
