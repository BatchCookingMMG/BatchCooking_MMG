import unittest
from unittest.mock import patch, MagicMock
from batch.BatchCookingProcessor import get_recipes_by_ids, group_steps_by_category_action

class TestBatchCookingProcessor(unittest.TestCase):

    @patch('batch.BatchCookingProcessor.collection')
    def test_get_recipes_by_ids(self, mock_collection):
        # Mock de collection.find
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

        # Vérifie que les étapes mutualisées apparaissent dans l'ordre
        self.assertIn("--- ÉTAPES MUTUALISÉES ---", batch_plan)
        self.assertIn("Éplucher les carottes", batch_plan)
        self.assertIn("Laver les poireaux", batch_plan)
        self.assertIn("Couper les carottes", batch_plan)
        # Etapes spécifiques par recette
        self.assertTrue(any("RECETTE : Salade de carottes" in step for step in batch_plan))
        self.assertIn("Ajouter du citron", batch_plan)

if __name__ == '__main__':
    unittest.main()
