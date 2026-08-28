---
title: Migrei a agregação de assinaturas de proxy para a Cloudflare
description: Vários serviços de proxy mais os seus próprios nós fundidos em uma única assinatura, com as regras de roteamento configuradas no servidor — o cliente só assina.
date: 2026-06-28
original: true
tags:
  - Cloudflare
  - Contorno da rede
  - Projeto open source
minRead: 4
author:
  name: 陈大黄
  avatar:
    src: /avatar.jpg
    alt: 陈大黄
---

Uso serviços de proxy há três ou quatro anos, e no meio desse tempo também montei meus próprios nós de VPS. Sempre teve uma coisa que me incomodava: três ou cinco assinaturas na mão, mais algumas máquinas próprias, tudo espalhado no cliente, adicionando uma por uma — e as regras de roteamento precisam ser reconfiguradas em cada cliente. Trocar de aparelho, trocar de cliente, instalar para alguém da família: recomeça tudo de novo.

Aí eu pensei: assinatura não precisa ser gerenciada solta dentro do cliente. Junta tudo numa única URL, as regras ficam travadas no servidor, e o cliente só assina — a vida fica limpa. O esquema do Sub-Store eu já usava antes, mas ele roda no seu próprio servidor, e eu achava a manutenção um saco. Então dessa vez escrevi uma versão que roda na Cloudflare, chamada sub-store-cloudflare, open source no [GitHub](https://github.com/realchendahuang/sub-store-cloudflare).

## Na prática, ela faz só uma coisa

Junta múltiplas fontes de assinatura numa única assinatura.

Concretamente, você pode jogar algumas coisas lá dentro:

- As URLs de assinatura de vários serviços de proxy
- O texto dos nós do seu próprio VPS (vless, trojan, ss, vmess — qualquer um serve)
- Até colar um trecho temporário de nós

Depois disso, o Worker puxa, remove duplicados, filtra conforme as regras que você deu, e ajusta como precisar: renomeia, adiciona bandeira, resolve domínio. Na saída, tudo entra numa assinatura combinada — o cliente só assina aquela URL e pronto.

As regras eu deixei no servidor. Vêm com alguns templates Mihomo usados com frequência — acl4ssr, whitelist/blacklist do Loyalsoldier, ai-streaming e afins — com grupos de roteamento e conjuntos de regras configurados na nuvem. Você joga a assinatura em clientes como mihomo/clash, surge, sing-box, shadowrocket, e o que baixa já é o produto pronto com as regras de roteamento embutidas — sem precisar escrever regra manualmente nem manter URL de rule set do outro lado.

## Por que na Cloudflare, especificamente

Os motivos são bem pragmáticos:

- **Sem servidor.** Workers + D1: a franquia grátis dá conta do uso pessoal, e você economiza dinheiro de servidor e manutenção.
- **O domínio workers.dev já está fora do muro.** O cliente conectando ali para puxar a assinatura funciona direto — sem aquele absurdo de "servidor está fora, mas o nó ainda precisa de escada para puxar a própria assinatura".
- **Depois do deploy é só um painel web de gestão mais um endpoint de download.** Troca de cliente no celular e você ainda abre a página para mudar a configuração.

A stack eu mantive enxuta de propósito: Worker + Static Assets + D1 + Worker Secrets. KV, R2, Durable Objects, Queue, Cron não estão no caminho crítico — quanto menos, melhor.

## O deploy foi pensado em duas trilhas

A primeira é para quem só quer usar: é só clicar no botão Deploy to Cloudflare do repositório. A própria Cloudflare puxa o repo, cria o Worker, cria o D1, te pede dois tokens, e no fim te entrega um link de gestão com token. Passo a passo, sem encostar em linha de comando.

A segunda é pra mim e para quem gosta de mexer: instalação de um clique com AI Agent.

O repositório vem com um protocolo de agente (AGENTS.md + um SKILL dentro de agent). Você escreve as fontes de assinatura, as assinaturas combinadas que quer e os templates de regra num arquivo de configuração local, roda `pnpm run install:cloudflare`, e o agente cuida de verificar seu login na Cloudflare, criar o banco, escrever os secrets, migrar, fazer deploy, importar a configuração, validar os links e, no fim, entregar o link de gestão e o link de download nas suas mãos.

Eu mesmo soube da linha assim, então recomendo essa trilha — menos dor de cabeça. Para usar com Codex / Claude Code, é só copiar o prompt que está em `agent/install.prompt.md` no repositório.

## Para quem serve

Falando reto: se você tem mais de um serviço de proxy, mais alguns nós próprios, e quer fundir tudo numa única assinatura para uso próprio — esse projeto é para você. Se você vive tranquilamente com um único serviço, realmente não precisa disso.

O código é 100% open source, AGPL. A interação do frontend presta homenagem ao Sub-Store original; o original roda em container e cobre um ecossistema maior de clientes. O meu é uma forma mais enxuta, Cloudflare-native — mais fácil de modificar e de fazer deploy direto, sem ser uma clonagem item por item.

Quem tiver interesse pode bisbilhotar o repositório — o README é bem completo, é seguir os passos do deploy.