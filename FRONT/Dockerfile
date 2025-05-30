# Utiliser la version spécifique de Node.js (22.14.0)
FROM node:22.16.0-alpine AS build

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

# Utiliser Nginx pour servir l’application
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
