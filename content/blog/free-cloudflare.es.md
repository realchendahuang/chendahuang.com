---
title: "Cómo exprimir Cloudflare siendo usuario gratuito: ¿hasta dónde llega la cuota gratis?"
description: "La versión gratuita de Cloudflare sostiene una infraestructura personal de internet completa: DNS, CDN, Pages, Workers, KV, D1, R2, email, Tunnel, AI Gateway, etc."
date: 2026-06-15
minRead: 8
source: x-article
sourceUrl: https://x.com/realchendahuang/article/2066528625378443300
tags:
  - Cloudflare
  - Cuota gratuita
  - Despliegue
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

> Publicado originalmente en [X Articles](https://x.com/realchendahuang/article/2066528625378443300).

Cloudflare puede sostener casi toda una infraestructura personal de internet: dominio, sitio web, CDN, almacenamiento de objetos, base de datos, funciones de edge, túnel a tu red interna, reenvío de email, captcha y gateway de IA, todo arranca desde la versión gratuita.

## DNS gratuito

Cloudflare también es registrador de dominios, y los precios de registro y renovación son bastante transparentes. También puedes comprar el dominio en plataformas tipo Spaceship y luego alojar el DNS en Cloudflare.

Al meter tu dominio en Cloudflare, te llevas un sistema de gestión de DNS muy apañado.

Lo importante: las consultas de resolución no se cobran por volumen. Nada que ver con algunas empresas grandes de aquí, que tienen la cara de cobrar por número de resoluciones. Qué poca vergüenza.

Cloudflare es justo lo que necesitas para muchos dominios, muchos subdominios y una matriz de proyectos pequeños.

Puedes montar:

- `api.xxx.com`
- `img.xxx.com`
- `cdn.xxx.com`
- `docs.xxx.com`
- `status.xxx.com`
- `admin.xxx.com`

Compras un solo dominio y das a cada servicio su subdominio; la resolución DNS en sí no se paga aparte.

El tráfico web que necesite proxy lo pones detrás de la naranjita, y Cloudflare se encarga del proxy, la caché y el certificado HTTPS.

## CDN gratuito

La caché del CDN es lo más bestia de Cloudflare. Muchísima gente conoce Cloudflare precisamente por esto. Para blogs, webs corporativas y sitios de documentación, el valor más directo es:

visitas más rápidas, origen más aliviado, y ancho de banda ahorrado. Sobre todo si usas un VPS baratísimo: poniéndole Cloudflare delante, la experiencia mejora mucho.

## Pages gratuito

Pages aloja gratis sitios estáticos y proyectos de frontend.

- Blog personal
- Web del producto
- Sitio de documentación
- Landing pages
- Página de un proyecto open source
- Página de materiales de un curso
- Página de lista de espera
- Página de instrucciones de descarga
- Página de promoción de un ebook

Este tipo de páginas se alojan directamente, sin comprar servidor aparte. Tras enlazar tu propio dominio, ya tienes un sitio personal o página de proyecto mantenible a largo plazo.

## Workers gratuito

Cuando el sitio necesite API, autenticación u otra lógica dinámica, usas Workers. El código corre en la red de Cloudflare, sin mantener tú un servidor; además de JavaScript/TypeScript, soporta WebAssembly y otros modos de ejecución.

La versión gratuita incluye 100 mil peticiones al día. Si un proyecto personal llega de forma estable a ese volumen, ya tendrás tiempo de pasarte a la versión de pago.

Workers Paid arranca en 5 dólares al mes.

Muchos proyectos pequeños no necesitan ni un backend completo. Con un solo Worker vale.

## KV gratuito

KV sirve para datos que necesitas leer rápido pero sin consistencia fuerte: configuración, feature flags y resultados en caché. No es un sustituto completo de Redis, pero para muchas necesidades simples de un proyecto personal sobra.

## D1 gratuito

D1 es la base de datos SQLite gestionada de Cloudflare, ideal para datos relacionales. La versión gratuita incluye 5 GB de almacenamiento total, con cuotas diarias de lectura y escritura aparte.

## R2 gratuito

R2 es almacenamiento de objetos compatible con la API de S3, ideal para imágenes, adjuntos y copias de seguridad. Su mayor ventaja: la salida de R2 no cobra ancho de banda; el coste depende sobre todo de la cantidad almacenada y de las operaciones; la versión gratuita incluye una cuota de almacenamiento y de peticiones.

Puedes meter ahí:

- Imágenes
- Adjuntos
- PDFs
- Materiales de cursos
- Paquetes de software
- Archivos de copia
- Avatares de usuario
- Imágenes de Markdown
- Recursos estáticos
- Conjuntos de datos
- Archivos de audio
- Clips de video cortos

## Email Routing gratuito

Email Routing reenvía al correo que ya tengas los emails enviados a tu dominio personalizado, y funciona en la versión gratuita. Cloudflare también tiene Email Sending para enviar emails transaccionales con Workers, pero escribir a destinatarios arbitrarios exige Workers Paid: no lo confundas con el reenvío de recepción gratuito.

## Turnstile gratuito

Turnstile es la verificación humano-máquina de Cloudflare, normalmente sin obligar al usuario a identificar semáforos o letras deformadas. Encaja bien en:

- Login
- Registro
- Comentarios
- Formularios de contacto
- Listas de espera
- Páginas de descarga
- Suscripción por email

## Tunnel gratuito

Tienes un NAS en casa, una máquina de desarrollo local o un servidor de juegos y quieres que sea accesible desde fuera: con Tunnel montas un canal que conecta tu red interna a Cloudflare de forma activa.

Tu NAS de casa, tu máquina de desarrollo local y tus servicios internos se exponen con Cloudflare Tunnel. El valor esencial:

- Sin IP pública
- Sin abrir puertos en el router
- Sin exponer la IP del origen
- Con tu propio dominio colgado

Por ejemplo:

- `nas.xxx.com`
- `dev.xxx.com`
- `panel.xxx.com`
- `n8n.xxx.com`
- `home.xxx.com`

Esto es oro puro para los que juegan con servidores caseros.

## Access gratuito

Access se pone delante de paneles de administración, entornos de prueba y herramientas internas: autentica antes de dejar pasar. Puede usar verificación por email, Google, GitHub u orígenes de identidad de equipo, sin necesidad de escribir otro registro/login solo para una página interna. Por ejemplo:

- Solo entran los de un email concreto
- Solo entran los de login con Google
- Solo entran los de login con GitHub
- Solo entran los del equipo

Esto es fantástico para proteger paneles, entornos de prueba y herramientas internas.

## AI Gateway gratuito

AI Gateway se pone delante de distintos proveedores de modelos, registrando de forma unificada peticiones, latencia, errores y aciertos de caché, y también hace rate limiting y fallback. Cuando arrancas un producto de IA, gestionar varias APIs compatibles a través de un solo punto de entrada te ahorra bastante.

Te permite ver:

- Volumen de peticiones
- Latencia
- Errores
- Aciertos de caché
- Llamadas a modelos
- Rate limiting
- Fallback

Conectes OpenAI, Anthropic, Workers AI o APIs compatibles varias, puedes ponerles una capa delante.

En las primeras fases de un producto de IA, es ideal como punto de entrada unificado.

## Browser Run gratuito

Cloudflare llama ahora a esta capacidad Browser Run. Arranca en la nube sesiones de navegador completas, controlables con código o con IA.

Sirve para:

- Capturas de pantalla de webs
- Webs a Markdown
- Tests de automatización web
- Recopilación de contenido de páginas
- Parseo de páginas dinámicas
- Webs a PDF

Cada día hay una cuota gratuita.

## Images Transform gratuito

Cloudflare Images tiene cuota de transformación de imágenes: escalar, recortar y cambiar de formato. Con volúmenes grandes toca calcularlo aparte, o montarte tú un servicio de transcodificación con Container en Workers de pago.

Encaja jugando con R2:

- R2 guarda la imagen original
- Images hace thumbnails y conversión de formato
- Cloudflare reparte con caché

Ideal para portadas de blog, avatares, fotos de producto e ilustraciones de artículos.

La cuota gratuita de Cloudflare ya cubre un montón de proyectos personales. Cuando de verdad necesites más volumen de peticiones, más tiempo de cómputo o capacidades de pago, subes desde los 5 dólares al mes de Workers Paid para arriba.

Y aquí quiero decir: Cloudflare, ¡págame la publicidad!!