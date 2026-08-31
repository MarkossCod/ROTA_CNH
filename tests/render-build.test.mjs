import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const output = new URL("../render-dist/", import.meta.url);
const html = await readFile(new URL("index.html", output), "utf8");

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
