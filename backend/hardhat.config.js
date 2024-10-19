require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
// Removed the Upgrades plugin requirement

// Load environment variables from a .env file
require("dotenv").config();

const { PRIVATE_KEY, NEON_TESTNET_RPC_URL, NEON_API_KEY, ETHERSCAN_API_KEY } = process.env;

// Remove debugging logs after verification
// console.log("PRIVATE_KEY:", PRIVATE_KEY ? "Loaded" : "Not Loaded");
// console.log("NEON_TESTNET_RPC_URL:", NEON_TESTNET_RPC_URL);

module.exports = {
  solidity: "0.8.20", // Specify the Solidity version
  paths: {
    sources: "./contracts", // Path to your contracts
    tests: "./test",        // Path to your tests
    cache: "./cache",
    artifacts: "./artifacts"
  },
  networks: {
    hardhat: {
      chainId: 1337 // Local Hardhat network
    },
    neonTestnet: {
      url: NEON_TESTNET_RPC_URL || "https://proxy.testnet.neonlabs.org/solana",
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 245022926, // Ensure this matches Neon Testnet's chainId
      // Optional: Specify gas settings if needed
    },
    // You can add Neon Mainnet configuration similarly if desired
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY // If Neon EVM supports Etherscan-like verification
  }
};
