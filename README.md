# rp7-tech

Site institucional da RP7 Tech — [rp7.tech](https://rp7.tech)

## Stack

- [Astro](https://astro.build) (SSG + rota de API server-side)
- React (ilha do formulário de contato) + React Hook Form + Zod
- Tailwind CSS v4
- Deploy: Cloudflare Workers (static assets + SSR da rota `/api/contact`)
- Formulário de contato envia e-mail via binding `send_email` do Cloudflare

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
| `LEADS_EMAIL` | Destino dos emails do formulário. Deve ser um endereço verificado no Email Routing do Cloudflare |
| `PUBLIC_WHATSAPP` | Número do WhatsApp só com dígitos (DDI+DDD+número) |

Em produção, configure no dashboard: **Workers → rp7-tech-site → Settings → Variables and Secrets**.

## Configuração do site

Dados de contato, CNPJ e redes sociais ficam centralizados em
`src/config/site.ts` — edite lá e reflete no site inteiro.

## Deploy

Push no `main` dispara build + deploy automático no Cloudflare Workers.

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Domínios: `rp7.tech` e `www.rp7.tech`
