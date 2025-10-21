const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const Ajv = require('ajv');
const etag = require('etag');

const app = express();

// ── Security & parsers
app.use(helmet());
app.use(bodyParser.json({ limit: '100kb' }));

// CORS whitelist (env: CORS_ORIGINS="http://localhost:5173,http://localhost:8080")
const allowed = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map(s => s.trim())
  : ['http://localhost:5173'];
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowed.includes(origin)) return cb(null, true);
      return cb(new Error('Not allowed by CORS'));
    }
  })
);

// Rate limit (60 req/dk/IP)
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 60,
    standardHeaders: true,
    legacyHeaders: false
  })
);

const PORT = process.env.PORT || 4000;

// In-memory store (PoC)
const approvals = {}; // id -> { request, status, signatures: [] }

// AJV validation schema
const ajv = new Ajv({ allErrors: true, removeAdditional: false });
const schema = {
  type: 'object',
  required: ['from', 'to', 'chainId', 'timestamp'],
  properties: {
    from: { type: 'string' },
    to: { type: 'string' },
    value: { type: 'string' }, // optional but must be string if present
    data: { type: 'string' },  // optional but must be string if present
    chainId: { type: 'integer' },
    timestamp: { type: 'integer' },
    humanReadable: { type: 'string' },
    digest: { type: 'string' },
    requestId: { type: 'string' }
  },
  additionalProperties: true
};
const validate = ajv.compile(schema);

// Basic root
app.get('/', (_req, res) => {
  res.type('text').send('TxGuard Relayer running. POST /approval');
});

// Create approval
app.post('/approval', (req, res) => {
  if (!validate(req.body)) {
    return res
      .status(400)
      .json({ ok: false, code: 'BAD_BODY', errors: validate.errors });
  }

  const body = req.body || {};
  let { requestId } = body;
  if (!requestId) requestId = uuidv4();

  approvals[requestId] = {
    request: { ...body, requestId, createdAt: Date.now() },
    status: 'pending',
    signatures: []
  };
  console.log('[Relayer] Received approval:', requestId);
  return res.json({ ok: true, id: requestId });
});

// List approvals (debug)
app.get('/approvals', (_req, res) => {
  // small cache control: this list changes frequently
  res.set('Cache-Control', 'no-store');
  return res.json(approvals);
});

// Query single approval (ETag + no-store)
app.get('/approval/:id', (req, res) => {
  const id = req.params.id;
  const item = approvals[id];
  if (!item) return res.status(404).json({ ok: false, error: 'not found' });

  const payload = JSON.stringify(item);
  const tag = etag(payload);
  res.set('ETag', tag);
  res.set('Cache-Control', 'no-store');

  if (req.headers['if-none-match'] === tag) {
    return res.status(304).end();
  }
  return res.type('json').send(payload);
});

// Simulate mobile sign/approve
app.post('/approval/:id/sign', (req, res) => {
  const id = req.params.id;
  const item = approvals[id];
  if (!item) return res.status(404).json({ ok: false, error: 'not found' });

  const { devicePubKey, deviceSignature, approve = true } = req.body || {};
  item.signatures.push({ devicePubKey, deviceSignature, ts: Date.now() });
  item.status = approve ? 'approved' : 'rejected';
  console.log(`[Relayer] ${approve ? 'Approved' : 'Rejected'} ${id}`);
  return res.json({ ok: true, id, status: item.status });
});

// Centralized error handler
// (so CORS errors and others return JSON)
app.use((err, _req, res, _next) => {
  console.error('[Error]', err.message);
  res
    .status(500)
    .json({ ok: false, code: 'INTERNAL', message: err.message || 'error' });
});

app.listen(PORT, () => {
  console.log(`Relayer listening on http://localhost:${PORT}`);
});
