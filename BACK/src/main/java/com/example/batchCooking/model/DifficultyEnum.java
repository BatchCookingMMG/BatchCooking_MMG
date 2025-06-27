package com.example.batchCooking.model;

public enum DifficultyEnum {
    TRES_FACILE("très facile"),
    FACILE("facile"),
    MOYENNE("moyenne");

    private final String label;

    DifficultyEnum(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }

    public static DifficultyEnum fromLabel(String label) {
        for (DifficultyEnum d : values()) {
            if (d.label.equalsIgnoreCase(label)) return d;
        }
        throw new IllegalArgumentException("Invalid difficulty value: " + label);
    }
}