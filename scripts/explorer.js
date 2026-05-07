// scripts/explorer.js
async function main() {
  // Ambil akun dari Hardhat local node
  const [owner, user1, user2] = await ethers.getSigners();

  // Ganti dengan alamat kontrak hasil deploy di localhost
  const contractAddress = "ALAMAT_KONTRAK_LOCAL";
  const Token = await ethers.getContractFactory("STGToken");
  const token = await Token.attach(contractAddress);

  // Simulasi beberapa transaksi
  console.log("=== Simulasi Transaksi STG ===");
  let tx1 = await token.transfer(user1.address, 50);
  await tx1.wait();
  console.log("TX1 Hash:", tx1.hash);

  let tx2 = await token.connect(user1).transfer(user2.address, 20);
  await tx2.wait();
  console.log("TX2 Hash:", tx2.hash);

  // Tampilkan saldo akhir
  console.log("=== Saldo Akhir ===");
  console.log("Owner:", await token.balanceOf(owner.address));
  console.log("User1:", await token.balanceOf(user1.address));
  console.log("User2:", await token.balanceOf(user2.address));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
