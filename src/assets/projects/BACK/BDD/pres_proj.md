# Projet BDD - Plateforme de Streaming

## Contexte & Motivation

Ce projet s'inscrit dans le cadre d'un TP de cours de bases de données à MyDigitalSchool, réalisé en binôme. L'objectif était de concevoir et implémenter de A à Z la base de données d'une plateforme de streaming professionnelle, en partant d'une analyse métier jusqu'à l'écriture de requêtes SQL avancées.

Plutôt qu'un exercice purement théorique, ce projet nous a permis de travailler sur un cas concret et réaliste - inspiré de plateformes comme Netflix ou Prime Video - avec de vraies contraintes métier à modéliser (héritage, restrictions d'âge, unicité des abonnements, multi-devices, binge-watching...).

---

## Résultat Attendu

L'objectif était de produire une base de données complète et fonctionnelle, structurée autour de plusieurs livrables :

- Un **MCD** (Modèle Conceptuel de Données) représentant les entités, relations et cardinalités.
- Un **MLD** (Modèle Logique de Données) traduisant le MCD en tables relationnelles avec clés primaires et étrangères.
- Un **MPD** (Modèle Physique de Données) contenant le SQL `CREATE TABLE` complet et déployable sur MySQL.
- Un **jeu de données de test** cohérent et volumineux (32 utilisatrices, 40 profils, 52 contenus, etc.).
- Un ensemble de **requêtes SQL analytiques** couvrant les cas d'usage métier.

---

## Modélisation

### MCD - Modèle Conceptuel de Données

Le MCD identifie les entités principales et leurs relations :

- **UTILISATRICE** souscrit à un **ABONNEMENT**, possède plusieurs **PROFILS**, enregistre plusieurs **DEVICES**.
- Un **PROFIL** consulte un **HISTORIQUE**, met des contenus en **FAVORIS**, attribue des **NOTES**.
- Un **CONTENU** (film ou épisode) est classé dans un ou plusieurs **GENRES**.
- Un **EPISODE** appartient à une **SAISON**, qui appartient à une **SERIE**.
- La relation entre `Contenu`, `Film` et `Episode` est modélisée via une **spécialisation exclusive (XT)** : un contenu est soit un film, soit un épisode, jamais les deux.

### MLD - Modèle Logique de Données

Le MLD traduit chaque entité et relation en tables relationnelles. Les points notables :

- La spécialisation est implémentée avec **une table `contenu` pour les attributs communs**, plus une table `film` et une table `episode` qui référencent `contenu` via leur clé primaire (stratégie "table par sous-type").
- Les relations N-N (contenu ↔ genre, profil ↔ contenu pour les favoris et notes) sont matérialisées par des **tables de liaison** (`contenu_genre`, `favoris`, `note`).
- L'historique est une entité à part entière avec ses propres attributs (date, durée, device utilisé, complétion).

### MPD - Modèle Physique de Données

Le MPD est l'implémentation SQL directement exécutable sur MySQL/MariaDB. Chaque table respecte :

- Des **clés primaires** auto-incrémentées ou composites selon les cas.
- Des **clés étrangères** avec `ON DELETE CASCADE` là où la suppression doit se propager.
- Des **contraintes d'unicité** (`UNIQUE`) pour éviter les doublons (ex: un profil ne peut noter un contenu qu'une seule fois).
- Des **types adaptés** : `ENUM` pour les abonnements, `BOOLEAN` pour le statut et la complétion, `DECIMAL` pour les prix, `TIMESTAMP` / `DATETIME` pour les dates.

---

## Structure des Tables

| Table | Description |
|---|---|
| `utilisatrice` | Comptes utilisateurs (email, mdp, pays, statut) |
| `abonnement` | Abonnements basic / standard / premium |
| `profil` | Profils par utilisatrice (enfant, ado, adulte) |
| `devices` | Appareils enregistrés par utilisatrice |
| `contenu` | Films et épisodes (titre, description, durée, age_min) |
| `film` | Sous-type de contenu - identifié par id_contenu |
| `episode` | Sous-type de contenu - lié à une saison |
| `serie` | Séries avec titre |
| `saison` | Saisons liées à une série |
| `genre` | Genres disponibles (Action, Drame, Sci-Fi...) |
| `contenu_genre` | Table de liaison contenu ↔ genre (N-N) |
| `historique` | Visionnages avec device, durée, complétion |
| `favoris` | Contenus mis en favoris par profil |
| `note` | Notes (1 à 5) attribuées par profil à un contenu |

---

## Règles Métier Implémentées

**Abonnements** - Une utilisatrice peut avoir plusieurs abonnements successifs, mais jamais deux actifs simultanément. Les périodes ne peuvent pas se chevaucher.

**Restriction d'âge** - Un profil catégorie `enfant` ne peut pas regarder de contenu avec `age_min > 10`. Un profil `ado` est limité aux contenus avec `age_min <= 16`.

**Héritage exclusif** - Un contenu est soit un film, soit un épisode. Cette contrainte est portée par la structure des tables (`film` et `episode` partagent la même PK que `contenu`).

**Notation unique** - Un profil ne peut attribuer qu'une seule note par contenu. La clé primaire composite `(id_profil, id_contenu)` de la table `note` garantit cette contrainte.

**Historique unique par session** - La contrainte `UNIQUE (id_profil, id_contenu, id_device)` empêche les doublons de visionnage pour une même combinaison profil / contenu / appareil.

---

## Jeu de Données de Test

Pour permettre des requêtes analytiques pertinentes, un jeu de données conséquent a été généré :

- **32 utilisatrices** issues de 15 pays différents
- **32 abonnements** (basic / standard / premium, actifs et expirés)
- **40 profils** répartis en adulte, ado et enfant
- **40 appareils** (smart TV, PC, mobile, tablette)
- **20 films** (Inception, Parasite, Intouchables, Interstellar...)
- **32 épisodes** issus de **11 séries** (Breaking Bad, Game of Thrones, Stranger Things, Dark, Black Mirror, La Casa de Papel, Squid Game, Lupin, Narcos, Chernobyl, The Crown)
- **10 genres** associés aux contenus via `contenu_genre`
- **~56 favoris**, **~56 notes**, **~56 entrées d'historique** de base
- Des données supplémentaires pour les cas spécifiques : **visionnages interdits** (profils enfant/ado sur contenus restreints) et **sessions de binge-watching** (épisodes regardés à moins de 24h d'intervalle)

---

## Requêtes SQL Analytiques

### 1. Temps total visionné par utilisatrice
Jointure `utilisatrice → profil → historique`. Affiche le total en minutes et en heures, trié du plus grand consommateur.

```sql
SELECT u.email,
       SUM(h.nb_minutes) AS total_minutes_visionnes,
       ROUND(SUM(h.nb_minutes) / 60, 1) AS total_heures_visionnees
FROM utilisatrice u
JOIN profil p ON u.id_utilisatrice = p.id_utilisatrice
JOIN historique h ON p.id_profil = h.id_profil
GROUP BY u.id_utilisatrice, u.email
ORDER BY total_minutes_visionnes DESC;
```

### 2. Contenus les plus regardés
Compte le nombre de vues et le total de minutes visionnées par contenu.

```sql
SELECT c.titre,
       COUNT(h.id_historique) AS nb_vues,
       SUM(h.nb_minutes) AS total_minutes_vues,
       ROUND(AVG(h.nb_minutes), 1) AS moy_minutes_par_vue
FROM contenu c
JOIN historique h ON c.id_contenu = h.id_contenu
GROUP BY c.id_contenu, c.titre
ORDER BY nb_vues DESC, total_minutes_vues DESC;
```

### 3. Note moyenne par contenu
Affiche la moyenne des notes et le nombre de votants par contenu.

```sql
SELECT c.titre,
       ROUND(AVG(n.note), 2) AS note_moyenne,
       COUNT(n.note) AS nb_notes
FROM contenu c
JOIN note n ON c.id_contenu = n.id_contenu
GROUP BY c.id_contenu, c.titre
ORDER BY note_moyenne DESC, nb_notes DESC;
```

### 4. Genres les plus populaires
Compte le nombre de visionnages par genre.

```sql
SELECT g.libelle,
       COUNT(*) AS popularite
FROM historique h
JOIN contenu c ON h.id_contenu = c.id_contenu
JOIN contenu_genre cg ON c.id_contenu = cg.id_contenu
JOIN genre g ON cg.id_genre = g.id_genre
GROUP BY g.id_genre, g.libelle
ORDER BY popularite DESC;
```

### 5. Utilisatrices dont l'abonnement est expiré
Filtre les abonnements dont `date_fin` est passée.

```sql
SELECT u.email,
       u.pays,
       a.type_abonnement,
       a.date_fin
FROM utilisatrice u
JOIN abonnement a ON u.id_utilisatrice = a.id_utilisatrice
WHERE a.date_fin < NOW()
ORDER BY a.date_fin DESC;
```

### 6. Profils ayant regardé du contenu interdit à leur catégorie
Détecte les violations de restriction d'âge par catégorie de profil.

```sql
SELECT p.nom AS profil,
       p.categorie,
       c.titre,
       c.age_min,
       h.date_visionnage
FROM profil p
JOIN historique h ON p.id_profil = h.id_profil
JOIN contenu c ON h.id_contenu = c.id_contenu
WHERE (p.categorie = 'enfant' AND c.age_min > 10)
   OR (p.categorie = 'ado'   AND c.age_min > 16)
ORDER BY h.date_visionnage DESC;
```

### 7. Séries les plus binge-watchées
Détecte les épisodes regardés par le même profil à moins de 24h d'intervalle, en auto-jointure sur `historique`.

```sql
SELECT s.titre_serie,
       p.nom AS profil,
       COUNT(*) AS nb_episodes_binge
FROM historique h1
JOIN historique h2
    ON h1.id_profil = h2.id_profil
    AND h1.id_contenu < h2.id_contenu
    AND TIMESTAMPDIFF(MINUTE, h1.date_visionnage, h2.date_visionnage) BETWEEN 0 AND 1440
JOIN episode e ON h1.id_contenu = e.id_contenu
JOIN saison sa ON e.id_saison = sa.id_saison
JOIN serie s ON sa.id_serie = s.id_serie
JOIN profil p ON h1.id_profil = p.id_profil
GROUP BY s.titre_serie, p.nom
ORDER BY nb_episodes_binge DESC;
```

> La condition `h1.id_contenu < h2.id_contenu` évite que chaque paire soit comptée deux fois et qu'un épisode se joigne à lui-même.

### 8. Top 5 contenus les mieux notés (avec au moins 10 notes)
Utilise `HAVING` pour filtrer après regroupement.

```sql
SELECT c.titre,
       ROUND(AVG(n.note), 2) AS note_moyenne,
       COUNT(n.note) AS nb_notes
FROM contenu c
JOIN note n ON c.id_contenu = n.id_contenu
GROUP BY c.id_contenu, c.titre
HAVING COUNT(n.note) >= 10
ORDER BY note_moyenne DESC
LIMIT 5;
```

### 9. Taux de complétion moyen par contenu
Calcule le pourcentage moyen du contenu réellement regardé.

```sql
SELECT c.titre,
       ROUND(AVG(h.nb_minutes * 100.0 / c.duree_minutes), 1) AS taux_completion_pct,
       COUNT(*) AS nb_vues
FROM contenu c
JOIN historique h ON c.id_contenu = h.id_contenu
GROUP BY c.id_contenu, c.titre
ORDER BY taux_completion_pct DESC;
```

### 10. Device le plus utilisé

```sql
SELECT d.type_device,
       COUNT(*) AS nb_vues
FROM historique h
JOIN devices d ON h.id_device = d.id_device
GROUP BY d.type_device
ORDER BY nb_vues DESC
LIMIT 1;
```

### 11. Contenus jamais regardés
Utilise un `LEFT JOIN` et filtre sur les `NULL` pour détecter les contenus sans aucun visionnage.

```sql
SELECT c.titre,
       c.date_sortie
FROM contenu c
LEFT JOIN historique h ON c.id_contenu = h.id_contenu
WHERE h.id_contenu IS NULL
ORDER BY c.date_sortie DESC;
```

### 12. Utilisatrices dont aucun profil n'a mis de note

```sql
SELECT u.email,
       u.pays
FROM utilisatrice u
WHERE u.id_utilisatrice NOT IN (
    SELECT DISTINCT p.id_utilisatrice
    FROM profil p
    JOIN note n ON p.id_profil = n.id_profil
)
ORDER BY u.email;
```

### 13. Séries dont toutes les saisons sont sorties
Compare le nombre de saisons sorties avec le nombre total de saisons via une sous-requête corrélée.

```sql
SELECT s.titre_serie,
       COUNT(DISTINCT sa.id_saison) AS nb_saisons
FROM serie s
JOIN saison sa ON s.id_serie = sa.id_serie
JOIN episode e ON sa.id_saison = e.id_saison
JOIN contenu c ON e.id_contenu = c.id_contenu
WHERE c.date_sortie <= CURDATE()
GROUP BY s.id_serie, s.titre_serie
HAVING COUNT(DISTINCT sa.id_saison) = (
    SELECT COUNT(DISTINCT sa2.id_saison)
    FROM saison sa2
    WHERE sa2.id_serie = s.id_serie
)
ORDER BY s.titre_serie;
```

---

## Ce Que J'ai Appris

**Modélisation relationnelle** - Traduire des règles métier complexes (héritage exclusif, abonnements non chevauchants, restrictions d'âge) en contraintes SQL concrètes. Le choix de la stratégie d'héritage ("table par sous-type") a été une réflexion importante : elle préserve l'intégrité référentielle tout en évitant les colonnes nulles inutiles.

**Contraintes d'intégrité** - Comprendre la différence entre `WHERE` et `HAVING`, l'usage des clés composites pour garantir l'unicité, et l'importance du `ON DELETE CASCADE` pour maintenir la cohérence des données à la suppression.

**Requêtes analytiques avancées** - Écrire des requêtes avec auto-jointure (`historique` avec lui-même pour le binge-watching), sous-requêtes corrélées (séries complètes), `LEFT JOIN` pour détecter les absences, et `TIMESTAMPDIFF` pour comparer des dates.

**Gestion des données de test** - Générer un jeu de données cohérent et suffisamment volumineux pour rendre les requêtes pertinentes. Anticiper les erreurs classiques : apostrophes dans les chaînes SQL (`'` → `''`), violations de contraintes `UNIQUE`, conflits de clés étrangères.

**Outils** - Utilisation de phpMyAdmin pour l'import, le debug et l'exécution des requêtes. Gestion des erreurs de syntaxe SQL et compréhension des messages d'erreur MySQL.

---

*Projet réalisé par Dorian Jacolin - MyDigitalSchool Grenoble, 2026*