import React, { useState } from 'react';
import { ethers } from 'ethers';
import SolanaSharedWalletABI from '../artifacts/SolanaSharedWallet.json'; // Adjust path as necessary

const ContributorDashboard = ({ walletAddress }) => {
    const contractAddress = '0xYourContractAddress'; // Replace with your deployed contract address

    const handleWithdraw = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, SolanaSharedWalletABI.abi, signer);

        try {
            const tx = await contract.withdraw();
            await tx.wait();
            alert('Withdrawal successful!');
        } catch (error) {
            console.error(error);
            alert('Withdrawal failed!');
        }
    };

    return (
        <div>
            <h2>Contributor Dashboard</h2>
            <button onClick={handleWithdraw}>Withdraw My Contribution</button>
        </div>
    );
};

export default ContributorDashboard;
