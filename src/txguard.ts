export async function requestAndAwaitApproval(snapId, approval) {
  const req = await ethereum.request({
    method: 'wallet_invokeSnap',
    params: { snapId, request: { method: 'requestApproval', params: [approval] } }
  });
  const id = req.id;
  // polling
  while (true) {
    const r = await ethereum.request({
      method: 'wallet_invokeSnap',
      params: { snapId, request: { method: 'getApprovalStatus', params: [id] } }
    });
    if (r.ok && r.status === 'approved') return true;
    if (r.ok && r.status === 'rejected') throw new Error('Rejected');
    await new Promise(res => setTimeout(res, 1500));
  }
}
