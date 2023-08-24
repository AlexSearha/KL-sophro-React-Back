require('dotenv').config();
const http = require('node:http');
const app = require('./app/index.app');

const PORT = process.env.PORT;
const server = http.createServer(app)


server.listen(PORT, () => {
  console.log(`Le serveur est lancé sur http://localhost:${PORT}`)
})

module.exports = PORT;