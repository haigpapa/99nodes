import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// ── Admin API Plugin ─────────────────────────────────────────────────────────
// Runs only during `npm run dev`. Provides two endpoints:
//   POST /api/admin/save-node   — writes updated node back to nodes.js
//   POST /api/admin/upload-image — saves uploaded image to public/images/
// ────────────────────────────────────────────────────────────────────────────
function adminApiPlugin() {
  return {
    name: 'admin-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // ── Save node data ───────────────────────────────────────────────────
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

        // ── Upload image ─────────────────────────────────────────────────────
        if (req.method === 'POST' && req.url === '/api/admin/upload-image') {
          const chunks = []
          req.on('data', chunk => chunks.push(chunk))
          req.on('end', () => {
            try {
              const buffer = Buffer.concat(chunks)
              const contentType = req.headers['content-type'] || ''
              const boundaryMatch = contentType.match(/boundary=(.+)/)
              if (!boundaryMatch) throw new Error('No boundary found')

              const boundary = '--' + boundaryMatch[1]
              const parts = parseMultipart(buffer, boundary)
              const filePart = parts.find(p => p.filename)
              if (!filePart) throw new Error('No file found in upload')

              const ext = path.extname(filePart.filename).toLowerCase()
              const allowed = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']
              if (!allowed.includes(ext)) throw new Error('File type not allowed')

              const safeName = filePart.filename
                .replace(/[^a-z0-9._-]/gi, '-')
                .toLowerCase()

              const imagesDir = path.join(__dirname, 'public/images')
              if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true })

              const outPath = path.join(imagesDir, safeName)
              fs.writeFileSync(outPath, filePart.data)

              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ ok: true, url: `/images/${safeName}` }))
            } catch (err) {
              res.statusCode = 500
              res.end(JSON.stringify({ ok: false, error: err.message }))
            }
          })
          return
        }

        // ── Upload project media (to per-project subfolder) ─────────────────
        if (req.method === 'POST' && req.url === '/api/admin/upload-project-media') {
          const chunks = []
          req.on('data', chunk => chunks.push(chunk))
          req.on('end', () => {
            try {
              const buffer = Buffer.concat(chunks)
              const contentType = req.headers['content-type'] || ''
              const boundaryMatch = contentType.match(/boundary=(.+)/)
              if (!boundaryMatch) throw new Error('No boundary found')

              const boundary = '--' + boundaryMatch[1]
              const parts = parseMultipart(buffer, boundary)

              const nodeIdPart = parts.find(p => !p.filename && p.name === 'nodeId')
              const nodeId = nodeIdPart ? nodeIdPart.data.toString('utf-8').trim() : null
              if (!nodeId) throw new Error('nodeId is required')

              const fileParts = parts.filter(p => p.filename)
              if (fileParts.length === 0) throw new Error('No files found')

              const projectDir = path.join(__dirname, 'public/images', nodeId)
              if (!fs.existsSync(projectDir)) fs.mkdirSync(projectDir, { recursive: true })

              const urls = []
              for (const filePart of fileParts) {
                const ext = path.extname(filePart.filename).toLowerCase()
                const allowed = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif', '.mp4', '.webm']
                if (!allowed.includes(ext)) continue

                const safeName = filePart.filename.replace(/[^a-z0-9._-]/gi, '-').toLowerCase()
                const outPath = path.join(projectDir, safeName)
                fs.writeFileSync(outPath, filePart.data)
                urls.push(`/images/${nodeId}/${safeName}`)
              }

              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ ok: true, urls }))
            } catch (err) {
              res.statusCode = 500
              res.end(JSON.stringify({ ok: false, error: err.message }))
            }
          })
          return
        }

        // ── Save project content (LONG_DESCRIPTIONS) ──────────────────────
        if (req.method === 'POST' && req.url === '/api/admin/save-project-content') {
          let body = ''
          req.on('data', chunk => { body += chunk })
          req.on('end', () => {
            try {
              const { nodeId, content } = JSON.parse(body)
              if (!nodeId || !content) throw new Error('nodeId and content are required')

              const nodesPath = path.join(__dirname, 'src/data/nodes.js')
              let source = fs.readFileSync(nodesPath, 'utf-8')

              source = updateLongDescription(source, nodeId, content)
              fs.writeFileSync(nodesPath, source, 'utf-8')

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

// ── Update or insert a LONG_DESCRIPTIONS entry ──────────────────────────────
function updateLongDescription(source, nodeId, content) {
  const idPattern = new RegExp(`["']${escapeRegex(nodeId)}["']\\s*:\\s*\\{`)
  const ldStart = source.indexOf('export const LONG_DESCRIPTIONS')
  if (ldStart === -1) throw new Error('LONG_DESCRIPTIONS not found in source')

  const match = idPattern.exec(source.slice(ldStart))

  const replacement = longDescToSource(nodeId, content)

  if (match) {
    const absStart = ldStart + match.index
    let depth = 0
    let end = absStart + match[0].length - 1
    while (end < source.length) {
      if (source[end] === '{') depth++
      if (source[end] === '}') { depth--; if (depth === 0) { end++; break } }
      end++
    }
    if (source[end] === ',') end++

    return source.slice(0, absStart) + replacement + source.slice(end)
  } else {
    let depth2 = 0
    let insertPos = ldStart
    const openBrace = source.indexOf('{', ldStart + 'export const LONG_DESCRIPTIONS'.length)
    insertPos = openBrace
    depth2 = 0
    let lastClose = openBrace
    for (let i = openBrace; i < source.length; i++) {
      if (source[i] === '{') depth2++
      if (source[i] === '}') { depth2--; if (depth2 === 0) { lastClose = i; break } }
    }
    return source.slice(0, lastClose) + '    ' + replacement + '\n' + source.slice(lastClose)
  }
}

function longDescToSource(nodeId, content) {
  const parts = []
  parts.push(`"${nodeId}": {`)
  if (content.banner) parts.push(`        banner: ${JSON.stringify(content.banner)},`)
  if (content.media && content.media.length > 0) {
    const mediaStr = content.media.map(m => {
      const obj = { src: m.src }
      if (m.caption) obj.caption = m.caption
      return JSON.stringify(obj)
    }).join(',\n            ')
    parts.push(`        media: [\n            ${mediaStr},\n        ],`)
  }
  parts.push(`        longDescription: ${JSON.stringify(content.longDescription || "")},`)
  if (content.details && content.details.length > 0) {
    const detailsStr = content.details.map(d => JSON.stringify(d)).join(',\n            ')
    parts.push(`        details: [\n            ${detailsStr},\n        ],`)
  }
  if (content.sections && content.sections.length > 0) {
    const sectionsStr = content.sections.map(s => JSON.stringify(s)).join(',\n            ')
    parts.push(`        sections: [\n            ${sectionsStr},\n        ],`)
  }
  parts.push(`    },`)
  return '    ' + parts.join('\n    ')
}

// ── Update a single node object inside the nodes.js source string ────────────
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

// ── Minimal multipart form-data parser ──────────────────────────────────────
function parseMultipart(buffer, boundary) {
  const parts = []
  const boundaryBuf = Buffer.from(boundary)
  const CRLF = Buffer.from('\r\n')

  let pos = 0
  while (pos < buffer.length) {
    const bStart = indexOf(buffer, boundaryBuf, pos)
    if (bStart === -1) break
    pos = bStart + boundaryBuf.length

    if (buffer[pos] === 0x0d && buffer[pos + 1] === 0x0a) pos += 2
    else if (buffer[pos] === 0x2d && buffer[pos + 1] === 0x2d) break

    const headers = {}
    let filename = null
    let name = null
    while (pos < buffer.length) {
      const lineEnd = indexOf(buffer, CRLF, pos)
      if (lineEnd === -1) break
      const line = buffer.slice(pos, lineEnd).toString('utf-8')
      pos = lineEnd + 2
      if (line === '') break

      const cdMatch = line.match(/Content-Disposition:.*filename="([^"]+)"/i)
      if (cdMatch) filename = cdMatch[1]
      const nameMatch = line.match(/Content-Disposition:.*\bname="([^"]+)"/i)
      if (nameMatch) name = nameMatch[1]
    }

    const nextBoundary = indexOf(buffer, boundaryBuf, pos)
    if (nextBoundary === -1) break

    let dataEnd = nextBoundary
    if (buffer[dataEnd - 2] === 0x0d && buffer[dataEnd - 1] === 0x0a) dataEnd -= 2

    parts.push({ filename, name, data: buffer.slice(pos, dataEnd) })
    pos = nextBoundary
  }
  return parts
}

function indexOf(buf, search, start = 0) {
  outer: for (let i = start; i <= buf.length - search.length; i++) {
    for (let j = 0; j < search.length; j++) {
      if (buf[i + j] !== search[j]) continue outer
    }
    return i
  }
  return -1
}

export default defineConfig({
  base: '/99nodes/',
  plugins: [react(), adminApiPlugin()],
})
