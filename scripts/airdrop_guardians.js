const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const contractAddress = "ALAMAT_KONTRAK_LENCANA_SULTAN"; // Ganti setelah deploy
  const [deployer] = await ethers.getSigners();

  console.log("🚀 Memulai Operasi Airdrop Lencana Guardian...");
  const GuardianBadge = await ethers.getContractAt("GenesisGuardianToken", contractAddress);

  // Ambil daftar 1.000 alamat dari file eksternal
  const guardianList = JSON.parse(fs.readFileSync("./scripts/guardian_list.json", "utf-8"));

  for (let i = 0; i < guardianList.length; i++) {
    try {
      console.log(`📡 Mengirim Lencana ke ${i + 1}: ${guardianList[i]}`);
      const tx = await GuardianBadge.awardGuardian(guardianList[i]);
      await tx.wait();
      console.log(`✅ Sukses: ${tx.hash}`);
    } catch (error) {
      console.error(`❌ Gagal di alamat ${guardianList[i]}:`, error.message);
    }
  }

  console.log("🏁 Operasi Selesai. 1.000 Guardian Telah Tersegel.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
