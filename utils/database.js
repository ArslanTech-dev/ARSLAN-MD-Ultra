// utils/database.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { fancyLog } = require('./logger');

const DB_PATH = path.join(__dirname, '..', 'data', 'bot.db');
const db = new sqlite3.Database(DB_PATH);

function runQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function(err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
}

function getQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}

function allQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

async function initTables() {
    try {
        await runQuery(`
            CREATE TABLE IF NOT EXISTS warnings (
                jid TEXT PRIMARY KEY,
                name TEXT,
                warnings INTEGER DEFAULT 0,
                reasons TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
        await runQuery(`
            CREATE TABLE IF NOT EXISTS economy (
                jid TEXT PRIMARY KEY,
                name TEXT,
                coins INTEGER DEFAULT 100,
                last_daily INTEGER DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
        await runQuery(`
            CREATE TABLE IF NOT EXISTS levels (
                jid TEXT PRIMARY KEY,
                xp INTEGER DEFAULT 0,
                level INTEGER DEFAULT 1
            )
        `);
        await runQuery(`
            CREATE TABLE IF NOT EXISTS custom_commands (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                jid TEXT,
                trigger TEXT,
                response TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
        await runQuery(`
            CREATE TABLE IF NOT EXISTS blacklist (
                jid TEXT PRIMARY KEY,
                type TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
        fancyLog('DB', 'All tables initialized successfully');
    } catch (err) {
        fancyLog('ERROR', `Table init failed: ${err.message}`);
    }
}

initTables();

module.exports = { db, runQuery, getQuery, allQuery, initTables };