package com.example.batchCooking.model;

import java.util.List;

public class CookingTime {
    private List<String> value;
    private List<String> unit;

    public CookingTime() {}

    public CookingTime(List<String> value, List<String> unit) {
        this.value = value;
        this.unit = unit;
    }

    public List<String> getValue() { return value; }
    public void setValue(List<String> value) { this.value = value; }

    public List<String> getUnit() { return unit; }
    public void setUnit(List<String> unit) { this.unit = unit; }
}

