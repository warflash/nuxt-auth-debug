const http = require('http')
const { parse } = require('url')

const targetHost = 'localhost'
const targetPort = 3000

const proxyServer = http.createServer((req, res) => {
  console.log(`Received request for ${req.url}`)

  const parsedUrl = parse(req.url)
  const options = {
    hostname: targetHost,
    port: targetPort,
    path: parsedUrl.path,
    method: req.method,
    headers: req.headers
  }

  console.log(JSON.stringify(options.headers['user-agent']))

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers)
    proxyRes.pipe(res, { end: true })
  })

  req.pipe(proxyReq, { end: true })

  proxyReq.on('error', (e) => {
    console.error(`problem with request: ${e.message}`)
    res.writeHead(500)
    res.end(`Server error: ${e.message}`)
  })
})

proxyServer.listen(3333, () => {
  console.log('Proxy server running on http://localhost:3333')
})
