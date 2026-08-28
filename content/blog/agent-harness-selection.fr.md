---
title: "J'ai trifouillé Pi Agent, OMP, Codex et ZCode — voici pourquoi j'ai fini par choisir OpenCode + OpenChamber"
description: "Retour d'expérience sur le choix d'un Agent Harness : trois critères — expérience GUI, verrouillage fournisseur, liberté de développement — qui ont écarté Pi Agent, OMP, Codex et ZCode, pour atterrir sur le noyau OpenCode + l'interface OpenChamber."
date: 2026-08-06
minRead: 6
source: x
sourceUrl: https://x.com/realchendahuang/status/2085410520459604026
tags:
  - AI Agent
  - Choix d'outils
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

> Posté à l'origine sur [X](https://x.com/realchendahuang/status/2085410520459604026).

Ces derniers temps je m'amuse avec les Agent Harness — Pi Agent, OMP, ZCode, Codex, OpenCode — et j'ai enfin compris ce dont j'ai vraiment besoin.

## Mes trois critères

### 1. Un GUI mature et stable

Une fois qu'on a pris l'habitude du GUI, impossible de revenir au TUI. Discuter dans une boîte noire, c'est l'enfer : il faut retenir une tonne de raccourcis et de commandes pour que ce soit utilisable. Alors qu'un GUI, il suffit de cliquer sur les icônes et les boutons.

Donc il me faut une interface GUI mature, stable et belle.

Ce critère élimine d'office **Pi Agent** et **OMP**. Pas que le noyau soit mauvais, mais le GUI communautaire qui va avec est vraiment raté. En bricoler un soi-même demande une énergie folle, et comme ce genre d'outil est ultra-personnalisable, ta GUI artisanale ne sera jamais universelle — change de machine, change de personne, et tout est à refaire.

### 2. Pas de verrouillage fournisseur, pas de favoritisme fournisseur

Codex a beau avoir ouvert une interface de configuration pour les modèles tiers, c'est vraiment pénible à configurer, et les modèles tiers restent toujours des « citoyens de seconde zone » — écrasés par les modèles maison, freinés par le rythme des mises à jour. Ça me saoule pas mal.

ZCode, c'est pire : impossible de se connecter en OAuth aux Coding Plan de chacun (genre Kimi For Code, Grok Build, rien de tout ça ne marche dans ZCode, sauf à faire de la sorcellerie).

Du coup j'ai écarté tout ce qui sent le favoritisme de fournisseur de modèles, comme ZCode et Codex.

### 3. Une base open source, modifiable à volonté

J'ai besoin de faire de la customisation pour coller à mes besoins et offrir à mes clients une prise en main toute faite. Donc il me faut un produit open source et avec des licences sympas — pratique pour moi, simple pour mes clients, sans avoir à recourir à la black magic pour tout hacker.

## La réponse finale : OpenCode + OpenChamber

Après ce tamisage, le seul qui reste vraiment, c'est **OpenCode**.

Mais OpenCode n'est qu'un noyau d'agent. Pour lui trouver un GUI mature, stable et agréable, j'ai enfin découvert la vraie réponse : **OpenChamber**.

- Noyau : OpenCode, open source, sans verrouillage fournisseur, tous modèles supportés
- Interface : OpenChamber, un poste de travail GUI abouti
- Le combo : noyau stable + interface qui suit bien, et du sur-mesure quand on en a besoin

Dépôt open source : <https://github.com/openchamber/openchamber>

## Quelques réflexions

Choisir un outil, c'est fondamentalement choisir « qui garde la main sur toi ».

Aussi génial que soit un outil propriétaire, la direction des mises à jour, le support des modèles, la politique de prix, tout ça est décidé par d'autres — tu ne fais que subir. Avec un duo open source + non verrouillé, tu gardes toujours une porte de sortie, et toujours la liberté de transformer.

Quant au duel TUI contre GUI, ne te bats pas pour rien. Un outil, c'est fait pour bosser, pas pour prouver que tu es un pro du terminal. Une interface confortable qu'on peut utiliser sur la durée, rien n'est plus important que ça.

À lire aussi : [Retour en profondeur sur DeepSeek V4 Flash](/blog/deepseek-v4-flash-review)