'use strict';

require('dotenv').config();

const events = require('../utils/events.js');

const readFile = require('./src/readFile.js');
const uppercaseBuffer = require('./src/uppercaseBuffer.js');
const writeFile = require('./src/writeFile.js');

const QClient = require('@nmq/q/client');

const filename = process.argv.slice(2).shift();

readFile(filename)
  .then((buffer) => uppercaseBuffer(buffer))
  .then((buffer) => writeFile(filename, buffer) || buffer)
  .then( () => {
    // socket.emit(events.fileSave, `${filename} saved` );
    QClient('files', events.fileSave, `${filename} saved!`);
  })
  .catch(() => {
    // socket.emit(events.fileError, 'file error' );
    QClient('files', events.fileError, `Error with file: ${filename}`);
  });