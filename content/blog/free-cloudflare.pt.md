---
title: Como usuário gratuito, como espremer a Cloudflare até a última gota — até onde o free tier realmente grátis?
description: "O plano gratuito da Cloudflare sustenta a infraestrutura pessoal inteira: DNS, CDN, Pages, Workers, KV, D1, R2, email, Tunnel, AI Gateway e mais."
date: 2026-06-15
minRead: 8
source: x-article
sourceUrl: https://x.com/realchendahuang/article/2066528625378443300
tags:
  - Cloudflare
  - Franquia grátis
  - Deploy
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

> Original publicado no [X Articles](https://x.com/realchendahuang/article/2066528625378443300).

A Cloudflare consegue sustentar praticamente uma infraestrutura pessoal inteira: domínio, site, CDN, object storage, banco de dados, edge functions, túnel para rede interna, encaminhamento de email, verificação anti-bot e AI gateway — tudo já pode começar no free tier.

## DNS grátis

A Cloudflare também é registradora de domínios, com preço de registro e renovação transparente. Você também pode comprar o domínio em plataformas como Spaceship e hospedar o DNS na Cloudflare.

Domínio na Cloudflare, e você ganha um sistema de gestão DNS decente na hora.

O ponto-chave: resolução não é cobrada por quantidade de consultas. Diferente de certas grandes empresas por aí que cobram por quantidade de resoluções? Um absurdo sem-vergonha.

Isso torna a Cloudflare ótima para muitos domínios, muitos subdomínios e uma matriz de projetos pequenos.

Você pode criar:

- `api.xxx.com`
- `img.xxx.com`
- `cdn.xxx.com`
- `docs.xxx.com`
- `status.xxx.com`
- `admin.xxx.com`

Compra um domínio e distribui subdomínios diferentes para serviços diferentes; a resolução DNS em si não tem custo extra.

Para tráfego web que precisa de proxy, ligue a "nuvem laranja" e deixe a Cloudflare cuidar do proxy, cache e certificado HTTPS.

## CDN grátis

O cache da CDN é a parada mais foda da Cloudflare. Muita gente conhece a Cloudflare por causa disso. Para blog, site institucional e site de documentação, o valor mais direto é:

acesso mais rápido, origem mais leve, banda economizada. Principalmente se você usa um VPS baratinho: botar a Cloudflare na frente muda a experiência para melhor.

## Pages grátis

A Pages hospeda gratuitamente sites estáticos e projetos de frontend.

- Blog pessoal
- Site institucional do produto
- Site de documentação
- Landing page
- Página do projeto open source
- Página de material de curso
- Página de lista de espera
- Página de instruções de download
- Página de divulgação de e-book

Essas páginas podem ser hospedadas direto, sem servidor próprio. Depois de apontar seu domínio, vira um site pessoal ou página de projeto mantida a longo prazo.

## Workers grátis

Se o site precisa de API, autenticação ou outra lógica dinâmica, use Workers. O código roda na rede da Cloudflare, sem manter servidor; além de JavaScript/TypeScript, aceita também WebAssembly e outros modos de execução.

O plano grátis tem 100 mil requisições por dia. Se o projeto pessoal passa disso de forma estável, aí sim vale abrir o plano pago.

O Workers Paid começa em US$ 5 por mês.

Muitos projetos pequenos nem precisam de um backend completo. Um Worker já resolve.

## KV grátis

O KV serve para dados que precisam de leitura rápida, mas não exigem consistência forte — config, feature flags e resultados em cache, por exemplo. Não substitui um Redis completo, mas para muitas necessidades simples de projeto pessoal resolve.

## D1 grátis

O D1 é o banco de dados SQLite gerenciado pela Cloudflare, ideal para dados relacionais. No free tier, o armazenamento total é 5 GB, com cotas diárias separadas de leitura e escrita.

## R2 grátis

O R2 é object storage compatível com a API do S3, ótimo para imagens, anexos e backups. A maior vantagem: a saída de dados do R2 não cobra banda; o custo depende principalmente do volume armazenado e do número de operações. O free tier tem uma cota de armazenamento e de requisições.

Dá para guardar:

- Imagens
- Anexos
- PDFs
- Material de curso
- Pacotes de software
- Arquivos de backup
- Avatares de usuário
- Imagens do Markdown
- Assets estáticos
- Datasets
- Arquivos de áudio
- Clipes de vídeo curtos

## Email Routing grátis

O Email Routing encaminha mensagens enviadas para seu domínio personalizado para uma caixa de entrada existente, e funciona no free tier. A Cloudflare também tem hoje o Email Sending, que envia emails transacionais via Workers — mas para enviar para destinatário arbitrário é preciso Workers Paid, então não confunda com o encaminhamento de recebimento que é grátis.

## Turnstile grátis

O Turnstile é a verificação humano x robô da Cloudflare; normalmente o usuário não precisa identificar semáforo nem caracteres distorcidos. Serve para colocar em:

- Login
- Cadastro
- Comentários
- Formulário de contato
- Lista de espera
- Página de download
- Assinatura de email

## Tunnel grátis

Quer expor o NAS de casa, a máquina de dev local ou o servidor de jogo para a internet? O Tunnel cria um túnel da rede interna que se conecta ativamente à Cloudflare.

Seu NAS, sua máquina de desenvolvimento, seus serviços de rede interna podem sair para o mundo via Cloudflare Tunnel. O valor central:

- Sem IP público
- Sem abrir porta no roteador
- Sem expor o IP da origem
- Dá para apontar seu próprio domínio

Por exemplo:

- `nas.xxx.com`
- `dev.xxx.com`
- `panel.xxx.com`
- `n8n.xxx.com`
- `home.xxx.com`

Isso é um manjar dos deuses para quem mexe com servidor caseiro.

## Access grátis

O Access fica na frente de painéis, ambientes de teste e ferramentas internas, validando identidade antes de liberar. Dá para conectar código de verificação por email, Google, GitHub ou identidade do time — sem precisar escrever mais um sistema de cadastro/login só para uma página interna. Exemplos:

- Só entra quem tem o email especificado
- Só entra quem loga com Google
- Só entra quem loga com GitHub
- Só entra quem é do time

Isso é muito bom para proteger painéis, ambientes de teste e ferramentas internas.

## AI Gateway grátis

O AI Gateway fica na frente dos provedores de modelo, registrando de forma unificada requisições, latência, erros e cache hits, além de rate limiting e fallback. No início do desenvolvimento de produto de IA, gerenciar várias APIs compatíveis por uma única porta economiza bastante trabalho.

Ele te ajuda a ver:

- Volume de requisições
- Latência
- Erros
- Cache hits
- Chamadas de modelo
- Rate limiting
- Fallback

Você conecta OpenAI, Anthropic, Workers AI, várias APIs compatíveis — e coloca uma camada na frente de todas.

No início de um produto de IA, é ótimo como porta de entrada única.

## Browser Run grátis

Hoje a Cloudflare chama isso de Browser Run. Ele inicia sessões completas de navegador na nuvem, controláveis por código ou por IA.

Serve para:

- Screenshot de página
- Página para Markdown
- Teste automatizado de página
- Coleta de conteúdo de página
- Parse de páginas dinâmicas
- Página para PDF

Tem franquia gratuita diária.

## Images Transform grátis

O Cloudflare Images tem cota de transformação de imagem, com redimensionamento, corte e conversão de formato. Em uso intenso, é cobrado à parte; em Workers pagos dá para rodar um serviço de transcodificação próprio em Container.

Dá para combinar com o R2:

- R2 guarda a imagem original
- Images faz thumbnail e conversão de formato
- Cloudflare distribui via cache

Serve para capa de blog, avatar, foto de produto, ilustração de artigo.

A franquia grátis da Cloudflare já cobre bastante coisa de projeto pessoal. Quando você realmente precisar de mais volume de requisições, tempo de computação ou recursos pagos, aí sim sobe a partir dos US$ 5 mensais do Workers Paid.

E aqui, quero declarar: Cloudflare, manda o pix!!