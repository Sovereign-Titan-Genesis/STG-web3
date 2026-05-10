// stg-web3/scripts/deploySTGToken.js
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const Token = await ethers.getContractFactory("STGToken");
  const token = await Token.deploy();
  await token.waitForDeployment();

  const address = await token.getAddress();
  console.log("STGToken deployed to:", address);

  const tx = token.deployTransaction;
  console.log("Deploy tx hash:", tx.hash);

  // Simpan alamat kontrak ke file untuk verifikasi otomatis
  fs.writeFileSync("deploy-address.txt", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
