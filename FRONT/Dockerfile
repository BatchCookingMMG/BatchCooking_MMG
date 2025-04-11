# Utiliser la version spécifique de Node.js (22.14.0)
FROM node:22.14.0-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json (pour installer les dépendances)
COPY ./WEB_APP/package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code source
COPY ./WEB_APP/ ./

# Construire l'application React
RUN npm run build

# Utiliser Nginx pour servir l’application
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
