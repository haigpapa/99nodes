import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function adminApiPlugin() {
  return {
    name: 'admin-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.method === 'POST' && req.url === '/api/admin/save-node') {
          let body = ''
          req.on('data', chunk => { body += chunk })
          req.on('end', () => {
            try {
              const { node } = JSON.parse(body)
              const nodesPath = path.join(__dirname, 'src/data/nodes.js')
              let source = fs.readFileSync(nodesPath, 'utf-8')
              const updatedSource = updateNodeInSource(source, node)
              fs.writeFileSync(nodesPath, updatedSource, 'utf-8')
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ ok: true }))
            } catch (err) {
              res.statusCode = 500
              res.end(JSON.stringify({ ok: false, error: err.message }))
            }
          })
          return
        }
        next()
      })
    }
  }
}

function updateNodeInSource(source, updatedNode) {
  const id = updatedNode.id
  const idPattern = new RegExp(`id:\\s*["']${escapeRegex(id)}["']`)
  const match = idPattern.exec(source)
  if (!match) throw new Error(`Node id "${id}" not found in nodes.js`)
  let start = match.index
  while (start > 0 && source[start] !== '{') start--
  let depth = 0
  let end = start
  while (end < source.length) {
    if (source[end] === '{') depth++
    if (source[end] === '}') { depth--; if (depth === 0) { end++; break } }
    end++
  }
  const replacement = nodeToSource(updatedNode)
  return source.slice(0, start) + replacement + source.slice(end)
}

function nodeToSource(node) {
  const categories = JSON.stringify(node.categories)
  const connections = JSON.stringify(node.connections)
  return `{
    id: "${node.id}",
    title: ${JSON.stringify(node.title)},
    subtitle: ${JSON.stringify(node.subtitle)},
    categories: ${categories},
    tier: ${node.tier}, year: "${node.year}", temporal: "${node.temporal}",
    image: ${JSON.stringify(node.image)},
    connections: ${connections},
    description: ${JSON.stringify(node.description)},
  }`
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export default defineConfig({
  plugins: [react(), adminApiPlugin()],
})
