---
title: "Le Harness first-party n'est pas forcément la réponse du moment : à l'ère des modèles ouverts, choisissez le modèle et le Harness séparément"
description: "Claude ? Donc Claude Code. À l'ère des modèles ouverts, cet instinct mérite une mise à jour. L'avantage first-party est réel, mais entraîner un bon modèle et construire un bon Harness sont deux ingénieries différentes — cet article explique pourquoi modèle et Harness peuvent désormais se choisir séparément, avec une carte de positionnement de cinq Harness."
date: 2026-09-09
minRead: 8
source: x
sourceUrl: https://x.com/realchendahuang/status/2093890559874388141
tags:
  - AI Agent
  - Harness
  - Choix d'outils
author:
  name: Chen Dahuang
  avatar:
    src: /avatar.jpg
    alt: Chen Dahuang
---

> L'argument central est d'abord paru sur [X](https://x.com/realchendahuang/status/2093890559874388141) ; cet article en est la version complète, avec une carte de positionnement des cinq Harness.

La première réaction de la plupart des gens au moment de choisir un Coding Agent est tout ce qu'il y a de plus naturelle : Claude → Claude Code ; GPT → Codex ; GLM → ZCode ; DeepSeek → évidemment, d'abord le Harness maison de DeepSeek.

Et l'instinct est parfaitement sain. Le plus grand avantage du first-party, c'est de connaître son propre modèle mieux que personne.

## L'avantage first-party est réel

Quels prompts aime le modèle, quelle conception du Tool Schema est la plus stable, comment organiser un Context long, quelles capacités apportent les nouvelles versions, où il trébuche le plus facilement — le first-party le sait généralement avant les tiers.

Alors pour des produits comme Claude Code et Codex, où modèle et Harness itèrent ensemble sur la durée, la combinaison first-party est souvent la meilleure réponse du moment. Là-dessus, je ne conteste rien.

## Mais entraîner un modèle et construire un Harness sont deux ingénieries complètement différentes

Avec les modèles ouverts comme DeepSeek et GLM, ça devient intéressant — parce qu'entraîner un bon modèle et construire un bon Harness, ce sont deux ingénieries totalement différentes.

Une fois qu'un Coding Agent tourne réellement, apparaît une masse de problèmes hors-modèle :

- Comment lire les fichiers, comment modifier le code
- Comment contrôler l'Agent Loop, comment compresser le Context
- Comment exploiter le Cache, comment récupérer après un Tool Call en échec
- Comment ordonnancer les Subagents, comment gérer les permissions

La qualité de tout cela détermine directement si le même modèle se révèle bon à l'usage. Le même modèle dans un autre Harness, et l'expérience peut être le jour et la nuit.

## Le problème le plus grand : les modèles évoluent trop vite

Aujourd'hui GLM domine, le mois prochain DeepSeek sort peut-être un Flash encore plus costaud, et un moment plus tard un nouveau modèle revient à la charge.

Si tout votre workflow de codage est lié au produit first-party d'un seul éditeur, changer de modèle signifie souvent changer d'outils et d'habitudes. Des mois de configs, de mémoires et de workflows peaufinés partent à la benne.

C'est exactement là que les Harness tiers gagnent leur existence : **vous pouvez verrouiller les outils, Skills, MCP, permissions et workflows que vous maîtrisez, et ne remplacer que le modèle en dessous.** Aujourd'hui DeepSeek, demain GLM, après-demain autre chose — l'environnement de travail n'est pas à reconstruire.

## Une carte de positionnement des cinq Harness

Où en sont les cinq grands, d'après mon expérience à fin août 2026 :

**Pi** : philosophie minimaliste ; le Harness interfère le moins possible avec le modèle. Léger, rapide, faible overhead de Token, malléable à l'extrême. Idéal comme fondation pour votre agent longue durée — simple, propre, hackable à volonté.

**OMP** : empile sur Pi des capacités de codage lourdes — LSP, Debugger, Browser, AST — comme si on équipait l'agent d'un IDE complet. Pour du codage vraiment intensif et de la navigation complexe dans les repos.

**DeepSeek Harness** : va le plus loin — Everything is Plugin. Agent Loop, outils, permissions, Presets et UI se démontent et se recombinent. Pour ceux qui bricolent l'architecture d'agents, les Presets, le multi-agent et les Runtime de nouvelle génération. Essayez plus souvent le mode PTC — plus rapide et plus économe en tokens.

**OpenCode** : le plus équilibré du lot — open source, nombreux Provider, gros écosystème, Client/Server, appli desktop et Subagents matures. Pour qui veut un Coding Agent multi-modèles, généraliste et éprouvé.

**Command Code** : une route complètement différente — il adore couvrir le modèle. Les arguments de Tool Call erronés sont corrigés en local ; les lectures de fichiers en double sont dédupliquées ; les longues sessions gardent un Stable Prefix pour monter le Cache Hit ; quand le Context menace d'exploser, Compaction. Appliqué à des modèles de corvée comme DeepSeek V4 Flash ou GLM-5.3 Flash, ça vaut de l'or : plus le modèle est faible, plus le Harness compense.

## Ma méthode de choix

Si je ne regarde que la malléabilité long terme, je préfère toujours Pi. Mais si on me demandait aujourd'hui de faire bosser sérieusement DeepSeek V4 Flash ou GLM-5.3, j'irais vraiment goûter Command Code — la combinaison modèle-Harness se règle par tâche, pas par camp.

À l'ère des modèles ouverts, modèle et Harness sont des choix désormais pleinement séparables. **Arrêtez de demander « le modèle de qui avec l'outil de qui », demandez plutôt « dans quel Harness ce modèle travaille-t-il le mieux ».**
