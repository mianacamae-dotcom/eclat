# Éclat — Website

Website da **Éclat**, empresa portuguesa de eventos corporativos de luxo.

O site está publicado gratuitamente através do **GitHub Pages**:
👉 https://mianacamae-dotcom.github.io/eclat/

## Estrutura

- `site/eclat.html` — **fonte canónica** da página (é aqui que se edita o site).
- `site/eclat-logo-champagne-pearl*.png` — logótipos oficiais (não redesenhar o sunburst).
- `public/og.png` — imagem de partilha social; `public/favicon.svg` — ícone.
- `scripts/build-static.mjs` — gera a pasta `dist/` publicável a partir de `site/eclat.html`
  (resolve o marcador `__ORIGIN__` e junta os assets). Não altera a fonte canónica.
- `.github/workflows/deploy.yml` — publica automaticamente no GitHub Pages a cada `push` para `main`.

## Publicar uma alteração

1. Edita `site/eclat.html`.
2. Faz `commit` e `push` para `main`.
3. O GitHub Actions gera o site e publica-o em https://mianacamae-dotcom.github.io/eclat/ (~1 min).

## Pré-visualizar localmente

```bash
node scripts/build-static.mjs
npx serve dist   # ou qualquer servidor estático, e abre index.html
```

## Regras de design (do handoff)

- Português europeu e acentos preservados.
- Logo compacto do topo **sem** tagline; logo grande do rodapé **com** tagline.
- Manter o sistema de movimento e respeitar `prefers-reduced-motion`.
- Verificar o resultado a desktop, 390 px e 320 px; atenção a palavras longas e itálicos cortados.
- Contacto: `ola.eclat@gmail.com`.
