---
title: "Meilleures pratiques 2026 de l'indie dev : le combo Cloudflare du radin"
description: "La stack zéro coût de l'indépendant : Codex écrit le code, GitHub gère les versions, Stripe encaisse ; front TanStack Start, back Hono + Workers, base D1, stockage R2, cache KV — tout tourne sur Cloudflare."
date: 2026-06-15
minRead: 6
source: x
sourceUrl: https://x.com/realchendahuang/status/2066586160902881542
tags:
  - Cloudflare
  - Développement indépendant
  - Stack technique
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

> Post épinglé, publié à l'origine sur [X](https://x.com/realchendahuang/status/2066586160902881542), 40 000+ vues.

Meilleures pratiques 2026 de l'indie dev : **le combo Cloudflare du radin**.

## La stack en un coup d'œil

| Rôle | Choix | Coût |
|------|------|------|
| Écrire le code | Codex | Abonnement |
| Versioning | GitHub | Gratuit |
| Paiement | Stripe | Commission par transaction |
| Front | TanStack Start | Gratuit |
| Back | Hono + Cloudflare Workers | Quota gratuit |
| Déploiement | Cloudflare Pages | Gratuit |
| Base de données | Cloudflare D1 | Quota gratuit |
| Stockage de fichiers | Cloudflare R2 | Quota gratuit |
| Cache / config | Cloudflare KV | Quota gratuit |

## Pourquoi ce combo

### Codex : écrire le code, toute la stack

Le codage IA est déjà l'outil de productivité par défaut de l'indie dev. Le mode Agent de Codex compresse la chaîne « besoin → code → test → déploiement » au maximum : une seule personne fait le boulot d'une équipe.

### Front TanStack Start + back Hono

TanStack Start est un framework React full-stack qui s'accorde bien avec l'écosystème Workers. Pour le back, Hono — un petit framework né pour Workers : routing, middlewares, inférence de types, tout est agréable, c'est léger et ça démarre vite.

### Base D1 + stockage R2 + cache KV

Ce trio, c'est le cœur du quota gratuit Cloudflare :

- **D1** : base relationnelle compatible SQLite, le quota gratuit suffit largement pour un projet perso
- **R2** : stockage objet compatible S3, 10 Go gratuits, zéro frais de bande passante sortante — sur ce point ça écrase AWS
- **KV** : store clé-valeur distribué mondialement, parfait pour config, cache et sessions

### Déploiement Pages + toute l'infra gratuite

Pages se branche direct sur un repo GitHub : push = déploiement, avec CDN et HTTPS intégrés. Domaine, DNS, CDN — tout est géré par Cloudflare en un seul endroit, et le quota gratuit porte une ligne de produits complète.

## Le cœur de la stratégie du radin

- **Exploiter le quota gratuit à fond** : DNS, CDN, Pages, Workers, KV, D1, R2, Tunnel, AI Gateway — tout ce qui est gratuit, on l'active
- **Pas de thune tant qu'on peut se la couler douce** : l'abonnement va uniquement là où il compte (Codex), le reste c'est de l'infra gratuite
- **Une seule plateforme pour tout** : pas besoin de sauter entre plusieurs clouds, la charge mentale d'ops est minimale

## Pour qui

Les indie devs au budget serré qui veulent valider un produit vite ; les joueurs du codage IA qui ne veulent pas passer trop de temps sur l'infra ; et tous les projets « on lance d'abord, on verra après ».

Cloudflare, c'est le bodhisattva cybernétique de l'indie dev. Sans lâcher un centime, tu fais tourner un produit complet. Étape par étape : [Comment le tiers des gratos peut presser Cloudflare comme un citron](/blog/free-cloudflare).