import './download-extension.css';

export const DownloadExtension = () => (
    <div className="download-extension">
        Please download or turn on extension MetaMask
        <button className="download-extension__button">
            <a
                className="download-extension__link"
                href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
                target="_blank"
                rel="noreferrer"
            >
                Download or Turn on
            </a>
        </button>
        And refresh the page
    </div>
);
