const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;

// approvals[requestId] = { request, status: 'pending'|'approved'|'rejected', signatures: [] }
const approvals = {};

app.get('/', (_req, res) => {
  res.send('TxGuard Relayer running. POST /approval');
});

app.post('/approval', (req, res) => {
  const body = req.body || {};
  let { requestId } = body;
  if (!requestId) requestId = uuidv4();
  approvals[requestId] = {
    request: { ...body, requestId, createdAt: Date.now() },
    status: 'pending',
    signatures: []
  };
  console.log('[Relayer] Received approval:', requestId);
  res.json({ ok: true, id: requestId });
});

app.get('/approvals', (_req, res) => res.json(approvals));

app.get('/approval/:id', (req, res) => {
  const id = req.params.id;
  const item = approvals[id];
  if (!item) return res.status(404).json({ error: 'not found' });
  res.json(item);
});

app.post('/approval/:id/sign', (req, res) => {
  const id = req.params.id;
  const item = approvals[id];
  if (!item) return res.status(404).json({ error: 'not found' });

  const { devicePubKey, deviceSignature, approve = true } = req.body || {};
  item.signatures.push({ devicePubKey, deviceSignature, ts: Date.now() });
  item.status = approve ? 'approved' : 'rejected';
  console.log(`[Relayer] ${approve ? 'Approved' : 'Rejected'} ${id}`);
  res.json({ ok: true, id, status: item.status });
});

app.listen(PORT, () => {
  console.log(`Relayer listening on http://localhost:${PORT}`);
});
