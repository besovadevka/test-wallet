import { useEffect, useState } from 'react';

import { DownloadExtension } from '../download-extension/download-extension';
import { KeyButton } from '../key-button/key-button';
import { LoginButton } from '../login-button/login-button';
import { PublicKey } from '../public-key/public-key';

import { setupWeb3 } from '../../utils/setup-web3';
import { getPublicKey } from '../../utils/get-public-key';

import logo from '../../images/logo.png';

import './app.css';

export const App = () => {
    const [account, setAccount] = useState(null);
    const [publicKey, setPublicKey] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [showPublicKey, setShowPublicKey] = useState(false);

    useEffect(() => {
        if (!account) {
            setPublicKey(null);
            setShowPublicKey(false);
        }
    }, [account]);

    const web3 = setupWeb3((accounts) => {
        const nextAccount = accounts[0];
        if (nextAccount !== account) setAccount(nextAccount);
    });

    const setAccountAndGetKey = (accounts, onReceivePublicKey) => {
        if (accounts.length) {
            const account = accounts[0];
            setAccount(account);
            getPublicKey(web3, account, onReceivePublicKey);
        }
    };

    const onClickKeyButton = () =>
        web3.eth.getAccounts().then((accounts) =>
            accounts.length === 0
                ? setShowLogin(true)
                : setAccountAndGetKey(accounts, (publicKey) => {
                      setPublicKey(publicKey);
                      setShowPublicKey(true);
                  })
        );
    const onClickLoginButton = () =>
        web3.eth.requestAccounts().then((accounts) =>
            setAccountAndGetKey(accounts, (publicKey) => {
                setPublicKey(publicKey);
                setShowPublicKey(true);
                setShowLogin(false);
            })
        );

    return (
        <div className="app">
            <img src={logo} className="app__logo" alt="logo" />
            {web3 ? (
                <>
                    <KeyButton onClick={onClickKeyButton} />
                    {showLogin ? <LoginButton onClick={onClickLoginButton} /> : null}
                    {showPublicKey && publicKey ? <PublicKey publicKey={publicKey} /> : null}
                </>
            ) : (
                <DownloadExtension />
            )}
        </div>
    );
};
