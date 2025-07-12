const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('database.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL
  )`);

  const stmt = db.prepare(`INSERT INTO items (name, image, description, category) VALUES (?, ?, ?, ?)`);

  const items = [
    // Transformer Oil
    ["Apar Transformer Oil", "images/apar-transformeroil.jpeg", "High-grade insulation oil, available in bulk and drums.", "Transformer Oil"],
    ["Asian Transformer Oil", "images/asian-transformeroil.jpeg", "Reliable transformer oil from Asian Oils for consistent performance.", "Transformer Oil"],
    ["Savita Chemical Transformer Oil", "images/savita-transformeroil.jpeg", "Premium oil from Savita Chemicals with superior insulation properties.", "Transformer Oil"],
    ["HP Transformer Oil", "images/hp-transformeroil.jpeg", "Trusted HP product used in many electrical installations.", "Transformer Oil"],

    // Hydraulic Oil
    ["HP Enklo-68 Oil", "images/hp-hydraulic-oil.jpeg", "Used in industrial machinery for smooth performance.", "Hydraulic Oil"],
    ["MAK HYDROL AW 68", "images/mak-hydraulic-oil.jpeg", "Used in industrial machinery for smooth performance.", "Hydraulic Oil"],

    // Cutting Oil
    ["HP Cutting Oil", "images/hp-cuttingoil.jpeg", "HP KOOLKUT 40", "Cutting Oil"],

    // Engine Oil
    ["Engine Oil", "images/engine-oil.jpeg", "Protects engines and ensures long-term efficiency.", "Engine Oil"],
  ];

  items.forEach(item => stmt.run(item));
  stmt.finalize();

  console.log("✅ Table created and all items inserted.");
});

db.close();
