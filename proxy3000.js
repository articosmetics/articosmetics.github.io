import http from 'node:http';

const server = http.createServer((req, res) => {
  const options = {
    hostname: '127.0.0.1',
    port: 5173,
    path: req.url,
    method: req.method,
    headers: { ...req.headers, host: 'localhost:5173' }
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxyReq.on('error', () => {
    res.writeHead(502, { 'Content-Type': 'text/plain' });
    res.end('Dev server is starting, please refresh in a moment...');
  });

  req.pipe(proxyReq, { end: true });
});

server.on('upgrade', (req, socket) => {
  const proxyReq = http.request({
    hostname: '127.0.0.1',
    port: 5173,
    path: req.url,
    method: req.method,
    headers: { ...req.headers, host: 'localhost:5173' }
  });

  proxyReq.on('upgrade', (proxyRes, proxySocket) => {
    let headers = `HTTP/1.1 101 Switching Protocols\r\n`;
    for (const [key, value] of Object.entries(proxyRes.headers)) {
      headers += `${key}: ${value}\r\n`;
    }
    headers += '\r\n';
    socket.write(headers);
    proxySocket.pipe(socket);
    socket.pipe(proxySocket);
  });

  proxyReq.on('error', () => {
    socket.destroy();
  });

  proxyReq.end();
});

server.listen(3000, '0.0.0.0', () => {
  console.log('Dual-port proxy active on http://localhost:3000/ -> forwarding to 5173');
});
