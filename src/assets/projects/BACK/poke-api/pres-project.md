# Projet Pokemon API - Initiation aux API REST

Ce projet est une initiation complète aux API REST : consommer une API externe (PokéAPI) et créer sa propre API avec Strapi, le tout connecté à un front-end React.

## Contexte & Motivation

Ce projet s'inscrit dans le cadre d'un cours d'initiation au développement back-end et aux API. L'objectif était de comprendre le cycle complet d'une API : comment fonctionne une requête HTTP, comment structurer des données côté serveur, et comment les consommer côté client. Le thème Pokémon a été choisi pour rendre l'exercice concret et ludique, en exploitant une API publique riche (PokéAPI) comme source de données de référence.

## Résultat Attendu

Le projet se compose de deux parties distinctes et complémentaires :

- **Un back-end Strapi (api-pokemon/)** : une API REST auto-générée, qui expose une collection `Pokemon` en base de données avec des endpoints CRUD complets.
- **Un front-end React (pokemon/)** : une interface qui consomme l'API Strapi et affiche les Pokémon sous forme de cartes interactives.

L'utilisateur peut visualiser la liste des Pokémon enregistrés dans la base, voir leurs caractéristiques (nom, type(s), HP, sprite) et écouter leur cri en cliquant sur un bouton.

## Approche Technique

Le projet est divisé en deux applications indépendantes qui communiquent via HTTP.

**Back-end : Strapi v5**

Strapi a été choisi comme CMS headless pour sa capacité à générer automatiquement une API REST complète à partir d'un schéma de données. Le Content Type `Pokemon` a été défini manuellement avec les attributs suivants :

| Champ       | Type      | Contrainte             |
| :---------- | :-------- | :--------------------- |
| `name`      | String    | Requis, Unique         |
| `idPokemon` | Integer   | Requis, Unique         |
| `type1`     | String    | Requis                 |
| `type2`     | String    | Optionnel              |
| `hp`        | Integer   | Requis                 |
| `sprite`    | String    | Requis (URL d'image)   |
| `cries`     | String    | Requis (URL audio .ogg)|

Strapi génère automatiquement les routes `GET`, `POST`, `PUT`, `DELETE` sur `/api/pokemons`. La base de données utilisée est **SQLite** (via `better-sqlite3`), ce qui simplifie le setup sans serveur de base de données externe.

**Front-end : React + Vite**

L'interface React se connecte à l'API Strapi via un `fetch` dans un `useEffect` au montage du composant. Les données sont stockées dans un état local (`useState`) et rendu sous forme de cartes.

**Données source : PokéAPI**

Les données (sprites, cris, statistiques) ont été récupérées depuis `https://pokeapi.co/api/v2/pokemon` pour alimenter la base Strapi via les requêtes `POST` du fichier `requests.http`.

## Fonctionnalités Clés

- **Liste de Pokémon** : affichage en grille de cartes, chacune présentant le nom, les HP, le sprite officiel et le(s) type(s).
- **Gestion des types** : affichage conditionnel selon qu'un Pokémon possède un ou deux types.
- **Écoute des cris** : un bouton "Hear Cries" déclenche la lecture du fichier audio `.ogg` du Pokémon via l'API Web Audio native.
- **API CRUD complète** : les endpoints Strapi permettent de créer, lire, modifier et supprimer des Pokémon directement (testable via `requests.http`).

## Ce Que J'ai Appris

Ce projet m'a permis de poser des bases solides sur plusieurs concepts fondamentaux du back-end et des API :

- **Comprendre le protocole HTTP** : les verbes (`GET`, `POST`, `PUT`, `DELETE`), les codes de statut, les headers, la structure d'une requête et d'une réponse JSON.
- **Modéliser des données pour une API** : définir un schéma de Content Type dans Strapi, choisir les bons types de champs, les contraintes (required, unique).
- **Consommer une API externe** : utiliser PokéAPI pour récupérer des données réelles et les intégrer dans son propre système, ce qui illustre le principe de "composition d'API".
- **Créer sa propre API REST avec Strapi** : comprendre qu'un CMS headless génère automatiquement des endpoints à partir d'un modèle de données, et que cela repose sur les mêmes principes REST qu'une API codée manuellement.
- **Connecter un front-end à une API** : utiliser `fetch`, `async/await`, `useEffect` et `useState` pour récupérer et afficher des données dynamiques dans React.
- **Tester une API** : utiliser un fichier `.http` (REST Client) pour simuler des requêtes et valider le comportement de l'API sans passer par une interface graphique.

## Technologies

- **Back-end :** Strapi v5, Node.js, SQLite (better-sqlite3)
- **Front-end :** React 19, Vite
- **API externe :** PokéAPI (pokeapi.co)
- **Outils :** REST Client (fichier `.http`), VS Code
