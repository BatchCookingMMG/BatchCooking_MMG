# Utiliser la version spécifique de Node.js
FROM node:22.14.0-alpine AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json (pour installer les dépendances)
COPY ./package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code source
COPY ./ ./

# Construire l'application React
RUN npm run build

# Étape 2 : Utiliser Nginx pour servir l’application
FROM nginx:alpine

# Copier le build depuis l'étape précédente
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
