export const getPublicKey = (web3, account, callback) =>
    web3.currentProvider
        .request({
            method: 'eth_getEncryptionPublicKey',
            params: [account],
        })
        .then(callback)
        .catch(console.log);
