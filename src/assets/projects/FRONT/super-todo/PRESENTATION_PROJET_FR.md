# 👋 Salut toi, tu es perdu ?

Bienvenue sur la documentation du projet **Superb Todo List** made by Dodo ! 
Ce guide est conçu pour t'aider à comprendre les entrailles du projet, et de ce qui est important à comprendre dedans.

---

## 1. Introduction & Stack Technique

**Le Projet :** Une application de gestion de tâches (Todo List) complète. Elle ne se contente pas d'ajouter des tâches : elle gère les priorités, les dates limites (deadlines), le multilinguisme et même un mode sombre !

**La Stack Technique :**
*   **Vue 3** : Le framework JavaScript utilisé avec la **Composition API** (`<script setup>`) pour un code moderne et épuré.
(la composition API permet une meilleure organisation du code par fonctionnalité plutôt que par type).
*   **Vite** : L'outil de build nouvelle génération, ultra-rapide.
*   **CSS3 Natif** : Pas de framework pour le css, juste du natif, parce que ça suffit amplement pour ce projet."
*   **LocalStorage** : Pour que les données survivent au rafraîchissement de la page.

---

## 2. Architecture Globale (Composants)

L'application suit une architecture modulaire stricte. Chaque fichier a une responsabilité unique.

*   **`App.vue` (Le Cerveau) :**
    *   C'est le point d'entrée. Il possède la "Source Unique de Vérité" (l'état global : liste des tâches, filtre actuel, thème sombre/clair).
    *   Il orchestre la logique métier : ajout, suppression, tri, persistance.
*   **`components/TodoInput.vue` :**
    *   Gère le formulaire d'ajout complexe (Texte + Date optionnelle + Priorité).
    *   Envoie les données au parent via des événements (`emit`).
*   **`components/TodoList.vue` :**
    *   Affiche la liste filtrée.
    *   Gère la logique d'affichage conditionnel (Badge de priorité, Date en rouge si dépassée).
    *   **Nouveau :** Gère le mode "Édition en ligne" (Inline Editing) pour modifier le texte ET la date sans quitter la liste.
*   **`components/TodoFilters.vue` :**
    *   Barre de contrôle pour filtrer les tâches (Toutes / Actives / Terminées).
*   **`components/TodoStats.vue` :**
    *   Composant visuel affichant une barre de progression dynamique.

---

## 3. Les Points Techniques Clés (Le "Cœur" du code)

Voici les concepts techniques avancés implémentés dans ce projet.

### A. La Réactivité & State Management (`ref`)
Nous utilisons `ref` pour rendre nos données vivantes.
```javascript
const todos = ref([])      // La liste réactive
const isDark = ref(false)  // L'état du thème
```
*Pourquoi ?* Vue détecte automatiquement les changements de ces variables et met à jour le DOM (l'interface) instantanément.

### B. Propriétés Calculées Intelligentes (`computed`)
Le tri de la liste n'est pas destructif. Nous créons une "vue" dérivée de la liste originale.
```javascript
const filteredTodos = computed(() => {
  // 1. On filtre (Actif/Terminé)
  // 2. On trie : Les tâches non faites d'abord, puis par Priorité (Haute > Moyenne > Basse)
})
```
*L'astuce :* L'utilisation d'un objet `priorityOrder = { high: 3, medium: 2, low: 1 }` permet un tri mathématique simple et efficace.

### C. Persistance Avancée (`watch` & `localStorage`)
Nous ne sauvegardons pas seulement les tâches, mais aussi les préférences utilisateur.
1.  **Tâches :** Un `watch` profond (`deep: true`) surveille chaque modification (même une case cochée) pour sauvegarder en temps réel.
2.  **Thème :** Le choix du mode sombre est aussi sauvegardé pour que l'utilisateur retrouve son ambiance préférée au retour.

### D. Gestion du Thème (Dark Mode & CSS Variables)
C'est une des fonctionnalités phares. Au lieu de dupliquer le CSS, nous utilisons des **Variables CSS** (`--bg-body`, `--text-primary`).
*   **Mécanisme :**
    *   Par défaut, les variables sont définies pour le thème clair.
    *   Quand la classe `.dark-mode` est ajoutée au `<body>`, les valeurs des variables changent.
    *   L'interface s'adapte instantanément car tous les composants utilisent `var(--nom-variable)`.

### E. Gestion des Dates & Deadlines
*   **Saisie :** Un input type `date` permet de choisir une échéance.
*   **Logique métier :** Une fonction compare la date de la tâche avec `new Date()` (aujourd'hui).
*   **Visuel :** Si la date est passée (`isOverdue`) ET que la tâche n'est pas finie, la date s'affiche en rouge vif pour alerter l'utilisateur.

### F. Internationalisation (i18n)
Un système de traduction maison léger et performant.
*   Les textes ne sont pas "en dur" mais chargés depuis des fichiers JSON (`fr.json`, `en.json`).
*   Même les priorités ("High" -> "Haute") sont traduites dynamiquement dans l'interface.

---

## 4. Design & Responsive (CSS)

Le fichier `src/assets/main.css` contient tout le style.

*   **Mobile First (ou presque) :**
    *   Utilisation de `@media (max-width: 480px)`.
    *   Sur mobile, les éléments `flex` passent en `column` (vertical).
    *   Les boutons et inputs s'agrandissent pour être "finger-friendly" (faciles à toucher).
*   **Animations :**
    *   Utilisation de `<TransitionGroup>` de Vue.
    *   Les tâches glissent (`transform`) et changent d'opacité (`opacity`) lors de l'ajout/suppression pour un rendu fluide et "pro".

---

## 5. Mots-clés pour briller à l'oral 🌟

Utilise ce vocabulaire pour montrer ta maîtrise :

*   **Single Source of Truth** : Les données sont centralisées, pas éparpillées.
*   **Two-way Binding** : Le lien magique `v-model` entre le formulaire et la variable.
*   **Deep Watcher** : L'observateur qui voit tout, même les changements profonds dans les objets.
*   **CSS Custom Properties** : Le nom technique des variables CSS.
*   **Conditional Rendering** : L'utilisation de `v-if` / `v-else` pour afficher le mode édition ou lecture.
*   **Event Emitting** : La façon dont les enfants "parlent" au parent.

---

## 6. Scénario de Démonstration (La "Demo Flow")

Pour présenter le projet, suis ces étapes :

1.  **L'Effet Waouh (Dark Mode) :** Commence par cliquer sur le bouton 🌙. Explique que tout le site s'adapte grâce aux variables CSS.
2.  **Création Complète :** Ajoute une tâche "Préparer la soutenance" avec :
    *   Priorité : **Haute**.
    *   Deadline : **Demain**.
3.  **Le Tri Intelligent :** Ajoute une tâche "Acheter du pain" (Priorité Basse). Montre qu'elle se place *sous* la tâche importante.
4.  **Gestion de l'Urgence :**
    *   Édite la tâche "Acheter du pain".
    *   Change la date pour "Hier".
    *   Montre que la date devient **ROUGE** (alerte visuelle).
5.  **Édition Inline :** Montre que tu peux modifier le texte ET la date directement dans la liste, avec les boutons de validation (✓) ou d'annulation (✕).
6.  **Internationalisation :** Bascule en Anglais (🇬🇧). Montre que tout change : titre, boutons, et même les badges de priorité ("Haute" devient "High").
7.  **Responsive :** Ouvre les outils de dev (F12), passe en mode mobile. Montre comment l'interface se réorganise (inputs empilés) pour rester utilisable.
