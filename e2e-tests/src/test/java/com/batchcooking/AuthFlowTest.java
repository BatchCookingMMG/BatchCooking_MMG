package com.batchcooking;

import com.microsoft.playwright.*;
import com.microsoft.playwright.assertions.PlaywrightAssertions;
import com.microsoft.playwright.options.AriaRole;
import org.junit.jupiter.api.*;
import java.util.regex.Pattern;

import java.nio.file.Paths;
import java.util.UUID;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class AuthFlowTest {
    Playwright playwright;
    Browser browser;
    boolean recordVideo;

    @BeforeAll
    void setupAll() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch(new BrowserType.LaunchOptions()
                .setHeadless(false)
                .setSlowMo(2000) 
        );
        recordVideo = "true".equalsIgnoreCase(System.getenv("RECORD_VIDEO"));
    }

    @AfterAll
    void tearDownAll() {
        browser.close();
        playwright.close();
    }

    @Test
    void shouldRegisterNewUserAndRedirect() {
        String email = "user+" + UUID.randomUUID() + "@example.com";
        String password = "password123";

        Browser.NewContextOptions options = new Browser.NewContextOptions();
        if (recordVideo) {
            options.setRecordVideoDir(Paths.get("videos/")).setRecordVideoSize(1280, 720);
        }

        BrowserContext context = browser.newContext(options);
        Page page = context.newPage();

        // 1. Aller sur /filtered-recipes
        page.navigate("http://localhost:5175/filtered-recipes");
        page.waitForLoadState();

        // 2. Cliquer sur le logo login
        page.locator("[data-testid='profile-button']").click();

        // 3. Vérifier qu’on est bien sur la page login après le clic
        page.waitForURL(Pattern.compile(".*/login$"));
        PlaywrightAssertions.assertThat(page).hasURL(Pattern.compile(".*/login$"));

        // 4. Cliquer sur "Créer un compte"
        page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("S'inscrire")).click();

        // 5. Remplir le formulaire
        page.getByLabel("Email").fill(email);
        page.locator("#register-password").fill(password);
        page.locator("#confirm-password").fill(password);

        // 6. Soumettre
        page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("S'inscrire")).click();

        // 7. Vérifier redirection vers la page précédente (/filtered-recipes)
        page.waitForURL(Pattern.compile(".*/filtered-recipes$"));
        PlaywrightAssertions.assertThat(page).hasURL(Pattern.compile(".*/filtered-recipes$"));

        context.close();
    }

   
}
