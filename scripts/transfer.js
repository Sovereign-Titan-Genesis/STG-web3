const hre = require("hardhat");

async function main() {
  // 1. Ambil akun simulasi dari Hardhat
  const [owner, user1] = await hre.ethers.getSigners();

  // 2. Masukkan address kontrak STG yang sudah di-deploy tadi
  // Ganti dengan address hasil deploy localhost Sultan
  const stgAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; 
  const STGToken = await hre.ethers.getContractFactory("STGToken");
  const token = await STGToken.attach(stgAddress);

  console.log("--- Memulai Simulasi Transfer STG ---");
  
  // 3. Cek Saldo Awal
  let ownerBalance = await token.balanceOf(owner.address);
  console.log(`Saldo Sultan (Owner): ${hre.ethers.utils.formatEther(ownerBalance)} STG`);

  // 4. Lakukan Transfer (Kirim 100 STG ke User1)
  const amount = hre.ethers.utils.parseEther("100");
  console.log(`Mengirim 100 STG ke User1 (${user1.address})...`);
  
  const tx = await token.transfer(user1.address, amount);
  await tx.wait(); // Tunggu konfirmasi blok

  // 5. Cek Saldo Akhir
  let user1Balance = await token.balanceOf(user1.address);
  console.log(`Transfer Berhasil!`);
  console.log(`Saldo User1 sekarang: ${hre.ethers.utils.formatEther(user1Balance)} STG`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

