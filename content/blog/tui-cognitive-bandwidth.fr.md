---
title: "Le TUI est en train de tuer votre bande passante cognitive : le « filtre geek » de l'AI Coding devrait se briser"
description: "Une flopée d'AI Coding Agents se précipitent pour sortir des TUI, refourbent l'interaction dans le paradigme terminal des années 80 et appellent ça « immersif » et « respectueux des développeurs ». Cet article démonte les trois mécanismes par lesquels le TUI réduit systématiquement la bande passante cognitive — et pourquoi le Web UI est la bonne réponse."
date: 2026-09-09
minRead: 7
source: x
sourceUrl: https://x.com/realchendahuang/status/2087949416808518106
tags:
  - Programmation IA
  - Design d'interaction
  - Essai
author:
  name: Chen Dahuang
  avatar:
    src: /avatar.jpg
    alt: Chen Dahuang
---

> L'argument central est d'abord paru sur [X](https://x.com/realchendahuang/status/2087949416808518106) ; cet article en est la version complète.

Ces temps-ci, une flopée d'AI Coding Agents se ruent sur le TUI, et Claude Code porte une grosse part de responsabilité dans cette mode. Il a poussé au maximum l'idée de discuter avec une IA dans le terminal pour écrire du code — mais il a aussi installé un goût et une dépendance au chemin : un Coding Agent « vraiment haut de gamme » devrait par défaut avoir une interface terminal ; la version web ne serait qu'un appendice, voire moquée comme « pas assez programmeur ».

Résultat ? On construit d'abord un TUI compliqué — plein de couleurs, de barres de statut, de raccourcis, de changements de mode — puis on l'appelle « immersif », « efficace », « respectueux des développeurs ».

Vraiment ?

## Vous croyez discuter, en fait vous vous battez

Pour la petite minorité qui vit dans le terminal toute la journée, le TUI, oui, c'est agréable. Pour beaucoup plus de gens, c'est un obstacle érigé artificiellement. Quand vous collaborez avec un agent via un TUI, vous faites en permanence trois choses :

**Retrouver les raccourcis et les modes.** Chaque outil a ses propres habitudes de touches. Les nouveaux sont perdus ; même les vétérants réapprennent à chaque changement d'outil.

**Localiser l'information dans un flot de caractères qui défile.** L'état n'est pas étalé sous vos yeux — il est enfoui dans une timeline que vous fouillez en scrollant et en cherchant.

**Prier pour ne pas être tombé dans un état bizarre.** Le changement de mode est invisible ; vous ne savez souvent pas dans quel mode vous êtes — jusqu'à ce que ça casse.

Ce n'est plus de l'interaction, c'est un combat contre l'interface.

## Densité d'information n'est pas efficacité d'information

Le mot préféré des défenseurs du TUI : « densité d'information ». Mais pousser la densité à l'extrême, on le paie en piétinant lisibilité et récupérabilité jusqu'au minimum.

Une interface vraiment efficace devrait **étaler l'état devant vous**, et laisser vos yeux et votre sens de l'espace faire le travail — quelle tâche tourne, quelle session attend une saisie, quel fichier a été modifié : un coup d'œil suffit. Au lieu de vous forcer à tout entasser en mémoire à court terme pendant que votre cerveau entretient une carte invisible de « l'état actuel du système ».

La mémoire de travail humaine a quatre à sept emplacements. Le modèle d'interaction du TUI dépense essentiellement votre ressource cognitive la plus précieuse pour « retenir l'état de l'interface » au lieu de « réfléchir au problème ».

## Et en plus, ça cultive une mauvaise habitude

Pire : l'écosystème TUI cultive un jugement de valeur cassé — **considérer la maîtrise des touches d'un outil comme une compétence en soi.**

Résultat : les gens dépensent une énorme énergie à s'adapter à l'interface au lieu de réfléchir au problème. La mesure d'un programmeur devient « sais-tu réciter ces raccourcis » plutôt que « sais-tu décomposer clairement le problème ».

Un bon outil devrait réduire le coût de la pensée, pas le déplacer vers « comment manipuler cette interface ».

## Le Web UI peut parfaitement être rapide et propre

Certains disent que le web est lent, pas « natif ». On est en 2026 — cet argument est mort depuis longtemps.

Un Web UI peut être tout aussi rapide et propre : installé en PWA, il se confond presque avec un client desktop, et les mises à jour sont encore plus simples — pas de mise à niveau manuelle, un refresh et vous avez la dernière version. Sessions longues, tâches parallèles, états des tâches visualisés : ce sont précisément les points forts du DOM du navigateur, pas ceux d'un flot de caractères.

Mon setup principal, c'est une interface web comme OpenChamber sur un noyau OpenCode, utilisé longtemps et intensivement — solide comme un roc. Si je dois vraiment pinailler, les petits bugs web occasionnels n'affectent jamais l'usage au long cours ; en revanche, certains changements de mode de certains TUI m'ont piégé de nombreuses fois.

## Les outils servent aux gens, pas à prouver qui est le plus « geek »

Claude Code en lui-même est très fort, ça ne se discute pas. Mais il a popularisé l'esthétique « le TUI, c'est l'orthodoxie », et les imitateurs qui ont suivi font pire — ils ne prennent même plus la peine de faire du design d'interaction et traitent « vivre dans le terminal » comme preuve de sophistication.

Emballer une interaction anti-humaine en sophistication, c'est vraiment risible.

Les outils servent aux gens. Le critère devrait toujours être : **est-ce que ça réduit le coût total pour accomplir votre travail ?** Si une interface vous fait dépenser de l'énergie à « lutter contre l'interface », c'est un passif, aussi « geek » soit-elle.

La prochaine fois que vous choisissez un Coding Agent, enlevez d'abord ce filtre.
