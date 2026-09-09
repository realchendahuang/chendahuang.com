---
title: "El Harness first-party no siempre es la respuesta: en la era de los modelos abiertos, elige modelo y Harness por separado"
description: "¿Claude? Pues Claude Code. En la era de los modelos abiertos ese instinto pide una actualización. La ventaja first-party es real, pero entrenar un buen modelo y construir un buen Harness son dos ingenierías distintas — este artículo explica por qué modelo y Harness ya se pueden elegir por separado, y trae un mapa de posicionamiento de cinco Harness."
date: 2026-09-09
minRead: 8
source: x
sourceUrl: https://x.com/realchendahuang/status/2093890559874388141
tags:
  - AI Agent
  - Harness
  - Elección de herramientas
author:
  name: Chen Dahuang
  avatar:
    src: /avatar.jpg
    alt: Chen Dahuang
---

> El argumento central se publicó primero en [X](https://x.com/realchendahuang/status/2093890559874388141); este artículo es la versión completa, con un mapa de posicionamiento de los cinco Harness.

El primer reflejo de casi todo el mundo al elegir un Coding Agent es totalmente natural: Claude → Claude Code; GPT → Codex; GLM → ZCode; DeepSeek → obviamente, primero el Harness propio de DeepSeek.

Y ese reflejo es totalmente sensato. La mayor ventaja del first-party es que conoce su propio modelo mejor que nadie.

## La ventaja first-party es real

Qué prompts le gustan al modelo, qué diseño del Tool Schema es más estable, cómo organizar un Context largo, qué capacidades trae cada versión nueva, dónde tropieza más fácilmente — el first-party suele saberlo todo antes que los terceros.

Así que en productos como Claude Code y Codex, donde modelo y Harness iteran juntos a largo plazo, la combinación first-party suele ser la versión más fuerte de la respuesta. En eso no voy a discutir.

## Pero entrenar un modelo y construir un Harness son dos ingenierías completamente distintas

Al llegar a modelos abiertos como DeepSeek y GLM, la cosa se pone interesante — porque entrenar un buen modelo y construir un buen Harness son dos ingenierías totalmente diferentes.

Cuando un Coding Agent se pone realmente en marcha, aparece un montón de problemas fuera del modelo:

- Cómo se leen los archivos, cómo se edita el código
- Cómo se controla el Agent Loop, cómo se comprime el Context
- Cómo se aprovecha el Cache, cómo se recupera un Tool Call fallido
- Cómo se programan los Subagents, cómo se gestionan los permisos

Lo bien que se haga todo eso determina directamente si el mismo modelo acaba siendo bueno de usar. El mismo modelo en otro Harness puede ser un cambio de día y noche.

## El problema mayor: los modelos se actualizan demasiado rápido

Hoy manda GLM, el mes que viene DeepSeek quizá suelta un Flash aún más potente, y un rato después otro modelo nuevo les alcanza.

Si todo tu workflow de codificación está atado al producto first-party de una sola casa, cambiar de modelo suele significar cambiar también de herramientas y de hábitos. Meses de configuración, memoria y workflows afinados, a la basura.

Ahí es exactamente donde los Harness de terceros justifican su existencia: **puedes fijar las herramientas, Skills, MCP, permisos y workflows que ya dominas, y cambiar solo el modelo de debajo.** Hoy DeepSeek, mañana GLM, pasado otra cosa — tu entorno de trabajo no se tira a la basura.

## Un mapa de posicionamiento de cinco Harness

Dónde está cada uno de los cinco grandes, según mi experiencia a finales de agosto de 2026:

**Pi**: filosofía minimalista; el Harness interfiere lo mínimo posible con el modelo. Ligero, rápido, bajo consumo de Token, moldeable al extremo. Ideal como base para tu agente de larga duración — simple, limpio, hackeable a placer.

**OMP**: apila sobre Pi capacidades pesadas de codificación — LSP, Debugger, Browser, AST — como equipar al agente con un IDE completo. Para codificación de verdad intensiva y navegación de repos complejos.

**DeepSeek Harness**: llega más lejos que nadie — Everything is Plugin. Agent Loop, herramientas, permisos, Presets y UI se desmontan y recombinan. Para quienes trastean con arquitecturas de agentes, Presets, multi-agente y Runtime de nueva generación. Prueba más a menudo el modo PTC — más rápido y ahorra más token.

**OpenCode**: el más equilibrado del montón — open source, muchos Provider, ecosistema grande, Client/Server, app de escritorio y Subagents maduros. Para quien quiera un Coding Agent multi-modelo, generalista y maduro.

**Command Code**: una ruta completamente distinta — le encanta cubrir al modelo. Argumentos de Tool Call mal escritos se arreglan en local; lecturas de archivos duplicadas se deduplican; las sesiones largas mantienen un Stable Prefix para subir el Cache Hit; cuando el Context está a punto de explotar, Compaction. Aplicado a modelos de peón como DeepSeek V4 Flash o GLM-5.3 Flash, ahí vale su peso en oro: cuanto más flojo es el modelo, más recoge el Harness.

## Cómo lo elijo yo

Si solo miro la maleabilidad a largo plazo, sigo prefiriendo Pi. Pero si hoy me pidieran poner a DeepSeek V4 Flash o GLM-5.3 a currar en serio, le daría una oportunidad real a Command Code — la combinación modelo-Harness se configura por tarea, no por bando.

En la era de los modelos abiertos, modelo y Harness ya se pueden elegir por completo por separado. **Deja de preguntar «el modelo de quién con la herramienta de quién» y empieza a preguntar «en qué Harness rinde mejor este modelo».**
