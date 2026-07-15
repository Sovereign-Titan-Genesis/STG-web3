# STG-Web3

Sovereign Titan Genesis — Web3 Transition Layer

## 🚀 Deployment & CI/CD Status

![CI](https://github.com/Sovereign-Titan-Genesis/STG-web3/actions/workflows/ci.yml/badge.svg)

Pipeline CI/CD untuk **STG-Web3**:
- **Test Job** → menjalankan unit test pada setiap push/PR.
- **Deploy-Testnet** → branch `develop` memicu deploy ke Sepolia testnet + verifikasi Etherscan.
- **Deploy-Prod** → branch `main` memicu deploy ke Ethereum mainnet, job ini memakai environment `production` dan memerlukan approval reviewer.

### 📑 Deployment Log
Seluruh aktivitas deploy dicatat di [`DEPLOY-LOG.md`](./DEPLOY-LOG.md).  
Log ini berisi tabel audit dengan kolom waktu, commit hash, branch, network, status, dan catatan.

### 🔗 Verifikasi Kontrak
Setiap deploy menghasilkan file `deploy-address.txt` berisi alamat kontrak.  
Workflow otomatis menjalankan `hardhat verify` untuk memastikan kontrak diverifikasi di Etherscan.  
Link verifikasi akan muncul di log Actions, misalnya:
- Sepolia: `https://sepolia.etherscan.io/address/0x...#code`
- Mainnet: `https://etherscan.io/address/0x...#code`

### 🛡️ Rollback Plan
Jika job `deploy-prod` gagal:
1. Job ditandai failed, artifact log diunduh.
2. Alamat kontrak/tx hash dicatat di `DEPLOY-LOG.md`.
3. Jika kontrak sempat terdeploy tapi tidak diverifikasi → tandai invalid, lakukan redeploy setelah hotfix.
4. Jika transaksi gagal sebelum deploy → perbaiki config, redeploy.
5. Reviewer wajib memverifikasi ulang sebelum approval environment `production`.
6. 

## Overview
STG-Web3 adalah repositori resmi untuk pengembangan kontrak pintar Sovereign Titan Genesis (STG). Repo ini berfungsi sebagai jembatan antara sistem AI (STG-1AI) dan blockchain (Ethereum/Polygon testnet).

## Features
- Kontrak pintar STGToken (ERC-20 minimal)
- Script deploy menggunakan Hardhat
- Simulasi transaksi di local node
- Rencana integrasi ke Command OS dan Dashboard STG-1AI

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   
# STG-Web3 Deployment Log

| Waktu (UTC)        | Commit Hash | Branch   | Network  | Status   | Catatan                                      |
|--------------------|-------------|----------|----------|----------|----------------------------------------------|
| 2026-05-10 07:45   | a1b2c3d     | develop  | Sepolia  | SUCCESS  | Deploy-testnet berhasil, kontrak diverifikasi |
| 2026-05-10 08:00   | d4e5f6g     | main     | Mainnet  | FAILED   | Gas estimation error, rollback dilakukan      |
| 2026-05-10 08:30   | h7i8j9k     | hotfix   | Sepolia  | SUCCESS  | Hotfix branch diuji di testnet, verifikasi OK |
| 2026-05-10 09:00   | l0m1n2o     | main     | Mainnet  | SUCCESS  | Deploy-prod berhasil, kontrak diverifikasi    |


# STG-web3

STG-web3 adalah lapisan antarmuka RPC dan SDK untuk ekosistem STG.  
Fokus utama: **RPC node**, **SDK lintas bahasa**, dan **explorer API**.

## ✨ Fitur Utama
- RPC node kompatibel JSON-RPC (eth_call, eth_sendTransaction, dll).
- SDK untuk JavaScript, Python, Go, dan integrasi lintas bahasa.
- Explorer API untuk query blok, transaksi, dan status proof.
- Integrasi langsung dengan STG-Chain & STG-CONSESUS.

## 📂 Struktur
- `rpc/` → server RPC & handler.
- `sdk/` → library JS, Python, Go.
- `explorer/` → API & UI explorer.

## 🚀 Roadmap
- v0.1 → RPC node internal.
- v0.2 → SDK publik + explorer sederhana.
- v1.0 → Explorer penuh + integrasi wallet eksternal.

## 🔒 Keamanan
Endpoint RPC dilindungi dengan rate limiting & monitoring.

## 🤝 Kontribusi
Lihat [CONTRIBUTING.md](CONTRIBUTING.md).



## 🔄 CI/CD Flow stroke-width

```mermaid
flowchart LR
    A[Test] --> B[Deploy-Testnet]
    B --> C[Verify (Sepolia Etherscan)]
    C --> D[Deploy-Prod]
    D --> E[Verify (Mainnet Etherscan)]

    style A fill:#6cf,stroke:#333,stroke-width:2px
    style B fill:#f96,stroke:#333,stroke-width:2px
    style C fill:#9f6,stroke:#333,stroke-width:2px
    style D fill:#f66,stroke:#333,stroke-width:2px
    style E fill:#6f9,stroke:#333,stroke-width:2px
---

### 📋 Penjelasan Node
- **[Test](ca://s?q=CI_CD_Test_Job)** → Unit test dijalankan otomatis setiap push/PR.  
- **[Deploy-Testnet](ca://s?q=CI_CD_Deploy_Testnet)** → Branch `develop` memicu deploy ke Sepolia.  
- **[Verify Sepolia](ca://s?q=CI_CD_Verify_Sepolia_Etherscan)** → Kontrak diverifikasi di Sepolia Etherscan.  
- **[Deploy-Prod](ca://s?q=CI_CD_Deploy_Prod_Mainnet)** → Branch `main` memicu deploy ke mainnet (approval environment `production`).  
- **[Verify Mainnet](ca://s?q=CI_CD_Verify_Mainnet_Etherscan)** → Kontrak diverifikasi di Etherscan Mainnet.  

---

### 🎯 Manfaat Visualisasi
- **Investor**: langsung melihat alur deploy dan titik verifikasi.  
- **Regulator/Auditor**: memahami kontrol approval di mainnet.  
- **Developer**: tahu urutan job dan dependensi antar langkah.  

--     
## 🔄 CI/CD Flow Diagram

```mermaid
flowchart LR
    A[Test] --> B[Deploy-Testnet]
    B --> C[Verify (Sepolia Etherscan)]
    C --> D[Deploy-Prod]
    D --> E[Verify (Mainnet Etherscan)]

    style A fill:#6cf,stroke:#333,stroke-width:2px
    style B fill:#f96,stroke:#333,stroke-width:2px
    style C fill:#9f6,stroke:#333,stroke-width:2px
    style D fill:#f66,stroke:#333,stroke-width:2px
    style E fill:#6f9,stroke:#333,stroke-width:2px



---

### 📋 Penjelasan Node
- **[Test](ca://s?q=CI_CD_Test_Job)** → Unit test dijalankan otomatis setiap push/PR.  
- **[Deploy-Testnet](ca://s?q=CI_CD_Deploy_Testnet)** → Branch `develop` memicu deploy ke Sepolia.  
- **[Verify Sepolia](ca://s?q=CI_CD_Verify_Sepolia_Etherscan)** → Kontrak diverifikasi di Sepolia Etherscan.  
- **[Deploy-Prod](ca://s?q=CI_CD_Deploy_Prod_Mainnet)** → Branch `main` memicu deploy ke mainnet (approval environment `production`).  
- **[Verify Mainnet](ca://s?q=CI_CD_Verify_Mainnet_Etherscan)** → Kontrak diverifikasi di Etherscan Mainnet.  

---

### 🎯 Manfaat Visualisasi
- **Investor**: langsung melihat alur deploy dan titik verifikasi.  
- **Regulator/Auditor**: memahami kontrol approval di mainnet.  
- **Developer**: tahu urutan job dan dependensi antar langkah.  

---








