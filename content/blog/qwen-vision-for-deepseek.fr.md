---
title: "Apporter le multimodal à DeepSeek : la solution de lecture d'images Qwen-3.7-Flash"
description: "DeepSeek V4 Flash n'a pas de multimodal ; et pour lire les images ? Après comparaison, la solution au meilleur rapport qualité/prix est Qwen-3.7-Flash : coût de reconnaissance d'une image ultra bas, combinée à V4 Flash pour combler le manque."
date: 2026-08-06
minRead: 5
source: x
sourceUrl: https://x.com/realchendahuang/status/2085265465564336327
tags:
  - DeepSeek
  - Multimodal
  - Test de modèle
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

> Publié à l'origine sur [X](https://x.com/realchendahuang/status/2085265465564336327), 89 000 vues, 600+ likes.

Beaucoup de gens râlent : DeepSeek V4 Flash n'a pas de fonctionnalité multimodale. C'est vraiment son point faible — mais pas besoin de s'acharner sur un seul modèle.

## Le problème

V4 Flash est au taquet en texte, mais dès qu'il faut lire une image, il est à la ramasse : captures d'écran, images de tableaux, maquettes UI, scans, rien n'y passe.

Le multimodal, c'est le prix du « pas cher » : pour coder la vision, les paramètres gonflent et le coût monte.

## La solution : les combiner

J'ai fait le tour des modèles de lecture d'images au meilleur rendement. Verdict : **Qwen-3.7-Flash**.

Reconnaître une image coûte si peu que c'est négligeable. On l'utilise comme modèle de vision dédié, le raisonnement textuel continue avec V4 Flash, et on profite des deux.

## Comment combiner

L'idée la plus simple, c'est le « routage » : entrée avec image → modèle de vision ; texte pur → V4 Flash.

```js
// Pseudo-code : routage à la demande
function route(input) {
  if (hasImage(input)) {
    return qwenVision(input)   // lire l'image + extraire les infos clés
  }
  return deepseekV4Flash(input) // raisonnement texte
}
```

Version plus avancée : envoyer le résultat de la lecture d'image directement à V4 Flash pour continuer le raisonnement.

1. Utiliser Qwen-3.7-Flash pour reconnaître l'image et sortir une description structurée
2. Balancer la description + la question d'origine à DeepSeek V4 Flash
3. V4 Flash raisonne en profondeur sur la base de la description : code, résumé, etc.

Comme ça, on voit les images tout en profitant du pas cher et de la vitesse de V4 Flash.

## Cas d'usage

- Questionner avec une capture : screenshot d'erreur, capture de chat, tout rentre
- Transformer des images de tableaux / documents en données structurées
- Convertir des maquettes UI en code
- Extraire l'info de factures, contrats et autres scans
- Les scénarios où l'Agent doit « regarder » l'écran

## Pourquoi pas une autre solution

Les grands modèles de vision purs (type multimodaux GPT) sont très forts, mais leur prix est ce qu'il est : pas rentable pour du traitement de masse quotidien.

Qwen-3.7-Flash gagne sur le rapport qualité/prix : qualité de reconnaissance suffisante, coût quasi nul, et on peut lancer de gros batch sans se serrer le ventre.

## Résumé

Combiner les modèles, c'est la norme. Inutile d'attendre qu'un seul modèle fasse tout.

Texte principal avec V4 Flash (pas cher, rapide, gros contexte), vision complémentaire avec Qwen-3.7-Flash (pas cher, suffisant), c'est le meilleur rapport qualité/prix du moment. Combler ce qui manque est plus réaliste qu'attendre un modèle « tout-puissant mais cher ».

À lire aussi : [DeepSeek V4 Flash en profondeur](/blog/deepseek-v4-flash-review)