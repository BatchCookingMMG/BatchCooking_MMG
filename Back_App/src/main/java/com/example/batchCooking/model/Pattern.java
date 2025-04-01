package com.example.batchCooking.model;

import java.util.List;

public class Pattern {
    private Action action;
    private List<String> actionForm;
    private QuantityFoodItem quantityFoodItem;
    private FoodItem foodItem;
    private Cooking cooking;

    // Getters et Setters
    public Action getAction() {
        return action;
    }

    public void setAction(Action action) {
        this.action = action;
    }

    public List<String> getActionForm() {
        return actionForm;
    }

    public void setActionForm(List<String> actionForm) {
        this.actionForm = actionForm;
    }

    public QuantityFoodItem getQuantityFoodItem() {
        return quantityFoodItem;
    }

    public void setQuantityFoodItem(QuantityFoodItem quantityFoodItem) {
        this.quantityFoodItem = quantityFoodItem;
    }

    public FoodItem getFoodItem() {
        return foodItem;
    }

    public void setFoodItem(FoodItem foodItem) {
        this.foodItem = foodItem;
    }

    public Cooking getCooking() {
        return cooking;
    }

    public void setCooking(Cooking cooking) {
        this.cooking = cooking;
    }
}

