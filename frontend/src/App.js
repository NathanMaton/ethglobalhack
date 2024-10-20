import React, { useState } from 'react';
import WalletConnect from './components/WalletConnect';
import OwnerDashboard from './components/OwnerDashboard';
import ContributorDashboard from './components/ContributorDashboard';
import CreateWallet from './components/CreateWallet'; // Import the new component

const App = () => {
    const [walletAddress, setWalletAddress] = useState('');
    const isOwner = walletAddress === '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'; // Replace with the actual owner's address

    console.log("Current Wallet Address:", walletAddress); // Log the current wallet address

    return (
        <div>
            <h1>Solana Shared Wallet</h1>
            {!walletAddress ? (
                <WalletConnect setWalletAddress={setWalletAddress} />
            ) : isOwner ? (
                <>
                    <OwnerDashboard walletAddress={walletAddress} />
                    <CreateWallet walletAddress={walletAddress} /> {/* Show CreateWallet for the owner */}
                </>
            ) : (
                <ContributorDashboard walletAddress={walletAddress} />
            )}
        </div>
    );
};

export default App;
