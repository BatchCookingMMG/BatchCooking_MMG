# Batch Cooking - Backend

Ce projet est le backend de l'application Batch Cooking, permettant la gestion des recettes, des utilisateurs (MVP) et la génération d'un plan de batch cooking optimisé (Version 2).

## Technologies utilisées

-  **Java 21** avec **Spring Boot**
-  **PostgreSQL** (base relationnelle)
-  **MongoDB** (base NoSQL)
-  **Spring Data JPA** & **Spring Data MongoDB**
-  **Spring Security** (future amélioration)
-  **Spring Web** (API REST)
-  **Lombok** (simplification du code)

##  Installation et lancement du projet

###  Prérequis
- Java 21
- Maven
- PostgreSQL
- MongoDB

###  Configuration des bases de données
Configurer `application.properties` :
- PostgreSQL => à remplir
- MongoDB

Port de l'API
SERVER_PORT=8083

###  Lancer l’application en mode développement
mvn spring-boot:run

Architecture du projet
src/main/java/com/example/batchCooking
 ┣ controllers    # Gestion des routes API
 ┣ services       # Logique métier
 ┣ repositories   # Accès aux bases de données (PostgreSQL & MongoDB)
 ┣ models         # Modèles de données
 ┣ config         # Configuration Spring (CORS, DB, Security)
 ┗ BatchCookingApplication.java  # Point d’entrée de l’application

##  Endpoints API

###  log-controller
| Méthode | Endpoint                | Description |
|---------|-------------------------|-------------|
| `POST`  | `/api/logs/event`       | Récupérer les logs front et batch |
| `GET`   | `/api/logs`             |             |

###  recipe-controller 
| Méthode | Endpoint                | Description |
|---------|-------------------------|-------------|
| `GET`   | `/api/recipes/random`   | Récupérer n recettes |
| `GET`  | `/api/recipes/id/{id}`   | Récuper la recette possédant l'id {id} |

###  auth-controller
| Méthode | Endpoint                | Description |
|---------|-------------------------|-------------|
| `POST`  | `/api/auth/register`    | Inscription d'un utilisateur |
| `POST`  | `/api/auth/login`       | Connexion et récupération d'un token |
| `GET `  | `/api/auth/me`          |             |

### batch-controller
| Méthode | Endpoint                 | Description |
|---------|--------------------------|-------------|
| `POST`  | `/api/batch/generate`    | Générer un plan de batch cooking en fonction des recettes sélectionnées |


##  Tests
Lancer les tests avec :
mvn test

##  Fonctionnalités MVP
- Ajout d’un système de comptes utilisateurs.
- Gestion des utilisateurs en PostgreSQL.
- Stockage des recettes, ingrédients et instructions en MongoDB.
- Gestion des préférences alimentaires.
