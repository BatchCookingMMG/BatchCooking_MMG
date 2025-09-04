package com.example.batchCooking.dto;

import java.util.List;

public class RecipeStepsDTO {
    private String title;
    private String imageUrl;
    private List<String> steps;

    public RecipeStepsDTO() {}

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public List<String> getSteps() {
        return steps;
    }

    public void setSteps(List<String> steps) {
        this.steps = steps;
    }


}
