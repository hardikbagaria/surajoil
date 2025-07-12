const express = require('express');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON bodies
app.use(express.json());
// Redirect .html URLs to clean URLs
app.use((req, res, next) => {
  if (req.url === '/index') {
    return res.redirect(301, '/');
  }
  const match = req.url.match(/^\/([a-zA-Z0-9_-]+)\.html$/);
  if (match) {
    return res.redirect(301, `/${match[1]}`);
  }
  next();
});



// ✅ Utility: Serve HTML file with optional script injection
function serveHtmlWithInjection(res, filename) {
  const filePath = path.join(__dirname, 'public', filename);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error loading page');
    const injectedHtml = data.replace(
      '</body>',
      `<script src="/js/whatsapp.js"></script>\n</body>`
    );
    res.send(injectedHtml);
  });
}

// Pretty URL routes with WhatsApp button injection
app.get('/', (req, res) => {
  serveHtmlWithInjection(res, 'index.html');
});

app.get('/about', (req, res) => {
  serveHtmlWithInjection(res, 'about.html');
});

app.get('/contact', (req, res) => {
  serveHtmlWithInjection(res, 'contact.html');
});

// API route to fetch items by category
app.get(`/api/items/:category`, (req, res) => {
  const category = req.params.category;

  const db = new sqlite3.Database('database.db');
  db.all("SELECT name, image, description FROM items WHERE category = ?", [category], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
  db.close();
});
app.post('/submit-form', (req, res) => {
  const { name, email, phno, message } = req.body;

  console.log('📩 New Submission from Contact Form:');
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Phone Number', phno);
  console.log('Message:', message);
  console.log('---------------------------');

  res.status(200).send({ message: 'Received' });
});
// Serve static assets (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));
// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
