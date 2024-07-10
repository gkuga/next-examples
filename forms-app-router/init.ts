const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db.sqlite3');

db.run(`CREATE TABLE todos (
  id INTEGER PRIMARY KEY,
  text TEXT NOT NULL
)`);
