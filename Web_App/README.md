# 🥗 Batch Cooking - Frontend

Ce projet est le frontend de l'application Batch Cooking, permettant aux utilisateurs de sélectionner des recettes adaptées à leur régime alimentaire (MVP) et de générer un plan de batch cooking optimisé (Version 2).

## 🛠️ Technologies utilisées

- ⚛️ **React** (TypeScript)
- 🎨 **Tailwind CSS** (pour le style)
- 🔄 **React Query** (pour la gestion des requêtes API)
- 🌐 **React Router** (pour la navigation)
- 📦 **Axios** (pour les requêtes HTTP)

## 🚀 Installation et lancement du projet

### 1️⃣ Prérequis
- Node.js = 22
- npm 

### 2️⃣ Installation des dépendances
npm install

### 3️⃣ Lancer l'application en mode développement
npm run dev

## 🏗️ Architecture du projet
📂 src
 ┣ 📂 components    # Composants réutilisables
 ┣ 📂 pages         # Pages principales de l'application
 ┣ 📂 hooks         # Hooks personnalisés
 ┣ 📂 services      # Services API (requêtes backend)
 ┣ 📂 types         # Définition des types TypeScript
 ┣ 📂 assets        # Images et fichiers statiques
 ┗ 📜 main.tsx      # Point d'entrée de l'application

## 📡Configuration de l'API
Créer un fichier .env à la racine

## ✅ Tests
Lancer les tests avec :
npm test

## 📌 Fonctionnalités MVP
- Sélection de n recettes pour n personnes selon le régime alimentaire (végétarien, sans porc, etc.).
- Authentification et personnalisation des préférences.
- Connexion avec un backend Spring Boot.

## 🛠️ Améliorations futures
- Planification hebdomadaire des repas.
- Génération d’un plan de batch cooking optimisé avec instructions mutualisées.
- Génération automatique de liste de courses.
