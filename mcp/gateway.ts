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

// Tool: Get Balance
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

// Tool: Execute Transfer (nyata)
app.post('/mcp/executeTransfer', async (req, res) => {
  const { from, to, amount, token, provider, privateKey } = req.body;
  try {
    const wallet = new ethers.Wallet(privateKey, providers[provider] || providers['stg']);
    const contract = new ethers.Contract(token, [
      "function transfer(address to, uint256 amount) returns (bool)"
    ], wallet);
    const tx = await contract.transfer(to, amount);
    await tx.wait();
    res.json({ status: "success", txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Tool: Get Document Proof
app.post('/mcp/getDocumentProof', async (req, res) => {
  const { hash } = req.body;
  // Placeholder: integrate with SSPA Human Rights Ledger
  res.json({ hash, verified: true, timestamp: Date.now() });
});

// Tool: Register Identity
app.post('/mcp/registerIdentity', async (req, res) => {
  const { address, metadata } = req.body;
  // Placeholder: integrate with STG Identity smart contract
  res.json({ address, metadata, status: "registered" });
});

// Tool: Audit Trail
app.post('/mcp/auditTrail', async (req, res) => {
  const { action, userId } = req.body;
  // Placeholder: log to STG AuditTrail
  console.log(`[AUDIT] ${Date.now()} - ${userId} - ${action}`);
  res.json({ status: "logged" });
});

app.listen(4000, () => {
  console.log("STG MCP Gateway running on port 4000");
});
// Tool: Register Identity
app.post('/mcp/registerIdentity', async (req, res) => {
  const { address, metadata, provider, privateKey } = req.body;
  try {
    const wallet = new ethers.Wallet(privateKey, providers[provider] || providers['stg']);
    const contract = new ethers.Contract(process.env.IDENTITY_CONTRACT, [
      "function registerIdentity(string metadata)",
      "function updateIdentity(string metadata)",
      "function deactivateIdentity()"
    ], wallet);

    const tx = await contract.registerIdentity(metadata);
    await tx.wait();
    res.json({ status: "success", txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
