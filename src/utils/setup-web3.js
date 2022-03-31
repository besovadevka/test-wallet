import Web3 from 'web3';

export const setupWeb3 = (onAccountChanged) => {
    if (window.ethereum) {
        window.ethereum.on('accountsChanged', onAccountChanged);
        const web3 = new Web3(window.ethereum);
        return web3;
    }

    return null;
};
