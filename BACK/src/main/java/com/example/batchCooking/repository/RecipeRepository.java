package com.example.batchCooking.repository;

import com.example.batchCooking.model.Recipe;
import lombok.NonNull;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface RecipeRepository extends MongoRepository<Recipe, Integer>, RecipeRepositoryCustom {

    Optional<Recipe> findById(@NonNull Integer id);
}
