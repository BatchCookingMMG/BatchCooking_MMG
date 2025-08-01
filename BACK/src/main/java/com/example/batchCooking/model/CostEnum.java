package com.example.batchCooking.model;

import com.example.batchCooking.exception.InvalidRecipeFilterException;

public enum CostEnum {
    BON_MARCHE("bon marché"),
    MOYEN("moyen"),
    ASSEZ_CHER("assez cher");

    private final String label;

    CostEnum(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }

    public static CostEnum fromLabel(String label) {
        for (CostEnum c : values()) {
            if (c.label.equalsIgnoreCase(label)) return c;
        }
        throw new InvalidRecipeFilterException("Paramètre 'cost' invalide : " + label);
    }
}