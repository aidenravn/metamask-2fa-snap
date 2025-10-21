/* global snap */
const RELAYER = 'http://localhost:4000';

export const onRpcRequest = async ({ origin, request }) => {
  switch (request.method) {
    case 'requestApproval': {
      const payload = request.params?.[0];
      if (!payload || typeof payload !== 'object') {
        throw new Error('Invalid params: expected approval object');
      }
      const res = await fetch(`${RELAYER}/approval`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const out = await res.json();

      // audit trail: keep minimal state
      const state = (await snap.request({
        method: 'snap_manageState',
        params: { operation: 'get' }
      })) || {};
      state[out.id] = { origin, createdAt: Date.now(), payload };
      await snap.request({
        method: 'snap_manageState',
        params: { operation: 'update', newState: state }
      });

      return out;
    }

    case 'getApprovalStatus': {
      const requestId = request.params?.[0];
      if (!requestId) throw new Error('requestId required');
      const res = await fetch(`${RELAYER}/approval/${requestId}`);
      if (!res.ok) return { ok: false, error: 'not found' };
      const data = await res.json();
      return { ok: true, status: data.status, signatures: data.signatures };
    }

    default:
      throw new Error('Method not found');
  }
};

export const onTransaction = async ({ transaction, chainId }) => {
  return {
    insightsVersion: '1.0.0',
    content: [
      { type: 'paragraph', value: 'TxGuard: a second approval may be required.' },
      { type: 'text', value: `to: ${transaction.to} | chainId: ${chainId}` }
    ]
  };
};
