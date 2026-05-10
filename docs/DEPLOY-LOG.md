r**: 🚀 Deployment & Audit Transparency

STG-Web3 menggunakan pipeline CI/CD yang terintegrasi dengan GitHub Actions untuk memastikan proses **test → deploy → verifikasi Etherscan → approval mainnet** berjalan aman dan transparan.

### 🔄 Workflow Overview
- **Test Job**: Semua unit test dijalankan otomatis pada setiap push/PR.
- **Deploy-Testnet**: Branch `develop` memicu deploy ke Sepolia testnet, termasuk verifikasi kontrak di Etherscan.
- **Deploy-Prod**: Branch `main` memicu deploy ke Ethereum mainnet. Job ini menggunakan environment `production` dan memerlukan approval manual dari reviewer sebelum berjalan.

### 📑 Deployment Log
Seluruh aktivitas deploy dicatat di file [`DEPLOY-LOG.md`](./DEPLOY-LOG.md).  
Log ini berisi tabel audit dengan kolom:
- **Waktu (UTC)** → waktu eksekusi job
- **Commit Hash** → identifikasi commit yang memicu deploy
- **Branch** → branch sumber (develop/main/hotfix)
- **Network** → target jaringan (Sepolia/Mainnet)
- **Status** → hasil eksekusi (SUCCESS/FAILED)
- **Catatan** → detail tambahan (misalnya alamat kontrak, tx hash, alasan rollback)

### 📋 Cara Membaca Log
- **Investor**: dapat melihat riwayat deploy untuk memastikan kontrak STGToken sudah diverifikasi di Etherscan.  
- **Regulator/Auditor**: dapat meninjau catatan kegagalan dan rollback plan untuk memastikan kepatuhan dan mitigasi risiko.  
- **Developer**: dapat melacak commit dan branch yang memicu deploy, serta memverifikasi alamat kontrak di Etherscan.

### 🔗 Verifikasi Kontrak
Setiap deploy menghasilkan file `deploy-address.txt` yang berisi alamat kontrak.  
Workflow otomatis menjalankan `hardhat verify` untuk memastikan kontrak diverifikasi di Etherscan.  
Link verifikasi akan muncul di log Actions, misalnya:


### 🛡️ Rollback Plan
Jika job `deploy-prod` gagal:
1. Job ditandai failed, artifact log diunduh.
2. Alamat kontrak/tx hash dicatat di `DEPLOY-LOG.md`.
3. Jika kontrak sempat terdeploy tapi tidak diverifikasi → tandai invalid, lakukan redeploy setelah hotfix.
4. Jika transaksi gagal sebelum deploy → perbaiki config, redeploy.
5. Reviewer wajib memverifikasi ulang sebelum approval environment `production`.

---


# STG-Web3 Deployment Log

| Waktu (UTC)        | Commit Hash | Branch   | Network  | Status   | Catatan                                      |
|--------------------|-------------|----------|----------|----------|----------------------------------------------|
| 2026-05-10 07:45   | a1b2c3d     | develop  | Sepolia  | SUCCESS  | Deploy-testnet berhasil, kontrak diverifikasi |
| 2026-05-10 08:00   | d4e5f6g     | main     | Mainnet  | FAILED   | Gas estimation error, rollback dilakukan      |
| 2026-05-10 08:30   | h7i8j9k     | hotfix   | Sepolia  | SUCCESS  | Hotfix branch diuji di testnet, verifikasi OK |
| 2026-05-10 09:00   | l0m1n2o     | main     | Mainnet  | SUCCESS  | Deploy-prod berhasil, kontrak diverifikasi    |
