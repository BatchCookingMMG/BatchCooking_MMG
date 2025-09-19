# Tests End-to-End (E2E) avec Playwright (Java)

Ce dossier contient les **tests end-to-end** pour l’application **BatchCooking_MMG**.  
Les tests simulent un utilisateur réel : navigation sur le site, sélection de recettes, génération du batch, vérification des sections (recettes, liste de courses, étapes).

---

## Prérequis

- **Java 17+**
- **Maven 3.9+**
- **Docker / docker-compose** (pour lancer l’API + DB si nécessaire)
- **Playwright Java** est déjà configuré comme dépendance Maven

---

## ▶️ Lancer les tests E2E

Avant d’exécuter les tests, s'assurer que :
1. Le projet est lancé (ex. via `docker-compose up` à la racine du projet).

Commande pour exécuter les tests :
mvn test

## Activer l'enregistrement vidéo

- **bash**
RECORD_VIDEO=true mvn test

- **PowerShell**
$env:RECORD_VIDEO="true"
mvn test

- **CMD**
- set RECORD_VIDEO=true
  mvn test

Les vidéos seront enregistrées dans : e2e-tests/videos/