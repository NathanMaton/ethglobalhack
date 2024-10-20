const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying SolanaSharedWallet with the account:", deployer.address);
  
    const SolanaSharedWallet = await ethers.getContractFactory("SolanaSharedWallet");
    const wallet = await SolanaSharedWallet.deploy();
  
    await wallet.deployed();
  
    console.log("SolanaSharedWallet deployed to:", wallet.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error("Error deploying SolanaSharedWallet contract:", error);
    process.exit(1);
  });