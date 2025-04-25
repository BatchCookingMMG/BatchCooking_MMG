package com.example.batchCooking.model;

public class Step {
    private String text;
    private Pattern pattern;

    // Getters et Setters
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Pattern getPattern() {
        return pattern;
    }

    public void setPattern(Pattern pattern) {
        this.pattern = pattern;
    }
}

