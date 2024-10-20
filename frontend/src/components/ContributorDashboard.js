import React from 'react';
import { ethers } from 'ethers';
import SolanaSharedWalletABI from '../artifacts/contracts/SolanaSharedWallet.sol/SolanaSharedWallet.json'; // Adjust path as necessary

const ContributorDashboard = ({ walletAddress }) => {
    const contractAddress = '0xYourContractAddress'; // Replace with your deployed contract address

    const handleWithdraw = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum); // Updated for v6
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, SolanaSharedWalletABI.abi, signer);

        try {
            const tx = await contract.withdraw(); // Call withdraw function
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
