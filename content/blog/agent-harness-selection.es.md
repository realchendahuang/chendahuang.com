---
title: "Probé Pi Agent, OMP, Codex y ZCode: por qué al final elegí OpenCode + OpenChamber"
description: "Mi reflexión tras probar distintos Agent Harness: con tres criterios — experiencia de GUI, bloqueo de proveedor y libertad de desarrollo a medida — descarté Pi Agent, OMP, Codex y ZCode, y acabé eligiendo el núcleo OpenCode + la interfaz OpenChamber."
date: 2026-08-06
minRead: 6
source: x
sourceUrl: https://x.com/realchendahuang/status/2085410520459604026
tags:
  - AI Agent
  - Elección de herramientas
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

> Publicado originalmente en [X](https://x.com/realchendahuang/status/2085410520459604026)。

Últimamente he estado trasteando con Pi Agent, OMP, ZCode, Codex y OpenCode — estos Agent Harness — y por fin entendí cuál es mi verdadera necesidad.

## Mis tres criterios

### Primero: una GUI madura y estable

Acostumbrado a las GUI, las TUI ya no me valen. Chatear en una caja negra es horrible: tienes que memorizar muchísimos atajos y muchísimos comandos para poder usarla de verdad. En cambio, con una GUI basta con hacer clic en iconos y botones.

Así que necesito sí o sí una página GUI madura, estable y bonita.

Este criterio descarta de entrada a **Pi Agent** y a **OMP**. No es que el núcleo sea malo, es que la GUI de la comunidad que traen está fatal hecha. Cocinarte una a mano te cuesta un montón, y como estas herramientas son tan personalizables, tu GUI hecha a mano no sirve para nada más: cambias de máquina, cambias de persona, y todo a la papelera.

### Segundo: sin bloqueo de proveedor, sin favoritismo

Codex sí abrió una interfaz de configuración para modelos de terceros, pero configurarlos es un coñazo, y los modelos de terceros siempre son "ciudadanos de segunda": aplastados por los modelos oficiales, arrastrados por el ritmo de actualizaciones. Eso me tiene mosqueado.

ZCode es peor: no hay forma de entrar por OAuth en los Coding Plan de cada casa (Kimi For Code, Grok Build… en ZCode no funcionan, a menos que te pongas a hacer malabares raros).

Así que descarté ZCode, Codex y ese tipo de software que favorece a un proveedor de modelos.

### Tercero: open source y con posibilidad de desarrollo a medida

Necesito desarrollárselo a medida y personalizarlo según mis propias necesidades, para poder dar a mis clientes algo fácil de usar desde el primer segundo. Así que tiene que ser un producto open source y con licencia amigable: que me deje disfrutar a mí y que a mis clientes les sea sencillo usarlo, sin tanto hackeo raro.

## La respuesta final: OpenCode + OpenChamber

Después de filtrar todo, lo único que realmente se puede elegir es **OpenCode**.

Pero OpenCode es solo el núcleo de un agente. Para darle una GUI madura, estable y cómoda, por fin encontré la respuesta de verdad: **OpenChamber**.

- Núcleo: OpenCode, open source, sin bloqueo de proveedor, soporta cualquier modelo
- Interfaz: OpenChamber, un panel de trabajo GUI maduro
- Combinación: núcleo estable + interfaz cómoda, y además con posibilidad de desarrollo a medida

Repo open source: <https://github.com/openchamber/openchamber>

## Algunas reflexiones

Elegir herramientas es, en el fondo, elegir "quién tiene la sartén por el mango en tu vida".

Por muy bueno que sea un tool cerrado, la dirección de las actualizaciones, el soporte de modelos y la estrategia de precios las decides tú cero veces: solo puedes aceptarlas pasivamente. Con una combinación de open source + sin bloqueo, siempre tienes salida y siempre tienes libertad para modificarlo.

Y sobre la guerra TUI vs GUI, no te empeñes. Las herramientas se usan para trabajar, no para demostrar que te sabes la línea de comandos. Una interfaz cómoda, con la que puedas aguantar a largo plazo, es lo que más importa de todo.

Lecturas relacionadas: [Experiencia a fondo del DeepSeek V4 Flash oficial](/blog/deepseek-v4-flash-review)