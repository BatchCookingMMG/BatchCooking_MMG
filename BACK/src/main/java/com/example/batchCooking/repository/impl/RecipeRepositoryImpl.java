package com.example.batchCooking.repository.impl;

import com.example.batchCooking.model.CostEnum;
import com.example.batchCooking.model.DifficultyEnum;
import com.example.batchCooking.model.Recipe;
import com.example.batchCooking.repository.RecipeRepositoryCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component("recipeRepositoryImpl")
public class RecipeRepositoryImpl implements RecipeRepositoryCustom {

    private final MongoTemplate mongoTemplate;

    @Autowired
    public RecipeRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public List<Recipe> findFilteredRandomRecipes(int size, boolean vegetarien, boolean sansPorc, DifficultyEnum difficulty, CostEnum cost) {
        List<Criteria> criteriaList = new ArrayList<>();

        if (vegetarien) {
            criteriaList.add(Criteria.where("tag").is("vegetarien"));
        }

        if (sansPorc) {
            criteriaList.add(Criteria.where("tag").ne("porc"));
        }

        if (difficulty != null) {
            criteriaList.add(Criteria.where("difficulty").is(difficulty.getLabel()));
        }

        if (cost != null) {
            criteriaList.add(Criteria.where("cost").is(cost.getLabel()));
        }

        MatchOperation match = criteriaList.isEmpty() ? null
                : Aggregation.match(new Criteria().andOperator(criteriaList.toArray(new Criteria[0])));
        SampleOperation sample = Aggregation.sample(size);

        Aggregation aggregation = (match == null)
                ? Aggregation.newAggregation(sample)
                : Aggregation.newAggregation(match, sample);

        return mongoTemplate.aggregate(aggregation, "Recipes", Recipe.class).getMappedResults();
    }
}

