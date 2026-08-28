---
title: He movido la agregación de suscripciones de proxys a Cloudflare
description: Varios servicios de proxy más tus nodos propios fundidos en una sola suscripción, las reglas de enrutamiento configuradas en el servidor y el cliente solo se suscribe.
date: 2026-06-28
original: true
tags:
  - Cloudflare
  - Evasión de censura
  - Proyecto open source
minRead: 4
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

Llevo usando servicios de proxy unos tres o cuatro años, y en medio también me he montado nodos en un VPS. Siempre hubo algo que me daba mucha pereza: tres o cinco suscripciones en la mano, más unas cuantas máquinas propias, esparcidas en los clientes y añadidas una a una; y las reglas de enrutamiento había que reconfigurarlas en cada cliente. Cambiar de dispositivo, cambiar de cliente, montárselo a un familiar… y otra vez a empezar.

Luego pensé: la suscripción no tiene por qué gestionarse suelta dentro de los clientes. Si la reúnes en un solo enlace, las reglas se fijan en el servidor y el cliente solo se suscribe, la cosa queda limpia. El enfoque de Sub-Store ya lo usaba, pero corría en tu propio servidor y la verdad es que me daba pereza mantenerlo. Así que esta vez me escribí una versión que corre en Cloudflare, llamada sub-store-cloudflare, open source en [GitHub](https://github.com/realchendahuang/sub-store-cloudflare).

## En realidad solo hace una cosa

Fundir varias fuentes de suscripción en una sola.

En concreto, puedes meterle varias cosas:

- Enlaces de suscripción de varios servicios de proxy
- Texto de nodos de tu propio VPS (da igual vless, trojan, ss o vmess)
- Incluso pegar un bloque de nodos temporal

Al entrar, el Worker las descarga, quita duplicados, filtra según las reglas que le des, y después renombra, añade banderas y resuelve dominios según haga falta. A la salida todo se funde en una suscripción combinada: el cliente se suscribe a esa sola.

Las reglas las he puesto en el servidor. Trae integrados varios plantillas de Mihomo habituales — acl4ssr, whitelist/blacklist de loyalsoldier, ai-streaming y esas — con los grupos de enrutamiento y los conjuntos de reglas configurados en la nube. Metes la suscripción en clientes como mihomo/clash, surge, sing-box o shadowrocket, y lo que se descarga es un producto terminado con las reglas ya incluidas: allí no hay que escribir reglas a mano ni mantener URLs de rule sets.

## Por qué justo en Cloudflare

Las razones son muy de andar por casa:

- **Sin servidor.** Workers + D1, y la cuota gratuita sobra para uso personal: te ahorras el dinero del servidor y su mantenimiento.
- **El dominio workers.dev ya está fuera del muro por sí mismo.** Tu cliente se conecta a por la suscripción sin problemas: no existe ese juego de muñecas rusas de "el servidor está fuera, pero el nodo aún necesita un proxy para tirar de su propia suscripción".
- **Al desplegar ya tienes un panel web de gestión y un endpoint de descarga.** Cambias de cliente en el móvil y aun así abres una página web para tocar la configuración.

A propósito mantengo la pila pequeña: Worker + Static Assets + D1 + Worker Secrets. KV, R2, Durable Objects, Queue y Cron se quedan fuera del camino crítico — cuantas menos piezas, mejor.

## El despliegue lo hice con dos caminos a propósito

El primero es para quien solo quiere usarlo: pinchar el botón Deploy to Cloudflare del repo. Cloudflare tira del repo, crea el Worker y el D1, te pide dos tokens, y al terminar te da un enlace de gestión con token. Paso a paso, sin tocar la línea de comandos.

El segundo es para mí y para quien le guste trastear: instalación en un clic con un agente de IA.

El repo lleva un protocolo de agente (AGENTS.md + una SKILL dentro del agente). Escribes en un archivo de configuración local tus fuentes de suscripción, las suscripciones combinadas que quieres y las plantillas de reglas, corres `pnpm run install:cloudflare`, y el agente comprueba tu login de Cloudflare, crea la base de datos, escribe los secretos, migra, despliega, importa la configuración, verifica los enlaces, y al final te entrega el enlace de gestión y el de descarga.

Yo desplegué el mío por este camino, así que lo recomiendo más: da menos guerra. Para usarlo con Codex / Claude Code, copia directamente ese prompt de `agent/install.prompt.md` del repo.

## Para quién es

Directo: si tienes más de un servicio de proxy, más unos cuantos nodos propios, y quieres fundirlos en una sola suscripción para tu uso, este es tu proyecto. Si te apañas con un solo servicio y ya está, de verdad no necesitas esto.

El código es 100% open source, AGPL. La interacción del frontend hace un guiño al Sub-Store original; el original corre en un contenedor y cubre un ecosistema de clientes más amplio. La mía es una forma más pequeña, nativa de Cloudflare: fácil de modificar y de desplegar directamente, no una copia pieza a pieza.

Si te pica la curiosidad, pásate por el repo; el README está bastante completo, sigue las instrucciones y listo.