// STG Web3 Connector: Jembatan Jantung ke Blockchain
// Menggunakan ABI ERC-20 Standar untuk QStateToken

const contractAddress = "0xcD6a42782d230D7c13A74ddec5dD140e55499Df9";
const abi = [ /* Tempelkan ABI JSON dari Sultan di sini */ ];

async function connectSovereignWallet() {
    if (window.ethereum) {
        try {
            // 1. Minta akses ke MetaMask
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const userAddress = accounts[0];
            console.log("Sovereign User Connected:", userAddress);

            // 2. Inisialisasi Provider & Kontrak
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(contractAddress, abi, provider);

            // 3. Panggil Saldo AKSA (H2K Logic)
            const balance = await contract.balanceOf(userAddress);
            const decimals = await contract.decimals();
            
            // Format saldo agar sesuai dengan denominasi AKSA
            const formattedBalance = ethers.utils.formatUnits(balance, decimals);
            
            // 4. Tampilkan ke Dashboard Visual
            document.getElementById('valuation').innerText = "Saldo AKSA: " + formattedBalance;
            alert("Koneksi H2K Berhasil! Detak Jantung Terverifikasi.");

        } catch (error) {
            console.error("Koneksi Gagal:", error);
        }
    } else {
        alert("Gagal: MetaMask/Titan Hardware tidak terdeteksi!");
    }
}
