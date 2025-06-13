from flask import Flask, request, jsonify
from dotenv import load_dotenv
from batch.BatchCookingProcessor import get_recipes_by_ids, group_steps_by_category_action

app = Flask(__name__)

@app.route("/api/batch/generate", methods=["POST"])
def generate_batch():
    try:
        ids = request.json.get("recipeIds", [])
        if not ids or not isinstance(ids, list):
            return jsonify({"error": "recipeIds must be a non-empty list"}), 400

        recipes = get_recipes_by_ids(ids)

        if not recipes:
            return jsonify({"error": "No recipes found for provided IDs"}), 404

        plan = group_steps_by_category_action(recipes)
        # shopping_list = generate_shopping_list(recipes)

        return jsonify({
            "batch_plan": plan,
            # "shopping_list": shopping_list
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)