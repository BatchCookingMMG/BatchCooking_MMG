package com.example.batchCooking.dto;

public class RecipeSummaryDTO {
    private Integer id;
    private String tag;
    private String title;
    private String preparation_time;
    private String difficulty;
    private String imageUrl;

    public RecipeSummaryDTO() {}

    public RecipeSummaryDTO(Integer id, String tag, String title, String preparation_time, String difficulty) {
        this.id = id;
        this.tag = tag;
        this.title = title;
        this.preparation_time = preparation_time;
        this.difficulty = difficulty;
    }

    public RecipeSummaryDTO(Integer id, String tag, String title,
                            String preparation_time, String difficulty, String imageUrl) {
        this(id, tag, title, preparation_time, difficulty);
        this.imageUrl = imageUrl;
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

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getDifficulty() {return difficulty;}
    public void setDifficulty(String difficulty) {this.difficulty = difficulty;}

}
