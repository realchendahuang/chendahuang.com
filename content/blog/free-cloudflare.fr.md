---
title: Comment presser Cloudflare comme un citron quand on est gratuit, jusqu'où va le plan gratuit ?
description: "Le plan gratuit de Cloudflare peut supporter toute une infrastructure perso sur Internet : DNS, CDN, Pages, Workers, KV, D1, R2, email, Tunnel, AI Gateway, etc."
date: 2026-06-15
minRead: 8
source: x-article
sourceUrl: https://x.com/realchendahuang/article/2066528625378443300
tags:
  - Cloudflare
  - Quota gratuit
  - Déploiement
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

> Publié à l'origine sur [X Articles](https://x.com/realchendahuang/article/2066528625378443300).

Cloudflare peut à peu près porter toute une infrastructure perso sur Internet : domaine, site web, CDN, stockage objet, base de données, fonctions edge, tunnel intranet, relais email, captcha et passerelle IA — tout peut commencer avec le plan gratuit.

## DNS gratuit

Cloudflare est aussi registrar : les prix d'enregistrement et de renouvellement sont assez transparents. On peut aussi acheter un domaine chez Spaceship ou autre, puis héberger son DNS chez Cloudflare.

Un domaine raccordé à Cloudflare, et tu récupères un bon système de gestion DNS.

Point clé : la résolution n'est pas facturée au nombre de requêtes. Contrairement à certains gros acteurs locaux, vraiment dégoûtants, qui facturent à la résolution ? Faut pas abuser.

Cloudflare, c'est donc parfait pour les multi-domaines, les multi-sous-domaines et une matrice de petits projets.

Tu peux te faire :

- `api.xxx.com`
- `img.xxx.com`
- `cdn.xxx.com`
- `docs.xxx.com`
- `status.xxx.com`
- `admin.xxx.com`

Un seul domaine acheté, des sous-domaines différents pour chaque service, et pas de frais supplémentaires pour la résolution DNS elle-même.

Le trafic web qui a besoin d'un proxy peut passer par la petite orange, pour que Cloudflare gère proxying, cache et certificats HTTPS.

## CDN gratuit

Le cache CDN, c'est LE truc le plus absurde de Cloudflare. Beaucoup ont découvert Cloudflare grâce à ça. Pour un blog, un site vitrine ou un site de docs, le bénéfice direct est simple :

Une visite plus rapide, un serveur d'origine allégé, de la bande passante économisée. Surtout si ton VPS est très cheap, en le plaçant derrière Cloudflare, le ressenti s'améliore nettement.

## Pages gratuit

Pages héberge gratuitement les sites statiques et les projets front.

- Blog perso
- Site vitrine produit
- Site de docs
- Landing pages
- Page d'accueil de projet open source
- Pages de supports de cours
- Page de liste d'attente
- Pages d'instructions de téléchargement
- Page de promo d'e-book

Ce type de page peut être hébergé direct, sans acheter de serveur. Avec ton propre domaine branché dessus, ça devient un site perso ou une home de projet qu'on maintient sur le long terme.

## Workers gratuit

Quand le site a besoin d'une API, d'authentification ou d'autres logiques dynamiques, on utilise Workers. Le code tourne sur le réseau de Cloudflare, pas de serveur à maintenir soi-même ; en plus de JavaScript / TypeScript, ça supporte WebAssembly et d'autres modes d'exécution.

Le plan gratuit donne 100 000 requêtes par jour. Si un projet perso dépasse vraiment cette quantité de façon stable, le plan payant n'attendra pas longtemps.

Workers Paid démarre à 5 dollars par mois.

Beaucoup de petits projets n'ont pas besoin d'un vrai backend complet. Un seul Worker suffit.

## KV gratuit

KV accueille les données à lire vite mais sans forte consistance, comme la config, les feature flags et les résultats en cache. Ce n'est pas un vrai substitut à Redis, mais pour un projet perso, beaucoup de besoins simples sont couverts.

## D1 gratuit

D1 est la base de données SQLite hébergée par Cloudflare, adaptée aux données relationnelles. Le plan gratuit offre 5 Go de stockage, avec des quotas quotidiens séparés pour les lectures et les écritures.

## R2 gratuit

R2 est le stockage objet compatible API S3, adapté aux images, pièces jointes et sauvegardes. Son plus gros atout : pas de frais de bande passante directement à la sortie, les coûts reposent surtout sur le stockage et le nombre d'opérations ; le plan gratuit offre aussi un quota de stockage et de requêtes.

Tu peux y mettre :

- Images
- Pièces jointes
- PDF
- Supports de cours
- Paquets de logiciels
- Fichiers de sauvegarde
- Avatars users
- Images Markdown
- Ressources statiques
- Jeux de données
- Fichiers audio
- Petits assets vidéo

## Email Routing gratuit

Email Routing peut rediriger les mails envoyés à ton domaine personnalisé vers ta boîte existante, dès le plan gratuit. Cloudflare propose aussi l'envoi d'emails transactionnels via Workers (Email Sending), mais envoyer à n'importe quel destinataire exige Workers Paid — à ne pas confondre avec le relais de réception gratuit.

## Turnstile gratuit

Turnstile est le captcha de Cloudflare, qui évite généralement de faire reconnaître des feux tricolores ou des caractères tordus à l'utilisateur. À placer sur :

- Login
- Inscription
- Commentaires
- Formulaires de contact
- Liste d'attente
- Pages de téléchargement
- Inscription newsletter

## Tunnel gratuit

Pour donner accès externe à un NAS, une machine de dev locale ou un serveur de jeu à la maison, on peut utiliser Tunnel : un canal qui part du réseau interne pour rejoindre Cloudflare.

Ton NAS, ta machine de dev locale, tes services internes peuvent être exposés via Cloudflare Tunnel. La valeur clé :

- Pas d'IP publique
- Pas de règle de redirection de port sur le routeur
- Pas d'exposition de l'IP du serveur d'origine
- On peut y rattacher son propre domaine

Par exemple :

- `nas.xxx.com`
- `dev.xxx.com`
- `panel.xxx.com`
- `n8n.xxx.com`
- `home.xxx.com`

Pour les passionnés de serveurs maison, c'est excellent.

## Access gratuit

Access se met devant l'admin, les environnements de test et les outils internes : on vérifie l'identité avant de laisser passer. Code par email, Google, GitHub ou sources d'identité d'équipe, tout se branche, sans réécrire un système de login pour une simple page interne. Par exemple :

- Seules certains emails peuvent passer
- Seule la connexion Google peut passer
- Seule la connexion GitHub peut passer
- Seuls les membres de l'équipe peuvent passer

C'est très pratique pour protéger un back-office, un environnement de test ou des outils internes.

## AI Gateway gratuit

AI Gateway peut se placer devant les différents fournisseurs de modèles : il enregistre uniformément requêtes, latence, erreurs et hits de cache, et permet de limiter le débit et les fallbacks. Quand on démarre un produit IA, gérer plusieurs APIs compatibles derrière une seule entrée fait gagner du temps.

Il t'aide à voir :

- Le volume de requêtes
- La latence
- Les erreurs
- Les hits de cache
- Les appels de modèles
- Le rate limiting
- Les fallbacks

Tu branches OpenAI, Anthropic, Workers AI, toutes sortes d'APIs compatibles, et tu mets une couche devant.

Dès qu'on démarre un produit IA, c'est un très bon point d'entrée unifié.

## Browser Run gratuit

Cloudflare appelle maintenant cette capacité Browser Run. Ça lance des sessions de navigateur complètes dans le cloud, pilotées par du code ou de l'IA.

Ça sert à :

- Screenshots web
- Conversion web → Markdown
- Tests d'automatisation web
- Collecte du contenu de pages
- Parsing de pages dynamiques
- Conversion web → PDF

Un quota gratuit existe chaque jour.

## Images Transform gratuit

Cloudflare Images a un quota de transformation d'images : redimensionnement, crop et conversion de formats. Pour un gros volume, il faut compter à part, ou lancer son propre service de transcodage avec Container sur un Workers payant.

À associer avec R2 :

- R2 pour les images originales
- Images pour les miniatures et conversions de format
- Cloudflare pour la distribution en cache

Parfait pour les couvertures de blog, avatars, images produits, illustrations d'articles.

Le quota gratuit de Cloudflare couvre déjà pas mal de projets perso. Quand on atteint réellement des volumes de requêtes, du temps de calcul ou des besoins payants plus importants, on remonte à partir de Workers Paid à 5 dollars par mois.

Et là, j'ai envie de dire : Cloudflare, envoie la thune !!