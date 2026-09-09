---
title: "Stable, rapide, productif, pas cher : mon AI Coding stack complet, documenté"
description: "OpenCode + OpenChamber + deux abonnements DeepSeek V4 Flash : 15 projets compilent du code en même temps et le quota bouge à peine. Toute ma configuration dévoilée — élagage de Context, mémoire à étages, automatisation du bureau, et la leçon « rester avec la combinaison d'origine »."
date: 2026-09-09
minRead: 8
source: x
sourceUrl: https://x.com/realchendahuang/status/2086611065920733305
tags:
  - OpenCode
  - Programmation IA
  - Configuration
author:
  name: Chen Dahuang
  avatar:
    src: /avatar.jpg
    alt: Chen Dahuang
---

> L'argument central est d'abord paru sur [X](https://x.com/realchendahuang/status/2086611065920733305) ; cet article en est la version complète de ma configuration.

La conclusion d'abord : **OpenCode + OpenChamber + un abonnement DeepSeek V4 Flash via OpenCode Go + un abonnement DeepSeek V4 Flash via Ollama Cloud.**

Ce stack tourne chez moi depuis longtemps en usage intensif, et il tient ses quatre promesses : stable, rapide, productif, pas cher. J'ai ouvert 15 projets d'affilée, tous en train de coder en même temps — le quota n'a quasiment pas bougé.

## Pourquoi OpenCode + OpenChamber

Le parcours de sélection est dans [un autre article](/blog/agent-harness-selection) ; ici, seulement les raisons au niveau du résultat. OpenCode est actuellement le noyau multi-modèles le plus équilibré — open source, beaucoup de Provider, Client/Server, appli desktop et Subagents matures. OpenChamber, c'est le Harness GUI open source au front-end le mieux léché que j'aie utilisé : un mainteneur extrêmement soigneux, raffiné, stable — ses petits bugs occasionnels ne gênent jamais l'usage au long cours.

Interface web + PWA — presque indiscernable d'un client desktop, et les mises à jour sans lever le doigt.

## La config tourne autour de trois besoins centraux

Ma configuration OpenCode s'articule autour de trois choses : gestion du Context, système de mémoire, capacités externes.

**1. opencode-dcp (open source) — élagage dynamique du Context.** Quand le Context atteint un seuil, il compresse automatiquement le contenu ancien en résumés techniques : garder les infos clés, jeter le bruit, nettoyer les doublons, et retirer du Context les contenus peu utiles comme les erreurs d'outils. Des sessions longues sans exploser le Context — c'est le socle qui permet à une tâche de tourner toute la journée.

**2. opencode-goal-plugin — gestion des objectifs.** Ajoute un mode Goal aux longues tâches, pour ramener l'agent quand il part en vrille.

**3. Hermes Memory — mémoire à étages (je l'ouvrirai en open source sur demande).** Mon plugin le plus lourd : j'ai porté sur OpenCode le mécanisme de mémoire à étages de l'agent Hermes, qui retient d'une session à l'autre les préférences utilisateur, les décisions de projet et les leçons du passé. Les nouveaux projets ne repartent pas de zéro.

**4. context7-MCP.** Consulter les dernières docs officielles des libs et frameworks — sans fouiller soi-même.

**5. grep-MCP.** Chercher des usages réels dans tout le code de GitHub — bien plus fiable que d'écrire de mémoire.

**6. open-computer-use — automatisation du bureau.** Permet à l'IA de manipuler directement les apps macOS : clics, frappe, défilement, glisser, captures d'écran, lecture de l'arbre d'accessibilité. Redoutable pour les phases de test et de recette.

## Le calcul des coûts : comment s'écoulent deux abonnements

DeepSeek V4 Flash est le cœur rapport qualité-prix de ce stack : vraiment intelligent, vraiment économique. L'abonnement OpenCode Go couvre le workflow principal ; l'abonnement Ollama Cloud sert de second canal pour répartir la charge — les deux abonnements additionnés coûtent moins cher qu'un seul plan de codage first-party grand public, pour un output supérieur.

L'affirmation « les modèles dans des coquilles tierces s'abêtissent » mérite d'être démontée : **la cause profonde de la dégradation, c'est une coquille qui ne fait aucun Harness Engineering pour le modèle** — pas le geste de changer de coquille en soi. Le support des modèles ouverts par OpenCode est de premier rang ; DeepSeek V4 Flash y tourne de façon stable et rapide — c'est précisément pour ça que j'ose empiler 15 projets dessus.

## La leçon : rester fidèle à la combinaison d'origine

Dans les groupes, la question revient souvent : existe-t-il un desktop de codage IA universel ? Un qui accepte tous les abonnements et ne rabote l'intelligence d'aucun modèle ?

Après discussion avec quelques potes qui triturent ça intensivement tous les jours, conclusion unanime : ça n'existe pas. Restez avec la combinaison d'origine.

- GPT → Codex : abonnement officiel en direct, l'ordonnancement natif le plus stable.
- Gemini → AntiGravity : le plafond de vitesse, fenêtres longues sans accroc.
- DeepSeek, GLM et autres modèles ouverts → des Harness amis des modèles ouverts comme OpenCode / ZCode.

Mettre un modèle dans une coquille inadaptée, et abêtissement, lenteur et abonnements incompatibles sont quasiment au rendez-vous. **Chaque modèle reste là où il est le plus à son aise — la combinaison, c'est votre stack.**

## Pour finir

Ce stack tourne depuis des mois, et le plus grand changement, ce n'est pas l'argent économisé — c'est que j'ose ouvrir des tâches. Parce que c'est stable et pas cher, ouvrir 15 projets ne m'angoisse pas. La valeur d'un stack d'outils finit toujours par se mesurer au volume de travail que vous osez lui confier.
