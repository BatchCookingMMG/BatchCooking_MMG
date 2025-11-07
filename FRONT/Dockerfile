# Utiliser la version spécifique de Node.js (22.14.0)
FROM node:22.16.0-alpine AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json (pour installer les dépendances)
COPY ./package*.json ./

# Installer toutes les dépendances (y compris devDependencies)
RUN npm install --include=dev

# Copier tout le code source
COPY ./ ./

# Construire l'application React en mode production (pour lire .env.production)
RUN npm run build -- --mode production

# Utiliser Nginx pour servir l’application
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
