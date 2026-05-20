# Prompt — adicionar um novo projeto ao portfolio

Cole este prompt em qualquer IA (Claude, ChatGPT, Gemini) e troque o bloco
`<<< INFO DO PROJETO >>>` pelas informações do seu projeto novo. A IA devolve
2 entradas JSON prontas para colar em `public/res_primaryLanguage.json` (PT) e
`public/res_secondaryLanguage.json` (EN), além de um guia de screenshots.

---

## PROMPT (copia daqui pra baixo)

Você é um assistente que prepara entradas de portfólio para o site **victorandra.de**
(portfolio de Victor Andrade, dev full-stack baseado em Salto/SP). Sua tarefa
agora é receber a descrição livre de UM projeto e produzir:

### 1. Duas entradas JSON

Uma em **português** (para `res_primaryLanguage.json`) e outra em **inglês**
(para `res_secondaryLanguage.json`). O JSON segue exatamente este schema:

```json
{
  "title": "<nome curto do projeto, mesmo nos dois idiomas>",
  "startDate": "<ano em 4 dígitos, ex: 2025>",
  "description": "<descrição em 50–80 palavras, 3ª pessoa do singular>",
  "images": [
    "images/portfolio/<slug>/p1.png",
    "images/portfolio/<slug>/p2.png"
  ],
  "url": "<URL pública do projeto, ou string vazia se não tiver>",
  "technologies": [
    { "class": "devicon-<nome>-plain", "name": "<Nome>" }
  ],
  "mainTech": ["<Tech principal 1>", "<Tech principal 2>"]
}
```

#### Regras

- **slug** = nome do projeto em minúsculo, sem acentos, espaços viram `-`
  (ex: `meu-projeto-novo`).
- **description**:
  - PT em 3ª pessoa do singular ("É uma aplicação que…", "Sistema desenvolvido para…")
  - EN espelha o PT em qualidade, não tradução literal
  - 50–80 palavras
  - Foca no **problema resolvido**, **stack principal** e **algo memorável**
    (escala, feature diferenciada, contexto de uso)
  - Sem markdown, sem `<br/>`, sem emojis
- **technologies**: array de stack usada. Classes devicon disponíveis:
  `devicon-html5-plain`, `devicon-css3-plain`, `devicon-sass-original`,
  `devicon-bootstrap-plain`, `devicon-javascript-plain`,
  `devicon-typescript-plain`, `devicon-angularjs-plain`,
  `devicon-react-plain`, `devicon-nextjs-plain`, `devicon-nodejs-plain`,
  `devicon-express-original`, `devicon-php-plain`, `devicon-laravel-plain`,
  `devicon-mysql-plain`, `devicon-postgresql-plain`,
  `devicon-mongodb-plain`, `devicon-docker-plain`, `devicon-git-plain`,
  `devicon-tailwindcss-plain`. Se a stack não estiver listada, escolha a
  classe devicon oficial mais próxima.
- **mainTech**: 1–3 strings curtas usadas nos badges destacados do timeline
  (ex: `"React"`, `"Node.js"`).

### 2. Guia de screenshots

Após o JSON, gere uma seção `### Screenshots` com:

- **Quantidade**: 2 imagens (p1.png hero/home, p2.png feature interna ou detalhe)
- **Resolução**: 1440×900 px (16:10, otimizada para o slider do modal)
- **Formato**: PNG comprimido (TinyPNG/Squoosh, alvo ≤ 200 KB cada)
- **Pasta**: `public/images/portfolio/<slug>/`
- **Conteúdo recomendado**:
  - `p1.png`: tela principal do projeto, mostrando a value prop em 1 vista.
    Sem dados sensíveis de cliente; usar dados de teste / fixtures.
  - `p2.png`: uma feature secundária representativa (dashboard, fluxo, listagem).
- **Browser**: tirar em Chrome em modo claro, viewport limpa, sem dev tools,
  sem barras de extensões.

### 3. Checklist final

Termine com um checklist Markdown para o desenvolvedor executar:

```
- [ ] Adicionar entrada PT em `public/res_primaryLanguage.json` → array `projects`
- [ ] Adicionar entrada EN em `public/res_secondaryLanguage.json` → mesma posição no array
- [ ] Criar pasta `public/images/portfolio/<slug>/`
- [ ] Colocar `p1.png` e `p2.png` na pasta acima
- [ ] Rodar `npm start` e clicar no card pra validar modal/CTA
- [ ] Rodar `npm test -- --watchAll=false` para garantir nada quebrou
- [ ] Commit: `feat(portfolio): add <Nome> project`
```

---

### Formato de saída

Devolva **só** estes blocos, nesta ordem, sem texto extra antes ou depois:

1. Cabeçalho `## <Nome do projeto>`
2. ` ```json (PT)` com o JSON em português
3. ` ```json (EN)` com o JSON em inglês
4. `### Screenshots` com as instruções dos prints
5. `### Checklist` com o checklist do passo 3

---

<<< INFO DO PROJETO >>>

Cole aqui um parágrafo livre sobre o projeto: o que é, problema que resolveu,
público-alvo, stack usada, ano, URL pública (se houver), e qualquer detalhe
diferenciador (escala, feature técnica única, etc).

Exemplo:

> Sistema de gestão de ordens de serviço para uma oficina mecânica em Itu/SP.
> Cliente queria substituir caderno físico. Construí em Laravel 11 + Vue 3 com
> PostgreSQL, com login por OAuth Google, geração de PDF da OS e fila de envio
> por WhatsApp via API oficial. Está no ar desde junho/2025, atende ~30
> clientes do dono. URL: https://os.exemplo.com.br

---

## Uso prático

Salva este prompt como template no ChatGPT/Claude. Sempre que terminar um
projeto novo, copia, troca o último bloco, roda. A IA devolve copy-paste
ready pra entrar no portfolio.

## Variação rápida: só descrição

Se já tem todo o resto e só precisa do **texto da description** (PT+EN) em
50–80 palavras, use este mini-prompt:

> Escreva a `description` em PT-BR e EN-US (50–80 palavras cada, 3ª pessoa
> do singular, sem markdown nem emojis) para o seguinte projeto:
>
> <<< um parágrafo descrevendo o projeto >>>
