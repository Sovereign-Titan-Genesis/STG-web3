<<<<<<< HEAD
const hre = require("hardhat");

async function main() {
  const Token = await hre.ethers.getContractFactory("Qubicoin");
  const token = await Token.deploy();

  await token.deployed();

  console.log("Deployed to:", token.address);
=======
// scripts/deploy.js
async function main() {
  // Ambil kontrak STGToken dari folder contracts
  const Token = await ethers.getContractFactory("STGToken");

  console.log("Deploying STGToken...");
  const token = await Token.deploy();

  await token.waitForDeployment();

  console.log("STGToken deployed to:", await token.getAddress());
>>>>>>> 186adb95d9b964804dbe6832c172c56397b52bda
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
