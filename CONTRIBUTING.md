
Contributing to TxGuard Snap (PoC)

Thank you for your interest in contributing! This project is a proof-of-concept for adding software-based 2FA to MetaMask transactions.

Please read carefully before contributing.

⸻

⚠️ Important Warnings
	•	Experimental / PoC: This project is not production-ready.
	•	No real funds: Do not use this with your main MetaMask account or real assets.
	•	Security Risks:
	•	The current relayer uses HTTP (localhost) and no authentication.
	•	Approvals are not signed.
	•	Replay attacks are possible.
	•	Keys Safety: MetaMask private keys never leave the wallet, but PoC transactions are not fully secured.
	•	Production Readiness: HTTPS, signed approvals, replay protection, and device binding are required for real usage.

By contributing, you acknowledge these risks and agree to follow safe experimentation practices.

⸻

📝 How to Contribute

1. Fork & Clone

git clone https://github.com/your-username/txguard-snap.git
cd txguard-snap

	•	Work on the latest branch.
	•	Create feature branches for new contributions.

⸻

2. Code Guidelines
	•	Write clean, readable, and documented code.
	•	Follow JavaScript / Node.js best practices.
	•	Avoid exposing sensitive data or private keys.
	•	Document all changes, especially related to Snap logic or relayer.

⸻

3. Testing
	•	Run PoC locally using the instructions:
	1.	Start Relayer (npm run dev)
	2.	Run sim-snap/approve.js to simulate approval
	3.	Test Snap in MetaMask
	•	Confirm that approval flows work correctly before submitting PRs.

⸻

4. Pull Requests
	•	Use clear PR titles and descriptions.
	•	Reference related issues or discussion points.
	•	Include test instructions and simulation steps.

⸻

5. Reporting Issues
	•	Do not report security vulnerabilities publicly.
	•	For security concerns, email: security@seedless-web3.org
	•	Include:
	•	Steps to reproduce
	•	Expected vs. actual behavior
	•	Potential impact

⸻

6. Code of Conduct
	•	Be respectful, collaborative, and constructive.
	•	Focus on learning and experimentation, not exploiting PoC.

⸻

Thank you for contributing!
Your work helps explore safer Web3 transactions with MetaMask.
