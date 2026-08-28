---
title: J'ai déplacé mon agrégateur d'abonnements vers Cloudflare
description: Plusieurs fournisseurs plus des nœuds maison, le tout concassé dans un seul abonnement ; les règles de routage configurées côté serveur, et le client n'a plus qu'à s'abonner.
date: 2026-06-28
original: true
tags:
  - Cloudflare
  - Réseau
  - Projet open source
minRead: 4
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

Je suis avec les fournisseurs de proxy depuis trois-quatre ans, et j'ai aussi monté des nœuds VPS moi-même. Il y a un truc qui m'a toujours gonflé : trois-cinq abonnements en main, plus plusieurs nœuds maison, éparpillés dans le client à ajouter un par un, et les règles de routage à reconfigurer à chaque client. Changer d'appareil, changer de client, installer pour la famille : on rejoue tout à chaque fois.

Puis je me suis dit : pas besoin de gérer les abonnements à la main dans le client. Si on les rassemble en une seule URL, que les règles sont fixes côté serveur et que le client ne fait que s'abonner, tout devient simple. L'approche Sub-Store, je l'utilisais déjà, mais elle tournait sur mon propre serveur et j'avais la flemme de l'entretenir. Alors cette fois j'ai écrit ma propre version qui tourne sur Cloudflare : sub-store-cloudflare, open source sur [GitHub](https://github.com/realchendahuang/sub-store-cloudflare).

## En fait, elle ne fait qu'une chose

Concaténer plusieurs sources d'abonnement en un seul abonnement.

Concrètement, tu peux y glisser plusieurs choses :

- Les URL d'abonnement de quelques fournisseurs
- Le texte des nœuds de ton VPS (vless, trojan, ss, vmess, peu importe)
- Ou coller temporairement un bout de nœuds à la volée

Une fois entrées, le Worker va les récupérer, dédupliquer, filtrer selon tes règles, puis renommer, ajouter les drapeaux, résoudre les domaines selon le besoin. À la sortie, tout est poussé dans un abonnement combiné, et le client n'a qu'à s'abonner à cette seule URL.

Côté règles, j'ai tout mis côté serveur. Quelques modèles Mihomo courants sont intégrés — acl4ssr, whitelist/blacklist loyalsoldier, ai-streaming, etc. — et les groupes de routage et jeux de règles sont configurés dans le cloud. Tu balances l'abonnement dans mihomo / clash, surge, sing-box, shadowrocket, et en le téléchargeant tu obtiens un produit fini avec les règles de routage incluses, sans écrire de règles à la main ni maintenir des URL de jeux de règles.

## Pourquoi absolument sur Cloudflare

Les raisons sont on ne peut plus pragmatiques :

- **Pas de serveur.** Workers + D1 : le quota gratuit suffit pour du perso, et on économise le coût et l'entretien d'un serveur.
- **Le domaine workers.dev est déjà hors du mur.** La connexion de ton client pour aller chercher l'abonnement passe, pas de poupées russes du type « serveur à l'étranger, il faut un proxy pour tirer l'abonnement ».
- **Une fois déployé, c'est une interface web de gestion plus un endpoint de téléchargement.** Même en changeant de client sur mobile, tu ouvres une page web pour modifier la config.

J'ai gardé la stack volontairement petite : Worker + Static Assets + D1 + Worker Secrets. KV, R2, Durable Objects, Queue, Cron ne sont pas dans le chemin critique : moins il y en a, mieux c'est.

## Deux voies de déploiement prévues exprès

La première est pour ceux qui veulent juste l'utiliser : cliquer sur Deploy to Cloudflare dans le repo, Cloudflare tire le repo, crée le Worker, crée le D1, te demande deux tokens, et à la fin te donne un lien de gestion avec token. Pas besoin de toucher au terminal.

La seconde, pour moi et pour les amateurs de bricolage : installation en une commande par un agent IA.

Le repo embarque le protocole agent (AGENTS.md + la SKILL dans agent). Tu écris les sources d'abonnement, les abonnements combinés souhaités et les modèles de règles voulus dans un fichier de config local, tu lances `pnpm run install:cloudflare`, et l'agent vérifie pour toi la connexion Cloudflare, crée la base, écrit les secrets, migre, déploie, importe la configuration, valide les liens, puis te remet le lien de gestion et le lien de téléchargement.

Moi, c'est cette voie que j'utilise pour la mise en production, donc je la recommande : c'est du tout confort. Pour Codex / Claude Code, il suffit de copier le prompt dans `agent/install.prompt.md` du repo.

## Pour qui

Franchement : tu as plus d'un fournisseur, en plus quelques nœuds montés toi-même, et tu veux fondre le tout en un seul abonnement pour ton usage perso — voilà la cible de ce projet. Si tu n'as qu'un fournisseur et que ça te va, inutile de venir ici.

Tout le code est open source, AGPL. Le front rend hommage à la manière d'interagir du Sub-Store original ; l'original tourne dans un conteneur et couvre plus d'écosystèmes de clients, moi j'ai fait une forme plus petite, Cloudflare-native, facile à modifier et à déployer direct, ce n'est pas une réplique point par point.

Les curieux peuvent fouiller le repo, le README est assez complet : il n'y a qu'à suivre pour déployer.