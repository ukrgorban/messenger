'use strict';

const http = require('node:http');
const db = require('./db.js');
const server = require('./http.js');

const PORT = 8000;

const routing = {
    user: require('./user.js'),
    country: db('country'),
    city: db('city'),
};

const crud = { get: 'read', post: 'create', put: 'update', delete: 'delete' };

server(routing, PORT);
