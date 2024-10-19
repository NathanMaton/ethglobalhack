import React, { useState } from 'react';
import WalletConnect from './components/WalletConnect';
import OwnerDashboard from './components/OwnerDashboard';
import ContributorDashboard from './components/ContributorDashboard';

const App = () => {
    const [walletAddress, setWalletAddress] = useState('');
    const isOwner = walletAddress === '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'; // Replace with actual owner address

    return (
        <div>
            <h1>Solana Shared Wallet</h1>
            {!walletAddress ? (
                <WalletConnect setWalletAddress={setWalletAddress} />
            ) : isOwner ? (
                <OwnerDashboard walletAddress={walletAddress} />
            ) : (
                <ContributorDashboard walletAddress={walletAddress} />
            )}
        </div>
    );
};

export default App;