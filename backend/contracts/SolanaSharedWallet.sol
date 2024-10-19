// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SolanaSharedWallet {
    address public owner;
    uint256 public totalContributions;
    mapping(address => uint256) public contributions;

    event Deposited(address indexed contributor, uint256 amount);
    event Withdrawn(address indexed contributor, uint256 amount);
    event OwnerTraded(address indexed owner, uint256 amount, string tradeDetails);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Allow contributors to deposit SOL
    function deposit() public payable {
        require(msg.value > 0, "Must send SOL");
        contributions[msg.sender] += msg.value;
        totalContributions += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    // Owner can perform trades or swaps with SOL
    function trade(uint256 amount, string calldata tradeDetails) external onlyOwner {
        require(amount <= address(this).balance, "Insufficient SOL balance");
        // Implement actual trading logic here (e.g., interacting with a Solana DEX)
        // For demonstration, we'll emit an event and transfer SOL to owner
        emit OwnerTraded(owner, amount, tradeDetails);
        payable(owner).transfer(amount);
    }

    // Contributors can withdraw their proportional share of SOL
    function withdraw() external {
        uint256 userContribution = contributions[msg.sender];
        require(userContribution > 0, "No contributions found");

        uint256 walletBalance = address(this).balance;
        uint256 userShare = (userContribution * walletBalance) / totalContributions;

        // Update state before transferring to prevent reentrancy
        contributions[msg.sender] = 0;
        totalContributions -= userContribution;

        payable(msg.sender).transfer(userShare);
        emit Withdrawn(msg.sender, userShare);
    }

    // Fallback function to accept SOL
    receive() external payable {
        deposit();
    }
}
