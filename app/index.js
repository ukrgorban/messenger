// const express = require('express');
// const { Pool } = require('pg');

// const app = express();
// const port = 5000;

// const pool = new Pool({
//     user: 'myuser',
//     host: 'postgres',
//     database: 'mydatabase',
//     password: 'mypassword',
//     port: 5432,
// });

// app.get('/', async (req, res) => {
//     try {
//         const result = await pool.query('SELECT $1::text as message', [
//             'Hello, Docker!!',
//         ]);
//         res.send(result.rows[0].message);
//     } catch (error) {
//         console.error('Error executing query:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// app.listen(port, () => {
//     console.log(`Server is running on  port ${port}`);
// });

'use strict';

const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

const PORT = 5000;

const MIME_TYPES = {
    default: 'application/octet-stream',
    html: 'text/html; charset=UTF-8',
    js: 'application/javascript; charset=UTF-8',
    css: 'text/css',
    png: 'image/png',
    jpg: 'image/jpg',
    gif: 'image/gif',
    ico: 'image/x-icon',
    svg: 'image/svg+xml',
};

const STATIC_PATH = path.join(process.cwd(), './static');

const toBool = [() => true, () => false];

const prepareFile = async (url) => {
    const paths = [STATIC_PATH, url];
    if (url.endsWith('/')) paths.push('index.html');
    const filePath = path.join(...paths);
    const pathTraversal = !filePath.startsWith(STATIC_PATH);
    const exists = await fs.promises.access(filePath).then(...toBool);
    const found = !pathTraversal && exists;
    const streamPath = found ? filePath : STATIC_PATH + '/404.html';
    const ext = path.extname(streamPath).substring(1).toLowerCase();
    const stream = fs.createReadStream(streamPath);
    return { found, ext, stream };
};

http.createServer(async (req, res) => {
    const file = await prepareFile(req.url);
    const statusCode = file.found ? 200 : 404;
    const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;
    res.writeHead(statusCode, { 'Content-Type': mimeType });
    file.stream.pipe(res);
    console.log(`${req.method} ${req.url} ${statusCode}`);
}).listen(PORT);

console.log(`Server running at http://127.0.0.1:${PORT}/`);
