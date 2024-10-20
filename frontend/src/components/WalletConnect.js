import React, { useState } from 'react';
import { ethers } from 'ethers';

const WalletConnect = ({ setWalletAddress }) => {
    const [error, setError] = useState('');

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                console.log("Connected account:", accounts[0]); // Log the connected account
                setWalletAddress(accounts[0]); // Update the wallet address in App.js
                setError('');
            } catch (err) {
                console.error("Connection error:", err); // Log any errors
                setError('Failed to connect wallet');
            }
        } else {
            setError('Please install MetaMask!');
        }
    };

    return (
        <div>
            <button onClick={connectWallet}>Connect Wallet</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default WalletConnect;
