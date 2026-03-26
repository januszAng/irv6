import { renderToStaticMarkup } from "react-dom/server";
import { createElement as h } from "react";
import {
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  unlinkSync,
} from "node:fs";
import { fileURLToPath } from "node:url";
import path, { dirname } from "node:path";
import App from "./App.js";
import { log } from "node:console";

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
log("Current file path:", __filename);
const __dirname = dirname(__filename);
log("Current directory path:", __dirname);
const distPath = path.join(__dirname, "dist");
const ih = "index.html";

const shell = readFileSync(path.join(__dirname, ih), "utf-8");

const app = renderToStaticMarkup(h(App));
const html = shell.replace("<!--ROOT-->", app);

if (!existsSync(distPath)) {
  mkdirSync(distPath);
} else {
  const files = readdirSync(distPath);
  for (const file of files) {
    unlinkSync(path.join(distPath, file));
  }
}

writeFileSync(path.join(distPath, ih), html);
