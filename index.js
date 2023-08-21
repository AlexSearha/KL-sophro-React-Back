import 'dotenv/config';
import http from 'node:http';
import app from './app/index.app.js'

const PORT = process.env.PORT;
const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Le serveur est lancé sur http://localhost:${PORT}`)
})

export default PORT;