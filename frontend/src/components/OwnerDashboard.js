import React, { useState } from 'react';
import { ethers } from 'ethers';
import SolanaSharedWalletABI from '../artifacts/SolanaSharedWallet.json'; // Adjust path as necessary

const OwnerDashboard = ({ walletAddress }) => {
    const [tradeAmount, setTradeAmount] = useState('');
    const [tradeDetails, setTradeDetails] = useState('');
    const contractAddress = '0xYourContractAddress'; // Replace with your deployed contract address

    const handleTrade = async () => {
        if (!tradeAmount || !tradeDetails) return;

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, SolanaSharedWalletABI.abi, signer);

        try {
            const tx = await contract.trade(ethers.utils.parseEther(tradeAmount), tradeDetails);
            await tx.wait();
            alert('Trade successful!');
        } catch (error) {
            console.error(error);
            alert('Trade failed!');
        }
    };

    return (
        <div>
            <h2>Owner Dashboard</h2>
            <input
                type="text"
                placeholder="Trade Amount (SOL)"
                value={tradeAmount}
                onChange={(e) => setTradeAmount(e.target.value)}
            />
            <input
                type="text"
                placeholder="Trade Details"
                value={tradeDetails}
                onChange={(e) => setTradeDetails(e.target.value)}
            />
            <button onClick={handleTrade}>Make Trade</button>
        </div>
    );
};

export default OwnerDashboard;
