# Rota CNH — publicação no Render

Nome sugerido: **Rota CNH**. Nome do serviço: `rota-cnh`.
O endereço desejado é `https://rota-cnh.onrender.com`, sujeito à disponibilidade. O endereço só está confirmado quando o Render o atribuir.

## O que foi preparado

- Logo original verde: `public/rota-cnh-logo.png`.
- Cartão de compartilhamento: `public/og-rota-cnh.png`.
- Publicação estática: `render/` + `vite.render.config.ts`, reutilizando a página React existente.
- Configuração automática: `render.yaml`.
- A configuração anterior de Sites foi preservada; não é usada pelo build do Render.

## Publicar

1. Crie um repositório privado no GitHub, GitLab ou Bitbucket e envie o código-fonte deste projeto. Não envie `node_modules`, `.git`, `.env`, `.wrangler`, `dist`, `render-dist`, `work` ou `outputs`.
2. Entre em https://dashboard.render.com/ e conecte esse repositório.
3. Escolha **New → Static Site** (não Web Service).
4. Use os valores abaixo:

| Campo | Valor |
| --- | --- |
| Name | `rota-cnh` (se disponível) |
| Branch | a branch que contém os arquivos, normalmente `main` |
| Root Directory | deixe vazio |
| Build Command | `npm ci --include=dev && npm run build:render` |
| Publish Directory | `render-dist` |
| NODE_VERSION | `22.22.0` |
| SKIP_INSTALL_DEPS | `true` |

5. Revise o acesso e os limites do plano: a publicação estática fica acessível publicamente. Confirme **Create Static Site** quando estiver de acordo.
6. Aguarde o status de publicação concluída e abra o endereço atribuído pelo Render.

Como alternativa, use **New → Blueprint** com o mesmo repositório: o Render lê o `render.yaml` e preenche a configuração.

Não há Start Command, servidor próprio, banco de dados nem API key. Os links sociais recebem o endereço real por `RENDER_EXTERNAL_URL`; para domínio próprio, configure `SITE_URL` e refaça o build.

## Validar antes de publicar

```sh
npm ci --include=dev
npm run test:render
npm run preview:render
```

No site publicado, confira a escolha de dias/tempo, abrir dias do plano, marcar etapas e recarregar para verificar a persistência.

## Progresso e privacidade

O progresso e as preferências ficam somente no navegador, por endereço do site. Eles não migram automaticamente do endereço antigo nem sincronizam entre dispositivos. A página do Render não herda o acesso privado da hospedagem anterior. O projeto não coleta senhas nem tem conta de usuário.

## Referências

- https://render.com/docs/static-sites
- https://render.com/docs/blueprint-spec
- https://render.com/docs/environment-variables
