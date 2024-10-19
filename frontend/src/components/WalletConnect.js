import React, { useState } from 'react';
import { ethers } from 'ethers';

const WalletConnect = ({ setWalletAddress }) => {
    const [error, setError] = useState('');

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setWalletAddress(accounts[0]);
                setError('');
            } catch (err) {
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
