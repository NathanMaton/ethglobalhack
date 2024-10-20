import React, { useState } from 'react';
import { ethers } from 'ethers';
import WalletFactoryABI from '../artifacts/contracts/WalletFactory.sol/WalletFactory.json'; // Adjust path as necessary

const CreateWallet = ({ walletAddress }) => {
    const [contributorAddress, setContributorAddress] = useState('');
    const contractAddress = '0xCdb63c58b907e76872474A0597C5252eDC97c883'; // Replace with your deployed WalletFactory contract address

    const handleCreateWallet = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, WalletFactoryABI.abi, signer);

        try {
            const tx = await contract.createWallet();
            await tx.wait();
            alert('Wallet created successfully!');
        } catch (error) {
            console.error(error);
            alert('Wallet creation failed!');
        }
    };

    const handleAddContributor = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, WalletFactoryABI.abi, signer);

        try {
            const tx = await contract.addContributor(contributorAddress);
            await tx.wait();
            alert('Contributor added successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to add contributor!');
        }
    };

    return (
        <div>
            <h2>Create New Wallet</h2>
            <button onClick={handleCreateWallet}>Create Wallet</button>
            <h3>Add Contributor</h3>
            <input
                type="text"
                placeholder="Contributor Address"
                value={contributorAddress}
                onChange={(e) => setContributorAddress(e.target.value)}
            />
            <button onClick={handleAddContributor}>Add Contributor</button>
        </div>
    );
};

export default CreateWallet;
