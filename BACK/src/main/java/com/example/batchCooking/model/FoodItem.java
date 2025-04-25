package com.example.batchCooking.model;

import java.util.List;

public class FoodItem {
    private List<String> categoryFoodItem;
    private List<String> foodItemName;

    public FoodItem() {}

    public FoodItem(List<String> categoryFoodItem, List<String> foodItemName) {
        this.categoryFoodItem = categoryFoodItem;
        this.foodItemName = foodItemName;
    }

    public List<String> getCategoryFoodItem() { return categoryFoodItem; }
    public void setCategoryFoodItem(List<String> categoryFoodItem) { this.categoryFoodItem = categoryFoodItem; }

    public List<String> getFoodItemName() { return foodItemName; }
    public void setFoodItemName(List<String> foodItemName) { this.foodItemName = foodItemName; }
}

