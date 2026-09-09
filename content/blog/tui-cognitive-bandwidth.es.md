---
title: "La TUI está matando tu ancho de banda cognitivo: al «filtro geek» del AI Coding le toca romperse"
description: "Un montón de AI Coding Agents se lanzan a sacar TUIs, devuelven la interacción al paradigma de terminal de los 80 y lo llaman «inmersivo» y «respetuoso con los programadores». Este artículo desmonta los tres mecanismos con los que la TUI reduce sistemáticamente tu ancho de banda cognitivo — y por qué el Web UI es la respuesta correcta."
date: 2026-09-09
minRead: 7
source: x
sourceUrl: https://x.com/realchendahuang/status/2087949416808518106
tags:
  - Programación IA
  - Diseño de interacción
  - Ensayo
author:
  name: Chen Dahuang
  avatar:
    src: /avatar.jpg
    alt: Chen Dahuang
---

> El argumento central se publicó primero en [X](https://x.com/realchendahuang/status/2087949416808518106); este artículo es la versión completa.

Últimamente un montón de AI Coding Agents se lanzan a la TUI, y Claude Code tiene una buena parte de culpa de esa moda. Llevó a la perfección lo de conversar con una IA en la terminal para escribir código, pero de camino también instaló un gusto y una dependencia: un Coding Agent «de verdad» debería ser por defecto una interfaz de terminal; la versión web queda como un añadido, e incluso se burlan de ella por «no ser lo bastante programador».

¿Y el resultado? Primero montas una TUI complicada — colores, barras de estado, atajos, cambios de modo — y luego lo llamas «inmersivo», «eficiente» y «respetuoso con los programadores».

¿En serio?

## Crees que conversas, pero en realidad estás peleando

Para la minoría que vive dentro de la terminal todo el día, la TUI mola, sí. Para mucha más gente es un muro levantado a propósito. Cuando colaboras con un agente a través de una TUI, estás haciendo tres cosas sin parar:

**Recordar atajos y modos.** Cada herramienta tiene sus propias manías de teclado. Los novatos van perdidos; hasta los veteranos tienen que readaptarse al cambiar de herramienta.

**Localizar información en un chorro de caracteres que se desplaza.** El estado no está extendido delante de ti — está enterrado en una línea temporal que tienes que excavar haciendo scroll y buscando.

**Rezar para no haber caído en algún estado raro.** El cambio de modo es invisible; muchas veces no sabes en qué modo estás hasta que algo se rompe.

Eso ya no es interacción: es pelearse con la interfaz.

## Densidad de información no es eficiencia de información

La palabra favorita de los defensores de la TUI es «densidad de información». Pero llevar la densidad al extremo se paga pisoteando la legibilidad y la recuperabilidad hasta el mínimo.

Una interfaz realmente eficiente debería **desplegar el estado delante de ti**, dejando que tus ojos y tu sentido espacial entiendan — qué tarea está corriendo, qué sesión espera entrada, qué archivo se ha cambiado: un vistazo basta. En vez de obligarte a meterlo todo en la memoria a corto plazo mientras tu cerebro mantiene un mapa invisible del «estado actual del sistema».

La memoria de trabajo humana tiene de cuatro a siete huecos. El modelo de interacción de la TUI, en esencia, gasta tu recurso cognitivo más precioso en «recordar el estado de la interfaz» en lugar de en «pensar en el problema».

## Además está cultivando un mal hábito

Peor aún: el ecosistema TUI cultiva un juicio de valor roto — **tratar el dominio del teclado de una herramienta como una capacidad en sí misma.**

Como consecuencia, la gente gasta una energía enorme adaptándose a la interfaz en vez de pensar en el problema. La medida de un programador pasa a ser «sabes recitar estos atajos» y no «sabes descomponer el problema con claridad».

Una buena herramienta debería reducir el coste de pensar, no trasladar ese coste a «cómo se maneja esta interfaz».

## El Web UI puede ser rápido y limpio, sin problema

Hay quien dice que lo web es lento y poco «nativo». Estamos en 2026 — ese argumento lleva años muerto.

Un Web UI puede ser igual de rápido y limpio: instalado como PWA casi no se distingue de un cliente de escritorio, y actualizar es aún más fácil — sin upgrade manual, un refresco y ya tienes la última versión. Sesiones largas, tareas en paralelo, estados de tarea visualizados: exactamente ahí el DOM del navegador es fuerte, no el chorro de caracteres.

Mi setup principal es una interfaz web como OpenChamber sobre un núcleo OpenCode, usándolo mucho tiempo e intensivamente — firme como una roca. Si soy puntilloso: los bugs pequeños ocasionales de la parte web jamás afectan al uso a largo plazo; en cambio, ciertos cambios de modo de ciertas TUI me han fastidiado muchas veces.

## Las herramientas existen para que las usen personas, no para demostrar quién es más «geek»

Claude Code en sí es potente, eso no se discute. Pero popularizó la estética de que «la TUI es lo ortodoxo», y la peña que lo imitó después es peor — no les apetece ni hacer diseño de interacción y tratan el «vivir en la terminal» como prueba de sofisticación.

Envolver una interacción antihumana como sofisticación es de un ridículo tremendo.

Las herramientas existen para las personas. El criterio debería ser siempre: **¿ha bajado el coste total de terminar tu trabajo?** Si una interfaz te hace gastar energía en «pelearte con la interfaz», es un pasivo por muy «geek» que parezca.

La próxima vez que elijas un Coding Agent, quítate primero ese filtro.
