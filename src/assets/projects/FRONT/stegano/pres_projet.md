# Stegano Lab - Projet Learning Lab (MyDigitalSchool Grenoble)

## Contexte & Motivation

Ce projet est ne d'un vrai declic personnel. J'ai decouvert le sujet de la steganographie en regardant une video YouTube de <i>What a Fail</i>:
https://youtu.be/t7MEKGKUkiE?si=Hc7OhKoUb1xmZycC

L'idee de pouvoir faire passer un message de maniere discrete dans une image m'a tout de suite interesse, surtout en voyant a quel point ce principe peut etre lie a des contextes plus larges (cybersecurite, discretion de l'information, culture "espionnage" dans certains contenus).

En parallele, dans le cadre de MyDigitalSchool Grenoble, on devait realiser un projet Learning Lab: apprendre un sujet digital a la classe sous forme de trois parties obligatoires:

- un cours,
- un TP,
- une evaluation.

J'ai donc choisi de faire decouvrir la steganographie aux autres eleves, avec une approche simple, concrete et progressive.

Enfin, il y avait une troisieme motivation forte: tester serieusement ce que je pouvais produire avec l'IA sur un projet complet. Aujourd'hui, l'IA evolue tres vite, surtout dans le developpement, et on entend de plus en plus parler de pratiques comme le context engineering. Je voulais donc experimenter, en conditions reelles, une methode de travail ou le projet est concu et pilote avec l'IA, tout en gardant une vraie maitrise du resultat.

---

## Resultat Attendu

L'objectif etait de livrer une application web pedagogique complete qui permet de:

- comprendre les bases de la steganographie,
- pratiquer avec des exercices guides,
- encoder et decoder un message dans une image,
- verifier les acquis avec un QCM et un suivi des resultats.

Le tout devait etre suffisamment clair pour une utilisation en classe, sans backend, avec une logique locale simple a lancer et a presenter.

---

## Approche Technique

Le projet est developpe avec:

- React
- TypeScript
- Vite

### Organisation pedagogique en 4 pages

- Cours: definitions, logique LSB, difference steganographie / cryptographie, et contrainte PNG vs JPEG.
- TP: progression en plusieurs phases pour manipuler les bits et decoder des messages caches pas a pas.
- Outils: zone d'encodage/decodage d'image pour appliquer la methode sur des cas concrets.
- Eval: QCM de 10 questions avec correction et suivi local des notes.

### Coeur technique: methode LSB

L'application repose sur une implementation volontairement lisible de la steganographie LSB (Least Significant Bit):

- Encodage: les bits du message sont injectes dans le bit de poids faible des pixels (canal rouge), ce qui modifie tres peu l'image visuellement.
- Decodage: l'outil relit ces bits dans le meme ordre pour reconstruire le message.
- Delimitation: un caractere de fin est utilise pour savoir ou arreter la lecture.

### Contraintes gerees

- PNG recommande: format sans perte, donc les bits caches restent fiables.
- JPEG a eviter: compression avec perte qui peut detruire les bits caches.
- Suivi local: progression TP et scores d'evaluation stockes en localStorage.

---

## Fonctionnalites Cles

- Cours pedagogique sur la steganographie et la logique binaire appliquee a l'image.
- TP progressif pour passer de la theorie a la pratique.
- Outil d'encodage d'un message dans une image PNG.
- Outil de decodage depuis une image encodee.
- Evaluation QCM avec correction detaillee.
- Historique local des tentatives (meilleure note, moyenne, dernieres notes).

---

## Demarche IA: projet concu et pilote avec l'IA

Ce projet a ete realise avec une utilisation assumee de l'IA, principalement avec Claude sur une grande partie du travail, puis Codex pour finaliser et corriger.

Le point important n'est pas juste "l'IA a code". Le vrai travail a ete de:

- donner le bon contexte,
- cadrer les objectifs pedagogiques (cours, TP, eval),
- demander des iterations precises,
- verifier la coherence technique,
- corriger ce qui n'allait pas,
- garder une vision produit du debut a la fin.

Cette experience m'a montre une chose essentielle: pour rester competitif, il faut savoir utiliser l'IA. Mais il faut surtout savoir la piloter. Sans comprehension du code, sans esprit critique et sans validation humaine, on obtient vite un resultat fragile.

Autrement dit, l'IA accelere fortement la production, mais la qualite finale depend toujours de la capacite a bien formuler, bien verifier et bien decider.

---

## Ce Que J'ai Appris

- Transformer un sujet technique en parcours pedagogique clair pour une classe.
- Structurer un produit simple mais complet (theorie, pratique, evaluation).
- Expliquer concretement la difference entre steganographie et cryptographie.
- Integrer les contraintes reelles des formats d'image (PNG/JPEG).
- Travailler efficacement avec l'IA sur un projet entier, sans perdre le controle technique.

---

## Perspective

Stegano Lab est a la fois un projet pedagogique et un projet de methode.

D'un cote, il rend un sujet technique accessible. De l'autre, il me sert de cas concret pour tester une facon moderne de developper: concevoir, iterer et livrer avec l'IA, tout en gardant une responsabilite complete sur la qualite et la comprehension du produit.

Dans un contexte ou les metiers du numerique evoluent tres vite, cette capacite de pilotage devient un avantage reel.

---

lien github : https://github.com/Jacma-pro/stegano-lab
lien demo : https://stegano-lab.vercel.app/
