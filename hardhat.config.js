require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  defaultNetwork: "bscTestnet",

  networks: {
    bscTestnet: {
      url: "https://bsc-testnet.publicnode.com",
      chainId: 97,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      timeout: 60000
    }
  }
};x
