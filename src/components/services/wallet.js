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

