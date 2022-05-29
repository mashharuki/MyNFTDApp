import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import myEpicNft from "./artifacts/contracts/MyEpicNFT.sol/MyEpicNFT.json";

// Constantsを宣言する: constとは値書き換えを禁止した変数を宣言する方法です。
const TWITTER_HANDLE = 'HARUKI05758694';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const OPENSEA_LINK = '';
const TOTAL_MINT_COUNT = 50;
const CONTRACT_ADDRESS = "0x649Fe3F69345740e8dC2653a66BcCA79e3A5123A";

const App = () => {
  // ステート変数
  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      console.log("Make sure you have MetaMask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }
    // アカウント情報を取得する。
    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  };

  // connect walletボタンを押した時の処理
  const connectWallet = async () => {
    try {
      
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      console.log("Connected: ", accounts[0]);
      // ステート変数の情報を更新する。
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  // ConnectWalletメソッド
  const ConnectWallet = () => (
    <button className="cta-button connect-wallet-button" onClick={connectWallet}>
      Connect to Wallet
    </button>
  );

  // Mintボタンを押した時の処理!!
  const askContractToMintNft = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        // コントラクトを利用する準備を実施する。
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          myEpicNft.abi,
          signer
        );

        console.log("Going to pop wallet now to pay gas...");
        let nftTxn = await connectedContract.makeAnEpicNFT();
        console.log("Mining...please wait.");
        await nftTxn.wait();
  
        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
        alert("Mint success!!")
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">Mash NFT Mint</p>
          <p className="sub-text">
           我が家の愛犬の NFT を Mint します！！💫
          </p>
          {currentAccount === "" 
            ? 
              ConnectWallet() 
            :  
              (
                /* ユーザーが Mint NFT ボタンを押した時に、askContractToMintNft 関数を呼び出します　*/
                <button onClick={askContractToMintNft} className="cta-button connect-wallet-button">
                  Mint NFT
                </button>
              )
          }
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >
            {`built on @${TWITTER_HANDLE}`}
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
