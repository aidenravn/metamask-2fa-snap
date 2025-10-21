# Security Policy — TxGuard Snap

## 🧩 Overview
TxGuard Snap is an **open-source Proof-of-Concept (PoC)** exploring software-based 2FA for MetaMask transactions.  
It provides an *off-chain approval layer* that requires a second confirmation before signing a transaction.  
This project is for **educational and research purposes only** — **not for production or mainnet use.**

---

## 🔐 Security Principles

- **No private keys stored:** TxGuard never stores or transmits any private keys, seed phrases, or user secrets.  
- **Off-chain architecture:** All approval logic runs locally through the `relayer/` service — no on-chain custody.  
- **Fail-closed model:** If the approval layer is unavailable or unapproved, the transaction will not proceed.  
- **Transparency & modularity:** All components (`relayer/`, `snap/`, `examples/dapp/`) are open-source and auditable.  
- **Defense-in-depth:** TxGuard is designed to complement, not replace, MetaMask’s native signing protections.

---

## ⚠️ Responsible Disclosure

We welcome community feedback, code review, and responsible vulnerability reports.

If you discover a potential security issue:
1. **Do not create a public issue immediately.**
2. Please contact the maintainers privately via email:  
   📧 **@holdonravn** *(PGP key will be published soon)*  
3. Include:
   - A clear description of the issue  
   - Steps to reproduce  
   - Potential impact and mitigation suggestions  

We aim to acknowledge reports within **48 hours** and provide updates during investigation.

---

## 🚫 Production Disclaimer

TxGuard Snap is a **research prototype**.  
It has **not undergone formal security audits** and **should not be used to protect real assets** on mainnet.  
Any use in production environments is **at your own risk**.

---

## 🧠 Future Work

- EIP-712 human-readable summaries for signing safety  
- Mobile companion app with secure pairing  
- Optional hardware attestation for relayer approvals  
- Comprehensive code audit before v1.0 release  

---

### 🧩 References

- [MetaMask Snaps documentation](https://docs.metamask.io/snaps/)
- [OWASP Top 10 for Web3 Security](https://owasp.org/www-project-top-10-blockchain/)
- [Ethereum Security Best Practices](https://consensys.github.io/smart-contract-best-practices/)

---

_Last updated: 2025-10-21_
