package com.example.batchCooking.model;

public class Ingredient {
    private String quantity;
    private String unit;
    private String ingredient;
    private String category;

    // Constructeur vide (par défaut)
    public Ingredient() {}

    // Getters et Setters
    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getIngredient() {
        return ingredient;
    }

    public void setIngredient(String ingredient) {
        this.ingredient = ingredient;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}

