# 50 ans

## 1. Introduction

Ce projet est un mini-site événementiel créé pour célébrer les 50 ans de Karyn. Il permet aux invités de s’informer, de s’inscrire à la soirée, et de retrouver toutes les informations pratiques (lieu, date, dress code, hébergement…).

---

## 2. Stack Technique

- **HTML5** : Structure des pages (accueil, infos, inscription…)
- **CSS3** : Mise en forme responsive et animations (fond animé, effets sur les boutons…)
- **JavaScript** : Fonctions dynamiques (compte à rebours, effets visuels…)
- **PHP** : Gestion des inscriptions (formulaire, stockage JSON, affichage des inscrits)

---

## 3. Fonctionnalités principales

- **Page d’accueil** : Présentation de l’événement, compte à rebours avant la date limite d’inscription, liens rapides (inscription, infos, liste des inscrits, contact).
- **Inscription en ligne** : Formulaire pour s’inscrire, traitement côté serveur (PHP), stockage des participants dans un fichier JSON.
- **Liste des inscrits** : Page affichant dynamiquement la liste des personnes déjà inscrites.
- **Informations pratiques** : Détail du lieu, horaires, dress code, hébergement, accès, contacts.
- **Effets visuels** : Animation de fond (neige/étoiles), design moderne et coloré, responsive mobile.

---

## 4. Architecture des fichiers

- **index.html** : Page d’accueil
- **informations.html** : Infos pratiques
- **inscription/** : Dossier dédié à l’inscription (formulaire, traitement, liste, style)
- **assets/** : Ressources statiques (CSS, JS, images)
- **PHP** : Pour la gestion serveur des inscriptions

---

## 5. Points techniques clés

- **Compte à rebours dynamique** en JS jusqu’à la date limite d’inscription.
- **Stockage des inscrits** dans un fichier JSON pour simplicité et portabilité.
- **Séparation claire** entre présentation (HTML/CSS), logique dynamique (JS) et traitement serveur (PHP).
- **Responsive design** : site utilisable sur mobile et desktop.
- **Accessibilité** : liens directs pour contacter l’organisatrice.

---

## 6. Pourquoi ce projet ?

- **But** : Faciliter l’organisation d’un événement privé, centraliser les infos et automatiser la gestion des inscriptions.
- **Enjeux** : Simplicité d’utilisation, accessibilité pour tous les invités, design festif et convivial.

---

## 7. Contexte personnel

Ce projet a été créé pour fournir un moyen d'inscription (notamment par téléphone) pour l'anniversaire de Karyn, à sa demande. J'ai développé un site simple pour centraliser les inscriptions et l'ai hébergé chez PlanetHoster, fourni par l'école. C'était ma première année d'études ; je souhaitais conserver ce projet pour montrer d'où je viens.

Ce travail m'a permis d'apprendre des notions pratiques : héberger un site web, gérer l'envoi de mails de notification à l'organisatrice, et stocker temporairement les données des invités. Les informations demandées aux invités étaient minimales (nom, prénom, et indication s'ils dormaient sur place). Ces données étaient enregistrées dans un fichier JSON - une solution simple et pratique pour cet usage mais reconnue comme peu sécurisée pour des données sensibles.

L'objectif principal était fonctionnel (faciliter les inscriptions), et non de collecter des informations sensibles. Le projet est conservé ici à des fins pédagogiques et pour illustrer les premières étapes de mon parcours.
