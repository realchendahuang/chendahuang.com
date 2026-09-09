---
title: "Estable, rápido, productivo, barato: mi stack de AI Coding, documentado entero"
description: "OpenCode + OpenChamber + dos suscripciones DeepSeek V4 Flash: 15 proyectos picando código a la vez y la cuota apenas baja. Toda mi configuración al desnudo — poda de Context, memoria en capas, automatización de escritorio y la lección de «volver a la combinación original»."
date: 2026-09-09
minRead: 8
source: x
sourceUrl: https://x.com/realchendahuang/status/2086611065920733305
tags:
  - OpenCode
  - Programación IA
  - Configuración
author:
  name: Chen Dahuang
  avatar:
    src: /avatar.jpg
    alt: Chen Dahuang
---

> El argumento central se publicó primero en [X](https://x.com/realchendahuang/status/2086611065920733305); este artículo es la crónica completa de mi configuración.

La conclusión primero: **OpenCode + OpenChamber + una suscripción DeepSeek V4 Flash vía OpenCode Go + una suscripción DeepSeek V4 Flash vía Ollama Cloud.**

Llevo mucho tiempo usando este combo a tope, y se resume en cuatro palabras: estable, rápido, productivo, barato. He tenido 15 proyectos abiertos a la vez, todos picando código, y la cuota apenas se movió.

## Por qué OpenCode + OpenChamber

El proceso de elección está en [otro artículo](/blog/agent-harness-selection); aquí solo las razones a nivel de resultado. OpenCode es hoy el núcleo multi-modelo más equilibrado — open source, muchos Provider, Client/Server, app de escritorio y Subagents maduros. OpenChamber es el Harness GUI open source con el frontend mejor pulido que he usado: su autor lo mantiene con muchísimo cariño, refinado, estable, y sus pequeños bugs ocasionales no estorban para nada el uso a largo plazo.

Interfaz web + PWA — casi indistinguible de un cliente de escritorio, y actualizaciones sin tocar nada.

## La configuración gira en torno a tres necesidades

Mi configuración de OpenCode se construye sobre tres cosas: gestión del Context, sistema de memoria y capacidades externas.

**1. opencode-dcp (open source) — poda dinámica de Context.** Cuando el Context llega a un umbral, comprime automáticamente el contenido viejo en resúmenes técnicos: conserva la información clave, tira el ruido, limpia duplicados y elimina del Context el contenido de bajo valor, como los errores de herramientas. Sesiones largas sin que explote el Context — es la base que permite que una tarea larga siga corriendo todo el día.

**2. opencode-goal-plugin — gestión de objetivos.** Añade modo Goal a las tareas largas, para poder jalar de vuelta al agente cuando se desvía.

**3. Hermes Memory — memoria en capas (si hay demanda, la abro como open source más adelante).** Mi plugin más pesado: porté a OpenCode el mecanismo de memoria en capas del agente Hermes, que recuerda entre sesiones las preferencias del usuario, las decisiones del proyecto y las lecciones pasadas. Los proyectos nuevos no empiezan de cero.

**4. context7-MCP.** Consulta las últimas docs oficiales de librerías y frameworks — sin buscar a mano.

**5. grep-MCP.** Busca usos reales en todo el código de GitHub — mucho más fiable que escribir de memoria.

**6. open-computer-use — automatización de escritorio.** Permite que la IA opere directamente apps de macOS: clics, tecleo, scroll, arrastre, capturas, lectura del árbol de accesibilidad. Espectacular en pruebas y aceptación.

## Las cuentas de coste: cómo se gastan dos suscripciones

DeepSeek V4 Flash es el núcleo de rentabilidad de este stack: de verdad inteligente, de verdad barato. La suscripción de OpenCode Go cubre el workflow principal; la de Ollama Cloud actúa como segundo canal para repartir carga — las dos suscripciones juntas cuestan menos que un plan de codificación first-party de los de siempre, y producen más.

La famosa idea de que "los modelos dentro de shells de terceros se aboban" hay que desmontarla: **la raíz de la degradación es una shell que no hace Harness Engineering para el modelo**, no el acto de cambiar de shell en sí. El soporte de OpenCode para modelos abiertos es de primera división, y DeepSeek V4 Flash corre dentro estable y rápido — justo por eso me atrevo a apilar 15 proyectos encima.

## La lección: volver a la combinación original

En los grupos preguntan a menudo: ¿existe un escritorio universal de codificación con IA? Uno que conecte con todas las suscripciones y que nunca abobe a ningún modelo?

Después de hablar con unos cuantos amigos que trastean a fondo cada día, la conclusión fue unánime: no existe. Cada modelo con su combinación original.

- GPT → Codex: suscripción oficial en conexión directa, el scheduling nativo más estable.
- Gemini → AntiGravity: el techo de velocidad, ventanas largas sin atascos.
- DeepSeek, GLM y otros modelos abiertos → Harness amigos de los modelos abiertos como OpenCode / ZCode.

Mete un modelo en una shell que no le pega y básicamente no escapas de la degradación, la lentitud y las suscripciones que no funcionan. **Cada modelo en el sitio donde está más a gusto — la combinación es tu stack.**

## Para acabar

Este stack lleva meses corriendo, y el mayor cambio no es cuánto dinero he ahorrado — es que me atrevo a abrir tareas. Como es estable y barato, abrir 15 proyectos no me asusta. El valor de un stack de herramientas acaba midiéndose en cuánto trabajo te atreves a cargarle.
