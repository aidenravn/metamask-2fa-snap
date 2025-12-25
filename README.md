TxGuard Snap (PoC)

Software‑based 2FA layer for MetaMask — adds mobile / companion approval before transactions.

This Proof‑of‑Concept demonstrates how a second device (mobile or companion app) can be required to approve a MetaMask transaction before it is signed.

⸻

Components

Folder	Purpose
relayer/	Node.js server that receives, stores, and validates approval requests
snap/	MetaMask Snap that requests approval before allowing a transaction
sim-snap/	Simple script that simulates a mobile or companion approval


⸻

Architecture

MetaMask Snap
      |
      |  (create approval request)
      v
Relayer Server (localhost:4000)
      |
      |  (mobile / sim-snap approves)
      v
Approval Granted → Snap allows transaction

The relayer acts as a temporary approval bridge between MetaMask and a second device.

⸻

Quick Start

1) Start the Relayer

cd relayer
npm install
npm run dev

Relayer will start on:

http://localhost:4000

It is responsible for:
	•	Creating approval sessions
	•	Waiting for a mobile/companion approval
	•	Returning approval status to the Snap

⸻

2) Run the Simulated Mobile Approver

In another terminal:

cd sim-snap
node approve.js

This will:
	•	Send a fake approval to the relayer
	•	Simulate a user confirming the transaction on their phone

⸻

3) MetaMask Snap

The Snap (inside snap/) will:
	1.	Create an approval request
	2.	Poll the relayer
	3.	Allow or block the transaction based on the response

⸻

Security Model (PoC)

This PoC demonstrates:
	•	Out‑of‑band transaction approval
	•	Software‑based 2FA for Web3 wallets
	•	No private keys leave MetaMask
	•	No signing happens on the relayer

⚠️ This PoC uses http://localhost and no authentication.
Production would require:
	•	HTTPS
	•	Signed approval messages
	•	Replay protection
	•	Device binding

⸻

Why this matters

TxGuard Snap proves that MetaMask transactions can be protected by a second device, similar to:
	•	Google Authenticator
	•	Hardware wallets
	•	Banking apps
