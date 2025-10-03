package com.batchcooking;

import com.microsoft.playwright.*;
import com.microsoft.playwright.assertions.PlaywrightAssertions;
import com.microsoft.playwright.options.AriaRole;
import org.junit.jupiter.api.*;

import java.nio.file.Paths;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class BatchCookingFlowTest {
    Playwright playwright;
    Browser browser;

    boolean recordVideo;

    @BeforeAll
    void setupAll() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch(
                new BrowserType.LaunchOptions()
                        .setHeadless(false)// false pour voir le navigateur
                        .setSlowMo(2500)
        );

        // Active la vidéo si RECORD_VIDEO=true
        recordVideo = "true".equalsIgnoreCase(System.getenv("RECORD_VIDEO"));
    }

    @AfterAll
    void tearDownAll() {
        browser.close();
        playwright.close();
    }

    @Test
    void shouldGenerateBatchWithFiveVegetarianRecipes() {
        Browser.NewContextOptions options = new Browser.NewContextOptions();

        if (recordVideo) {
            options.setRecordVideoDir(Paths.get("videos/"))
                    .setRecordVideoSize(1280, 720);
        }

        BrowserContext context = browser.newContext(options);
        Page page = context.newPage();

        // 1. Aller sur la page home
        page.navigate("http://localhost:5173/");
        page.waitForLoadState();

        // 2. Choisir 5 recettes
        page.getByLabel("Nombre de repas").fill("5");

        // 3. Coche “Végétarien 🥕”
        page.getByLabel("Végétarien 🥕").check();

        // 4. Cliquer sur "Générer les recettes"
        page.getByRole(AriaRole.BUTTON,
                new Page.GetByRoleOptions().setName("Générer les recettes")).click();

        // 5. Vérifier qu’on arrive sur /filtered-recipes
        page.waitForURL("**/filtered-recipes**");
        PlaywrightAssertions.assertThat(page.getByText("Résultats de vos critères :")).isVisible();

        // 6. Vérifier qu’on a 5 recettes affichées
        // chaque RecipeCard est rendu dans un conteneur avec max-w-[240px]
        Locator recipeCards = page.locator(".max-w-\\[240px\\]");
        PlaywrightAssertions.assertThat(recipeCards).hasCount(5);

        // 7. Cliquer sur "Générer le batch"
        page.getByRole(AriaRole.BUTTON,
                new Page.GetByRoleOptions().setName("Générer mon Batch Cooking")).click();

        // 8. Vérifier les sections du batch (BatchPage)
        PlaywrightAssertions.assertThat(page.getByRole(AriaRole.HEADING,
                new Page.GetByRoleOptions().setName("Étapes mutualisées"))).isVisible();

        PlaywrightAssertions.assertThat(page.getByRole(AriaRole.HEADING,
                new Page.GetByRoleOptions().setName("Étapes par recette"))).isVisible();

        // Vérifier que la liste de courses est visible
        PlaywrightAssertions.assertThat(page.getByText("Liste de courses")).isVisible();

        // Vérifier qu’on retrouve bien 5 recettes dans le batch (carrousel)
        Locator batchRecipes = page.locator(".min-w-\\[200px\\]"); // chaque RecipeCard est rendu dans ce div
        PlaywrightAssertions.assertThat(batchRecipes).hasCount(5);

        if (recordVideo && page.video() != null) {
            System.out.println("Vidéo enregistrée : " + page.video().path());
        }

        context.close();
    }
}
