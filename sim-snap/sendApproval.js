import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';

const RELAYER = process.env.RELAYER_URL || 'http://localhost:4000';

async function main() {
  const requestId = uuidv4();
  const payload = {
    requestId,
    from: '0xYourAddress',
    to: '0xReceiver',
    value: '50000000000000000', // 0.05 ETH
    data: '0x',
    chainId: 1,
    humanReadable: 'Send 0.05 ETH to 0xReceiver (PoC)',
    digest: '0x' + Buffer.from('example').toString('hex'),
    timestamp: Date.now()
  };

  const res = await fetch(`${RELAYER}/approval`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' }
  });

  const out = await res.json();
  console.log('[sim-snap] Created approval:', out);

  console.log(`Approve it:
curl -X POST ${RELAYER}/approval/${out.id}/sign \\
  -H "Content-Type: application/json" \\
  -d '{"devicePubKey":"0xdeadbeef","deviceSignature":"0xsig...","approve":true}'
`);
}

main().catch(console.error);
