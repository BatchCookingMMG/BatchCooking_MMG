package com.example.batchCooking.model;

import java.util.List;

public class Cooking {
    private CookingTime cookingTime;
    private List<String> cookingPlace;
    private CookingTemperature cookingTemperature;

    public Cooking() {}

    public Cooking(CookingTime cookingTime, List<String> cookingPlace, CookingTemperature cookingTemperature) {
        this.cookingTime = cookingTime;
        this.cookingPlace = cookingPlace;
        this.cookingTemperature = cookingTemperature;
    }

    public CookingTime getCookingTime() { return cookingTime; }
    public void setCookingTime(CookingTime cookingTime) { this.cookingTime = cookingTime; }

    public List<String> getCookingPlace() { return cookingPlace; }
    public void setCookingPlace(List<String> cookingPlace) { this.cookingPlace = cookingPlace; }

    public CookingTemperature getCookingTemperature() { return cookingTemperature; }
    public void setCookingTemperature(CookingTemperature cookingTemperature) { this.cookingTemperature = cookingTemperature; }
}

