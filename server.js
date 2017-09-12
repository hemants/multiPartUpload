'use strict'

const express = require('express');
const random = require('randomstring');
const path = require('path');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const multer = require('multer');

const server = express();
server.timeout = 1200000;

const upload = multer({ dest: 'uploads/' });

server.post('/upload', upload.single('file'), function (req, res) {
    if (!req.file && (!req.body.file || typeof req.body.file !== 'string'))
      return res.status(400).send('must specify a file to upload.');

    return fs.accessAsync(req.file.path, fs.R_OK)
      .then(function () {
          return res.status(200).send('yay !!! got the file.');
      })
      .catch(function (err) {
        return res.status(500).send('Internal server error.');
      });
});

// start the server
server.listen('8080', ()=>{
    console.log('listening on port 8081');
});

module.exports = server;
