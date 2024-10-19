// test/SolanaSharedWallet.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SolanaSharedWallet", function () {
  let SolanaSharedWallet, wallet, owner, addr1, addr2;

  beforeEach(async function () {
    SolanaSharedWallet = await ethers.getContractFactory("SolanaSharedWallet");
    [owner, addr1, addr2, _] = await ethers.getSigners();
    wallet = await SolanaSharedWallet.deploy();
    await wallet.deployed();
  });

  it("Should set the right owner", async function () {
    expect(await wallet.owner()).to.equal(owner.address);
  });

  it("Should accept deposits", async function () {
    await wallet.connect(addr1).deposit({ value: ethers.utils.parseEther("1") });
    expect(await wallet.contributions(addr1.address)).to.equal(ethers.utils.parseEther("1"));
    expect(await wallet.totalContributions()).to.equal(ethers.utils.parseEther("1"));
  });

  it("Owner can trade SOL", async function () {
    await wallet.connect(addr1).deposit({ value: ethers.utils.parseEther("2") });

    // Initial balance of owner
    const initialOwnerBalance = await ethers.provider.getBalance(owner.address);

    // Trade 1 SOL
    const tx = await wallet.connect(owner).trade(ethers.utils.parseEther("1"), "Test Trade");
    const receipt = await tx.wait();

    // Gas cost
    const gasUsed = receipt.gasUsed.mul(tx.gasPrice);

    // Final balance of owner
    const finalOwnerBalance = await ethers.provider.getBalance(owner.address);

    expect(finalOwnerBalance).to.equal(initialOwnerBalance.add(ethers.utils.parseEther("1")).sub(gasUsed));
  });

  it("Contributors can withdraw their share", async function () {
    await wallet.connect(addr1).deposit({ value: ethers.utils.parseEther("3") });
    await wallet.connect(addr2).deposit({ value: ethers.utils.parseEther("1") });

    // Owner trades 1 SOL, reducing contract balance to 3 SOL
    await wallet.connect(owner).trade(ethers.utils.parseEther("1"), "Test Trade");

    // Withdraw for addr1
    const initialAddr1Balance = await ethers.provider.getBalance(addr1.address);
    const tx1 = await wallet.connect(addr1).withdraw();
    const receipt1 = await tx1.wait();
    const gasUsed1 = receipt1.gasUsed.mul(tx1.gasPrice);
    const finalAddr1Balance = await ethers.provider.getBalance(addr1.address);

    expect(finalAddr1Balance).to.equal(initialAddr1Balance.add(ethers.utils.parseEther("2.25")).sub(gasUsed1)); // 3 SOL * (3/4) = 2.25 SOL

    // Withdraw for addr2
    const initialAddr2Balance = await ethers.provider.getBalance(addr2.address);
    const tx2 = await wallet.connect(addr2).withdraw();
    const receipt2 = await tx2.wait();
    const gasUsed2 = receipt2.gasUsed.mul(tx2.gasPrice);
    const finalAddr2Balance = await ethers.provider.getBalance(addr2.address);

    expect(finalAddr2Balance).to.equal(initialAddr2Balance.add(ethers.utils.parseEther("0.75")).sub(gasUsed2)); // 3 SOL * (1/4) = 0.75 SOL
  });

  it("Should reject non-owner trades", async function () {
    await wallet.connect(addr1).deposit({ value: ethers.utils.parseEther("1") });
    await expect(
      wallet.connect(addr1).trade(ethers.utils.parseEther("1"), "Unauthorized Trade")
    ).to.be.revertedWith("Not the owner");
  });
});