// scripts/deploySTGToken.js
async function main() {
  const Token = await ethers.getContractFactory("STGToken");

  console.log("Deploying STGToken...");
  const token = await Token.deploy();

  await token.waitForDeployment();

  console.log("STGToken deployed to:", await token.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
