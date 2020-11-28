import * as Automerge from 'automerge';
import express from 'express';
import * as ws from "WebSocket";

const HOST = '0.0.0.0'
const PORT = 9876
const app = express();

app.get('/', (req, res) => res.send('Express + TypeScript Server'));
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});


