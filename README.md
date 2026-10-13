# rp7-tech

Site institucional da RP7 Tech — [rp7.tech](https://rp7.tech)

## Stack

- [Astro](https://astro.build) (static site)
- Deploy: Cloudflare Pages

## Desenvolvimento

```sh
npm install
npm run dev
```

| Command           | Action                                      |
| :---------------- | :------------------------------------------ |
| `npm run dev`     | Dev server em `localhost:4321`              |
| `npm run build`   | Build de produção em `./dist/`              |
| `npm run preview` | Preview do build local                      |

## Deploy

Push no `main` dispara deploy automático via Cloudflare Pages.

- Build command: `npm run build`
- Output directory: `dist`
