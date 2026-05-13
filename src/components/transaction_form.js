// STG-web3 Transaction Form Component (Production-Grade)
// Captures user inputs and transmits payload directly to local RPC Port 8545

export function renderTransactionForm(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
        <div style="border: 1px solid #d4af37; background: rgba(10,10,10,0.9); padding: 25px; font-family: 'Courier New', monospace; color: #00ff00; width: 400px; margin: 20px auto; box-shadow: 0 0 20px rgba(212,175,55,0.2);">
            <h3 style="color: #d4af37; letter-spacing: 2px; margin-top: 0;">🏛️ METAPORTATION TERMINAL</h3>
            <p style="font-size: 0.8em; color: #888; margin-bottom: 20px;">TRANSFER ASSETS ACROSS NUSANTARA-ROOT CORES</p>
            
            <div style="margin-bottom: 15px; text-align: left;">
                <label style="font-size: 0.8em; color: #aaa;">SENDER (FROM):</label><br>
                <input type="text" id="txFrom" style="width: 100%; background: #000; border: 1px solid #333; color: #fff; padding: 8px; margin-top: 5px;" value="0x3AA63941Fe0Ce029f4523c57A30C6dca3cB7343F">
            </div>

            <div style="margin-bottom: 15px; text-align: left;">
                <label style="font-size: 0.8em; color: #aaa;">RECIPIENT (TO):</label><br>
                <input type="text" id="txTo" style="width: 100%; background: #000; border: 1px solid #333; color: #fff; padding: 8px; margin-top: 5px;" placeholder="0x...">
            </div>

            <div style="margin-bottom: 20px; text-align: left;">
                <label style="font-size: 0.8em; color: #aaa;">AMOUNT (QUBICOIN):</label><br>
                <input type="number" id="txAmount" style="width: 100%; background: #000; border: 1px solid #333; color: #fff; padding: 8px; margin-top: 5px;" placeholder="0">
            </div>

            <button id="btnTransmit" style="width: 100%; padding: 12px; background: transparent; border: 1px solid #00ff00; color: #00ff00; cursor: pointer; letter-spacing: 2px; font-weight: bold;">TRANSMIT VALUE</button>
            <pre id="txStatus" style="margin-top: 15px; font-size: 0.7em; color: #888; white-space: pre-wrap; text-align: left; background: #000; padding: 10px; max-height: 100px; overflow-y: auto;">Status: Awaiting transmission pulse...</pre>
        </div>
     Amin
    `;

    document.getElementById('btnTransmit').addEventListener('click', executeMetaportation);
}

async function executeMetaportation() {
    const from = document.getElementById('txFrom').value;
    const to = document.getElementById('txTo').value;
    const amount = document.getElementById('txAmount').value;
    const statusDisplay = document.getElementById('txStatus');

    if (!to || !amount) {
        statusDisplay.innerText = "Error: Input parameters are incomplete.";
        statusDisplay.style.color = "#ff0000";
        return;
    }

    statusDisplay.innerText = "[LOG]: Processing payload to Hexadecimal structure...";
    statusDisplay.style.color = "#888";

    // Konversi nilai desimal ke Hex string standar EVM/STG
    const hexValue = "0x" + parseInt(amount).toString(16);

    const rpcPayload = {
        jsonrpc: "2.0",
        method: "eth_sendTransaction",
        params: [{
            from: from,
            to: to,
            value: hexValue
        }],
        id: Date.now()
    };

    try {
        const response = await fetch("http://localhost:8545", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(rpcPayload)
        });

        const data = await response.json();
        
        if (data.error) {
            statusDisplay.innerText = `🚨 REJECTED BY NODE:\n${JSON.stringify(data.error)}`;
            statusDisplay.style.color = "#ff0000";
        } else {
            statusDisplay.innerText = `✅ TRANSMISSION SUCCESS:\nBlock Tx Hash: ${data.result}`;
            statusDisplay.style.color = "#00ff00";
        }
    } catch (err) {
        statusDisplay.innerText = `🚨 CONNECTION FAILED:\nCheck if stg-node is running on port 8545.`;
        statusDisplay.style.color = "#ff0000";
    }
}
