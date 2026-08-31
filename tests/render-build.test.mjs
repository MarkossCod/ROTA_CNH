import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";
import { createRequire } from "node:module";
import ts from "typescript";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const output = new URL("../render-dist/", import.meta.url);
const html = await readFile(new URL("index.html", output), "utf8");

test("footer renders creator, brand, real navigation, privacy and license", async () => {
  const source = await readFile(new URL("../app/site-footer.tsx", import.meta.url), "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: {
    jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS,
  } }).outputText;
  const footerModule = { exports: {} };
  new Function("require", "module", "exports", compiled)(createRequire(import.meta.url), footerModule, footerModule.exports);
  const markup = renderToStaticMarkup(createElement(footerModule.exports.default, {
    backToTop: createElement("a", { href: "#inicio" }, "Voltar ao topo"),
  }));
  assert.match(markup, /<footer[^>]+aria-label="Rodapé Rota CNH"/);
  assert.match(markup, /src="\/rota-cnh-logo.png"/);
  assert.match(markup, /Criado e desenvolvido por/);
  assert.match(markup, /href="https:\/\/github.com\/MarkossCod"/);
  assert.match(markup, /<details[^>]*>[\s\S]*<summary>[\s\S]*armazenamento local/);
  assert.match(markup, /sem vínculo com o DETRAN/);
  assert.match(markup, /licença MIT/);
  assert.ok(markup.includes(`© ${new Date().getFullYear()}`));
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  for (const [, id] of markup.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(page.includes(`id="${id}"`), `navigation target #${id} exists`);
  }
  assert.match(page, /<\/main>\s*<SiteFooter/);
});

test("Render entry has the brand, Portuguese metadata and a compiled application", async () => {
  assert.match(html, /<html lang="pt-BR">/);
  assert.match(html, /<title>Rota CNH/);
  assert.match(html, /id="root"/);
  assert.doesNotMatch(html, /src="\/main\.tsx"/);
  const script = html.match(/src="(\/assets\/[^\"]+\.js)"/);
  assert.ok(script, "compiled script reference");
  const bundle = await readFile(new URL(script[1].slice(1), output), "utf8");
  assert.match(bundle, /Rota CNH/);
  assert.match(bundle, /rota-aprovacao-progress/);
  assert.match(bundle, /rota-aprovacao-settings/);
  assert.doesNotMatch(bundle, /scroll-route-line/);
});

test("local CSS and brand assets exist in the deploy directory", async () => {
  const css = html.match(/href="(\/assets\/[^\"]+\.css)"/);
  assert.ok(css, "compiled CSS reference");
  assert.ok((await stat(new URL(css[1].slice(1), output))).size > 1000);
  for (const file of ["rota-cnh-logo.png", "og-rota-cnh.png"]) {
    assert.ok((await stat(new URL(file, output))).size > 1000, file);
  }
});
