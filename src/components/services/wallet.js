export const STG_CHAIN_CONFIG = {
    chainId: '0x13881', // 80001 (Polygon Mumbai) / sesuaikan dengan port lokal localhost
    chainName: 'STG Hardhat Devnet',
    rpcUrls: ['http://127.0.0.1:8545']
};

export const CONTRACT_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
export const MINIMAL_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint256)"
];
import { fetchTokenData, fetchUserBalance } from './services/wallet.js';

async function updateLiveTelemetry(userAddress) {
    const metaData = await fetchTokenData();
    if (metaData) {
        document.getElementById('token-identifier').innerText = `${metaData.name} [${metaData.symbol}]`;
        document.getElementById('token-symbol').innerText = metaData.symbol;
        document.getElementById('token-supply').innerText = metaData.supply;
    }
    
    if (userAddress) {
        const balance = await fetchUserBalance(userAddress);
        document.getElementById('user-qubi-balance').innerText = balance;
    }
}

// Bind this update cycle to your existing wallet connection handler
window.ethereum.on('accountsChanged', (accounts) => {
    updateLiveTelemetry(accounts[0]);
});
import { proposeVaultRelease } from './services/wallet.js';

document.getElementById('btn-propose-release').addEventListener('click', async () => {
    const targetAddress = document.getElementById('target-withdrawal-address').value;
    const amount = document.getElementById('target-withdrawal-amount').value;
    const statusText = document.querySelector('.secured-text');
    const progressText = document.getElementById('current-approvals');
    const progressBar = document.getElementById('approval-progress');

    // Validasi Input Sederhana
    if (!targetAddress || !amount || amount <= 0) {
        alert("⚠️ Mohon isi alamat tujuan dan jumlah aset STG dengan benar!");
        return;
    }

    try {
        // Mengubah status UI menjadi mode memproses
        document.getElementById('btn-propose-release').innerText = "⏳ MENUNGGU DI DOMPET METAMASK...";
        document.getElementById('btn-propose-release').disabled = true;

        // Memanggil fungsi jembatan ke MetaMask
        const result = await proposeVaultRelease(targetAddress, amount);

        if (result.success) {
            alert(`🎉 Kunci Keamanan Pertama Berhasil Disahkan!\nTransaksi Hash: ${result.txHash}`);
            
            // Memperbarui visual NASA Command Center ke status multi-sig aktif
            statusText.innerText = "⏳ PENDING VERIFICATION (KUNCI 1 DISETUJUI)";
            statusText.style.color = "#ffcc00";
            progressText.innerText = "1 / 2 Wallet Terverifikasi";
            progressBar.style.width = "50%";
            progressBar.style.backgroundColor = "#ffcc00";
        } else {
            alert(`❌ Transaksi Dibatalkan atau Gagal: ${result.error}`);
        }
    } catch (err) {
        console.error(err);
    } finally {
        // Mengembalikan status tombol ke semula
        document.getElementById('btn-propose-release').innerText = "AJUKAN PROPOSAL PENCAIRAN (KUNCI 1)";
        document.getElementById('btn-propose-release').disabled = false;
    }
});
// STG Cryptographic Payload Obfuscator for Visual Privacy
export function maskCryptoAddress(address) {
    if (!address || address.length < 10) return "0x0000...0000";
    
    // Mengambil 6 karakter pertama (termasuk 0x) dan 4 karakter terakhir
    const prefix = address.substring(0, 6);
    const suffix = address.substring(address.length - 4);
    
    return `${prefix}...${suffix}`.toUpperCase();
}

// CONTOH CARA PENGGUNAAN PADA UI:
// const rawAddress = "0x3AA63941Fe0Ce029f4523c57A30C6dca3cB7343F";
// document.getElementById("wallet-display").innerText = maskCryptoAddress(rawAddress);
// Hasil di layar: 0X3AA6...343F

