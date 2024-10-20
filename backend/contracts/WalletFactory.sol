   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.0;

   contract WalletFactory {
       struct Wallet {
           address owner;
           mapping(address => bool) contributors;
       }

       mapping(address => Wallet) public wallets;

       event WalletCreated(address indexed owner);
       event ContributorAdded(address indexed wallet, address indexed contributor);

       function createWallet() external {
           require(wallets[msg.sender].owner == address(0), "Wallet already exists");
           wallets[msg.sender].owner = msg.sender;
           emit WalletCreated(msg.sender);
       }

       function addContributor(address contributor) external {
           require(wallets[msg.sender].owner == msg.sender, "Only owner can add contributors");
           wallets[msg.sender].contributors[contributor] = true;
           emit ContributorAdded(msg.sender, contributor);
       }

       function isContributor(address wallet, address contributor) external view returns (bool) {
           return wallets[wallet].contributors[contributor];
       }
   }