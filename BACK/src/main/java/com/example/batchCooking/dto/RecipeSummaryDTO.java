package com.example.batchCooking.dto;

public class RecipeSummaryDTO {
    private Integer id;
    private String tag;
    private String title;
    private String preparation_time;
    private String difficulty;

    public RecipeSummaryDTO(Integer id, String tag, String title, String preparation_time, String difficulty) {
        this.id = id;
        this.tag = tag;
        this.title = title;
        this.preparation_time = preparation_time;
        this.difficulty = difficulty;
    }

    public Integer getId() {return id;}
    public void setId(Integer id) {this.id = id;}

    public String getTag() {return tag;}
    public void setTag(String tag) {this.tag = tag;}

    public String getTitle() {return title;}
    public void setTitle(String title) {this.title = title;}

    public String getPreparation_time() {return preparation_time;}
    public void setPreparation_time(String preparation_time) {
        this.preparation_time = preparation_time;
    }

    public String getDifficulty() {return difficulty;}
    public void setDifficulty(String difficulty) {this.difficulty = difficulty;}

}
