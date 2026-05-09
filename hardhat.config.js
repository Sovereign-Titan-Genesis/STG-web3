require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

const ALCHEMY_KEY = process.env.ALCHEMY_API_KEY || "";
const INFURA_ID = process.env.INFURA_PROJECT_ID || "";
const DEPLOYER_KEY = process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : [];

module.exports = {
  solidity: "0.8.19",
  networks: {
    localhost: { url: "http://127.0.0.1:8545" },
    sepolia: {
      url: ALCHEMY_KEY ? `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_KEY}` : `https://sepolia.infura.io/v3/${INFURA_ID}`,
      accounts: DEPLOYER_KEY,
    },
    mainnet: {
      url: ALCHEMY_KEY ? `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}` : `https://mainnet.infura.io/v3/${INFURA_ID}`,
      accounts: DEPLOYER_KEY,
    },
  },
  etherscan: { apiKey: process.env.ETHERSCAN_API_KEY || "" },
  mocha: { timeout: 200000 }
};
