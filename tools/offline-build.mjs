// Build alternativo (esbuild + compilador Tailwind) usado quando Vite não está instalável.
// Uso: node tools/offline-build.mjs  -> gera ./dist
import { build } from '/opt/npm-tools/node_modules/esbuild/lib/main.js'
import { compile } from '/opt/npm-tools/node_modules/tailwindcss/dist/lib.mjs'
import fs from 'node:fs'
import path from 'node:path'
const root = process.cwd(), dist = path.join(root, 'dist')
fs.rmSync(dist, { recursive: true, force: true }); fs.mkdirSync(dist, { recursive: true })
fs.cpSync(path.join(root, 'public'), dist, { recursive: true })
await build({ entryPoints: [path.join(root, 'src/main.tsx')], bundle: true, minify: true, format: 'iife', outfile: path.join(dist, 'app.js'),
  jsx: 'automatic', define: { 'process.env.NODE_ENV': '"production"' }, nodePaths: ['/home/claude/.npm-global/lib/node_modules'], loader: { '.css': 'empty' } })
const twDir = '/opt/npm-tools/node_modules/tailwindcss'
const css = fs.readFileSync(path.join(root, 'src/styles/index.css'), 'utf8')
const compiler = await compile(css, { base: twDir, loadStylesheet: async (id, base) => {
  const p = id === 'tailwindcss' ? path.join(twDir, 'index.css') : path.resolve(base, id)
  return { path: p, base: path.dirname(p), content: fs.readFileSync(p, 'utf8') } } })
const cands = new Set()
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => { const p = path.join(d, e.name); e.isDirectory() ? walk(p) : /\.(tsx?|html)$/.test(e.name) && fs.readFileSync(p, 'utf8').split(/[\s"'`<>={}()]+/).forEach((t) => t && cands.add(t)) })
walk(path.join(root, 'src')); cands.add('lg:hidden')
fs.writeFileSync(path.join(dist, 'app.css'), compiler.build([...cands]))
let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8')
html = html.replace('<script type="module" src="/src/main.tsx"></script>', '<link rel="stylesheet" href="app.css" /><script defer src="app.js"></script>')
fs.writeFileSync(path.join(dist, 'index.html'), html)
console.log('ok', fs.statSync(path.join(dist, 'app.js')).size, fs.statSync(path.join(dist, 'app.css')).size)
