package com.example.batchCooking.dto;

import java.util.List;

public class MutualizedStepDTO {
    private String category;
    private List<String> steps;

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<String> getSteps() {
        return steps;
    }

    public void setSteps(List<String> steps) {
        this.steps = steps;
    }
}
