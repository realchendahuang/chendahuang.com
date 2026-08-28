---
title: "Rellenando el hueco multimodal de DeepSeek: el plan de visión Qwen-3.7-Flash"
description: "DeepSeek V4 Flash no tiene multimodal. ¿Y si necesitas entender imágenes? Tras investigar, la opción con mejor relación calidad-precio hoy es Qwen-3.7-Flash: leer una imagen cuesta casi nada, y combinado con V4 Flash tapa el hueco."
date: 2026-08-06
minRead: 5
source: x
sourceUrl: https://x.com/realchendahuang/status/2085265465564336327
tags:
  - DeepSeek
  - Multimodal
  - Review de modelos
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

> Publicado originalmente en [X](https://x.com/realchendahuang/status/2085265465564336327), 89 mil visitas, 600+ me gusta.

Mucha gente se queja de que DeepSeek V4 Flash no tiene multimodal. Es verdad que es su punto flojo — pero no hace falta obsesionarse con un solo modelo.

## El problema

V4 Flash tiene la parte de texto al máximo, pero en escenarios de lectura de imagen se queda en blanco: capturas, imágenes de tablas, diseños de UI, documentos escaneados… nada de eso lo procesa.

Lo multimodal es el precio de "barato": el modelo tiene que hacer codificación visual, los parámetros se inflan y el coste sube.

## La solución: combinar modelos

Investigué las opciones de visión con mejor relación calidad-precio que hay ahora mismo, y la conclusión es **Qwen-3.7-Flash**.

El coste de leer una imagen es tan bajo que no importa. Lo usas como modelo de visión dedicado, el razonamiento de texto sigue con V4 Flash, y te llevas lo mejor de los dos.

## Cómo se combina

La idea más simple es un "router": si la entrada trae imagen → modelo de visión; si es solo texto → V4 Flash.

```js
// Pseudocódigo: rutear según la necesidad
function route(input) {
  if (hasImage(input)) {
    return qwenVision(input)   // leer imagen + extraer información clave
  }
  return deepseekV4Flash(input) // razonamiento de texto
}
```

Una jugada más avanzada es pasarle el resultado de la visión directamente a V4 Flash para que siga razonando:

1. Qwen-3.7-Flash lee la imagen y devuelve una descripción estructurada
2. La descripción + la pregunta original se las pasas a DeepSeek V4 Flash
3. V4 Flash razona en profundidad sobre la descripción, escribe código, resume

Así ves imágenes y a la vez disfrutas de lo barato y rápido de V4 Flash.

## Escenarios de uso

- Preguntar sobre capturas: mandarle capturas de errores, capturas de chats
- Imágenes de tablas/documentos a datos estructurados
- Diseños de UI a código
- Extraer información de escaneados como facturas y contratos
- Escenarios en los que el agente necesita "ver" la pantalla

## Por qué no otras opciones

Los grandes modelos de visión pura (los multimodales de la familia GPT, por ejemplo) son potentes, pero ahí está el precio: para procesar lotes a diario no compensa.

Qwen-3.7-Flash gana en relación calidad-precio: calidad de lectura suficiente, coste casi nulo, y puedes correr lotes grandes sin que duela.

## Resumen

Combinar modelos es lo normal; no esperes que un solo modelo lo haga todo.

V4 Flash como titular del texto (barato, rápido, mucho contexto), Qwen-3.7-Flash como refuerzo visual (barato, suficiente) — esta combinación es hoy la de mejor relación calidad-precio. Vas tapando lo que falte, y es mucho más práctico que esperar un modelo "todoterreno pero caro".

Lecturas relacionadas: [Experiencia a fondo del DeepSeek V4 Flash oficial](/blog/deepseek-v4-flash-review)