# KL-sophro-API

## Definition

l'API de KL-sophro est une API déstinée uniqement au fonctionnement du site internet https://katia-lemaire-sophrologue.fr.

Le site Katia Lemaire Sophrologue est site déstinée à la prise de rendez-vous et au suivi de clients d'un professionnel de médecine douce spécialisé en sophrologie.

## Technologies utilisées

- Express JS
- Bcrypt
- Nodemailer
- Postgres SQL
- Sequelize (ORM)
- JWT

## Installation de l'API

### Installation des dépendances

```eng
yarn 
yarn dev
```

### Installation de la base de données

ouvrir un terminal =>

```eng
sudo -i -u postgres psql

CREATE DATABASE xxx OWNER xxx;

\q

psql -U nomDeLutilisateur -d nomDeLaBase -f create_db.sql
```
*le fichier **create_db.sql** se trouve dans le dossier "data"*
