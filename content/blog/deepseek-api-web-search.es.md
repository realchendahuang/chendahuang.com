---
title: "DeepSeek API con búsqueda en internet integrada: estírate la búsqueda oficial gratis con la Responses API"
description: "DeepSeek incorpora la búsqueda en internet dentro de su API: llama a deepseek-v4-flash con la interfaz Responses, declara la herramienta web_search y listo — sin integraciones con buscadores de terceros y sin pedir ninguna clave de búsqueda."
date: 2026-08-05
minRead: 6
source: x
sourceUrl: https://x.com/realchendahuang/status/2084826975102030013
tags:
  - DeepSeek
  - API
  - Herramientas IA
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

> Publicado originalmente en [X](https://x.com/realchendahuang/status/2084826975102030013). Triunfó: 230 mil visitas y 1000+ me gusta. Aquí cuento los detalles.

Encontré algo bueno: DeepSeek ha metido la búsqueda en internet dentro de su propia API.

## En una frase

Llama al modelo `deepseek-v4-flash` con la interfaz **formato Responses** y, con declarar la herramienta `web_search` en los parámetros de la petición, ya usas la búsqueda que ejecuta el servidor de DeepSeek.

Nada de integrarte buscadores de terceros, nada de pedir claves extra: todo el flujo de búsqueda lo gestiona oficialmente DeepSeek.

## Cómo se usa

Documentación oficial: <https://api-docs.deepseek.com/zh-cn/guides/responses_api>

Lo esencial es declarar la herramienta:

```js
const response = await fetch('https://api.deepseek.com/responses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
  },
  body: JSON.stringify({
    model: 'deepseek-v4-flash',
    tools: [{ type: 'web_search' }],
    input: '¿Qué cosas importantes pasaron en la industria de la IA en agosto de 2026?'
  })
})
```

Y ya está. La búsqueda, el scraping, el parseo y las citas los hace el servidor de DeepSeek.

## Por qué esto es clave

Antes, para que la IA tuviera información en tiempo real, tenías que montarte tú la cadena: elegir buscador (SerpAPI, Bing Search y demás) → pedir API Key → escribir el código de scraping y parseo → meter los resultados en el contexto → y además controlar el presupuesto.

Todo eso son mínimo un par de días, y con suerte una semana, y cada eslabón cuesta dinero: la API de búsqueda cobra por llamada y el scraping encima tiene que esquivar antirrobots.

Ahora DeepSeek lo trae integrado de serie, y encima usando `deepseek-v4-flash`, un modelo tan barato que da risa. Búsqueda y generación en una sola cadena, con un coste tan bajo que puedes tratarlo como agua del grifo.

## Para qué escenarios

- Contenido que necesita frescura (noticias del sector, comparativas de productos, lecturas de normativas)
- Agentes: fases de "buscar datos y luego decidir"
- Sistemas de atención/respuestas: buscar lo más reciente antes de responder
- Cualquier escenario en el que la "fecha de corte del conocimiento" del modelo se quede corta

## Avisos

1. **Usa la interfaz Responses**, no la vieja Chat Completions. La vieja no tiene esta herramienta.
2. El detalle de la búsqueda y el formato de las citas está en la documentación oficial; corre una llamada real para ver la estructura que devuelve.
3. Hay descuentos por caché. En contextos largos aprovéchalos, que se ahorra un buen pico.

Esto es estirarse gratis de verdad: la infraestructura de búsqueda más pesada te la regala oficialmente. Si lo necesitas, copia la receta.

Lecturas relacionadas: [Experiencia a fondo del DeepSeek V4 Flash oficial](/blog/deepseek-v4-flash-review)