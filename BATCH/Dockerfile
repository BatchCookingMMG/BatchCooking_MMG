FROM python:3.10-slim

# Crée le dossier de travail
WORKDIR /app

# Copie les fichiers Python dans le conteneur
COPY . /app

# Installe les dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Expose le port de l'API Flask
EXPOSE 5001

# Commande de lancement de l'API
CMD ["python", "app.py"]
