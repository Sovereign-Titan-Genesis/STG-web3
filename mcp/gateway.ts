import express from 'express';
import { ethers } from 'ethers';

const app = express();
app.use(express.json());

// Provider abstraction
const providers = {
  alchemy: new ethers.JsonRpcProvider(process.env.ALCHEMY_URL),
  infura: new ethers.JsonRpcProvider(process.env.INFURA_URL),
  stg: new ethers.JsonRpcProvider(process.env.STG_RPC_URL)
};

// Example MCP Tool: Get Balance
app.post('/mcp/getBalance', async (req, res) => {
  const { address, token, provider } = req.body;
  try {
    const contract = new ethers.Contract(token, [
      "function balanceOf(address) view returns (uint256)"
    ], providers[provider] || providers['stg']);
    const balance = await contract.balanceOf(address);
    res.json({ address, token, balance: balance.toString() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Example MCP Tool: Get Validators
app.post('/mcp/getValidators', async (req, res) => {
  // Placeholder: integrate with STG-Consensus
  const validators = [
    { id: "validator1", status: "active" },
    { id: "validator2", status: "inactive" }
  ];
  res.json({ validators });
});

app.listen(4000, () => {
  console.log("STG MCP Gateway running on port 4000");
});
