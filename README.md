# rp7-tech

Site institucional da RP7 Tech — [rp7.tech](https://rp7.tech)

## Stack

- [Astro](https://astro.build) (SSG + rota de API server-side)
- React (ilha do formulário de contato) + React Hook Form + Zod
- Tailwind CSS v4
- Deploy: Cloudflare Workers (static assets + SSR da rota `/api/contact`)
- Leads gravados no Supabase

## Desenvolvimento

```sh
npm install
npm run dev
```

| Command           | Action                                 |
| :---------------- | :------------------------------------- |
| `npm run dev`     | Dev server em `localhost:4321`         |
| `npm run build`   | Build de produção em `./dist/`         |
| `npm run preview` | Preview do build local                 |

## Variáveis de ambiente

Copie `.env.example` para `.env` (dev) e configure no Cloudflare (produção):

| Variável | Uso |
| :------- | :-- |
| `SUPABASE_URL` | URL do projeto Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (server-side apenas, nunca expor no client) |
| `PUBLIC_WHATSAPP` | Número do WhatsApp só com dígitos (DDI+DDD+número) |

Em produção, configure no dashboard: **Workers → rp7-tech-site → Settings → Variables and Secrets** (`SUPABASE_*` como secrets).

### Supabase

O SQL da tabela `leads` está em `supabase/migrations/0001_create_leads.sql`.
Execute no SQL Editor do Supabase antes de usar o formulário.

## Configuração do site

Dados de contato, CNPJ e redes sociais ficam centralizados em
`src/config/site.ts` — edite lá e reflete no site inteiro.

## Deploy

Push no `main` dispara build + deploy automático no Cloudflare Workers.

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Domínios: `rp7.tech` e `www.rp7.tech`
