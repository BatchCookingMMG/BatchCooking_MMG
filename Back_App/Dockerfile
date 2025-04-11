# Utiliser l'image OpenJDK pour exécuter une application Java
FROM openjdk:21-jdk-slim

# Auteur du conteneur
LABEL authors="gverc"

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier JAR généré par Maven/Gradle dans le conteneur
COPY target/*.jar app.jar

# Exposer le port sur lequel Spring Boot tourne
EXPOSE 8083

# Définir la commande de démarrage de l'application
ENTRYPOINT ["java", "-jar", "app.jar"]
