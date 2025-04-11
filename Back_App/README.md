# 🍳 Batch Cooking - Backend

Ce projet est le backend de l'application Batch Cooking, permettant la gestion des recettes, des utilisateurs (MVP) et la génération d'un plan de batch cooking optimisé (Version 2).

## 🛠️ Technologies utilisées

- ☕ **Java 21** avec **Spring Boot**
- 🛢️ **PostgreSQL** (base relationnelle)
- 🍃 **MongoDB** (base NoSQL)
- 🔄 **Spring Data JPA** & **Spring Data MongoDB**
- 🛡️ **Spring Security** (future amélioration)
- 🌐 **Spring Web** (API REST)
- 📜 **Lombok** (simplification du code)

## 🚀 Installation et lancement du projet

### 1️⃣ Prérequis
- Java 21
- Maven
- PostgreSQL
- MongoDB

### 2️⃣ Configuration des bases de données
Configurer `application.properties` :
- PostgreSQL => à remplir
- MongoDB

Port de l'API
SERVER_PORT=8083

### 3️⃣ Lancer l’application en mode développement
mvn spring-boot:run

📂 Architecture du projet
📂 src/main/java/com/example/batchCooking
 ┣ 📂 controllers    # Gestion des routes API
 ┣ 📂 services       # Logique métier
 ┣ 📂 repositories   # Accès aux bases de données (PostgreSQL & MongoDB)
 ┣ 📂 models         # Modèles de données
 ┣ 📂 config         # Configuration Spring (CORS, DB, Security)
 ┗ 📜 BatchCookingApplication.java  # Point d’entrée de l’application

## 📡 Endpoints API

### 🔹 Recettes
| Méthode | Endpoint                | Description |
|---------|-------------------------|------------|
| `GET`   | `/api/recettes`         | Récupérer la liste des recettes |
| `GET`   | `/api/recettes/{id}`    | Récupérer les détails d'une recette |
| `POST`  | `/api/recettes`         | Ajouter une nouvelle recette |
| `PUT`   | `/api/recettes/{id}`    | Modifier une recette existante |
| `DELETE`| `/api/recettes/{id}`    | Supprimer une recette |

### 🔹 Utilisateurs 
| Méthode | Endpoint                | Description |
|---------|-------------------------|------------|
| `GET`   | `/api/users`            | Récupérer la liste des utilisateurs |
| `GET`   | `/api/users/{id}`       | Récupérer un utilisateur par ID |
| `POST`  | `/api/users`            | Créer un nouvel utilisateur |
| `PUT`   | `/api/users/{id}`       | Modifier un utilisateur |
| `DELETE`| `/api/users/{id}`       | Supprimer un utilisateur |

### 🔹 Authentification (Futur développement)
| Méthode | Endpoint                | Description |
|---------|-------------------------|------------|
| `POST`  | `/api/auth/register`    | Inscription d'un utilisateur |
| `POST`  | `/api/auth/login`       | Connexion et récupération d'un token |
| `POST`  | `/api/auth/logout`      | Déconnexion |

### 🔹 Batch Cooking (Futur développement)
| Méthode | Endpoint                 | Description |
|---------|--------------------------|------------|
| `GET`   | `/api/batch-cooking`     | Générer un plan de batch cooking en fonction des recettes sélectionnées |


## ✅ Tests
Lancer les tests avec :
mvn test

## 📌 Fonctionnalités MVP
- Ajout d’un système de comptes utilisateurs.
- Gestion des utilisateurs en PostgreSQL.
- Stockage des recettes, ingrédients et instructions en MongoDB.
- Gestion des préférences alimentaires.

## 🛠️ Améliorations futures
- Génération d'un plan de batch cooking optimisé.
- Génération automatique de liste de courses.
