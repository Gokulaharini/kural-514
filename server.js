import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Cloud Run injects PORT=8080 where Nginx reverse-proxies to port 3000 (DEFAULT_APP_PORT).
// Binding to 8080 causes an EADDRINUSE conflict with Nginx.
// Therefore, the Node server must listen on port 3000.
const PORT = (process.env.PORT && process.env.PORT !== '8080')
  ? Number(process.env.PORT)
  : (Number(process.env.DEFAULT_APP_PORT) || 3000);

const distPath = path.join(__dirname, 'dist');

// Cloud Run health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Serve static assets from dist if built, otherwise project root
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}
app.use(express.static(__dirname));

// SPA Fallback: send index.html for all routes
app.get('*', (req, res) => {
  const distIndex = path.join(distPath, 'index.html');
  if (fs.existsSync(distIndex)) {
    res.sendFile(distIndex);
  } else {
    res.sendFile(path.join(__dirname, 'index.html'));
  }
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
  if (err.code === 'EADDRINUSE' && PORT !== 3000) {
    console.log('Port in use, falling back to port 3000...');
    app.listen(3000, '0.0.0.0');
  }
});
