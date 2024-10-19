const { ethers } = require("hardhat");

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.NEON_TESTNET_RPC_URL);
  const network = await provider.getNetwork();
  console.log("Connected to network:", network);
  
  const blockNumber = await provider.getBlockNumber();
  console.log("Current Block Number:", blockNumber);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });
