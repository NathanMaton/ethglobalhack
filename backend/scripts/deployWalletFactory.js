const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying WalletFactory with the account:", deployer.address);

    const WalletFactory = await ethers.getContractFactory("WalletFactory");
    const walletFactory = await WalletFactory.deploy();

    await walletFactory.deployed();

    console.log("WalletFactory deployed to:", walletFactory.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error("Error deploying WalletFactory contract:", error);
    process.exit(1);
  });