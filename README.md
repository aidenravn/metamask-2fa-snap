# TxGuard Snap (PoC)
Software-based 2FA layer for MetaMask — adds mobile/companion approval before transactions.

## Components
- **relayer/**: Node.js server to receive/store approval requests.
- **snap/**: MetaMask Snap skeleton exposing simple RPC to create approvals.
- **sim-snap/**: Tiny script to POST a fake approval (before real Snap/dApp integration).

## Quick Start

### 1) Relayer
```bash
cd relayer
npm install
npm run dev   # http://localhost:4000
