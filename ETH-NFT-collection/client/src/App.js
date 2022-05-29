import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { ethers } from "ethers";
import MoonLoader from "react-spinners/MoonLoader";
import myEpicNft from "./artifacts/contracts/MashNFT.sol/MashNFT.json";

// Constantsを宣言する: constとは値書き換えを禁止した変数を宣言する方法です。
const TWITTER_HANDLE = 'HARUKI05758694';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const TOTAL_MINT_COUNT = 50;
const CONTRACT_ADDRESS = "0xb00Bb60074C60B6f0124A98eC5A156d4A7bf533a";
const OPENSEA_LINK = `https://testnets.opensea.io/collections`;
// スピナー用の変数
const override = css`
  display: block;
  margin: 0 auto;
`;

const App = () => {
  // ステート変数
  const [currentAccount, setCurrentAccount] = useState("");
  const [currentTokens, setCurrentTokens] = useState(0);
  const [MintingFlg, setMintingFlg] = useState(false);

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      console.log("Make sure you have MetaMask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }
    // Chain Idを取得する。
    let chainId = await ethereum.request({ method: "eth_chainId" });
    if (chainId !== "0x4") {
      alert("You are not connected to the Rinkeby Test Network!");
    } else {
      // アカウント情報を取得する。
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
        // イベントリスナーの設定
        setupEventListener();
      } else {
        console.log("No authorized account found");
      }
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
      
      // 接続しているチェーンが Rinkebyであることを確認する。
      let chainId = await ethereum.request({ method: "eth_chainId" });
      console.log("Connected to chain " + chainId);
      
      if (chainId !== "0x4") {
        alert("You are not connected to the Rinkeby Test Network!");
      } else {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        console.log("Connected: ", accounts[0]);
        // ステート変数の情報を更新する。
        setCurrentAccount(accounts[0]);
        // イベントリスナーの設定
        setupEventListener();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // イベントリスナー用のメソッド
  const setupEventListener = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          myEpicNft.abi,
          signer
        );
        // 現在の発行数を取得する。
        let total = await connectedContract.totalSupply();
        setCurrentTokens(total.toNumber());
        // NewEpicNFTMintedが発行されるのを待つ
        connectedContract.on("NewEpicNFTMinted", (from, tokenId) => {
          console.log(from, tokenId.toNumber());
          alert(
            `NFT を発行しました！ OpenSea に表示されるまで最大で10分かかることがあります。NFT へのリンクはこちらです: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`
          );
        });
        console.log("Setup event listener!");
      } else {
        console.log("Ethereum object doesn't exist!");
      }
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
          setMintingFlg(true);
          console.log("Mining...please wait.");
          await nftTxn.wait();
        
          console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
          setMintingFlg(false);
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
          <p className="mint-count">
            発行状況：  {currentTokens} / {TOTAL_MINT_COUNT}
          </p>
          {currentAccount === "" && currentTokens <= TOTAL_MINT_COUNT
            ? 
              ConnectWallet() 
            :  
              (
                /* ユーザーが Mint NFT ボタンを押した時に、askContractToMintNft 関数を呼び出します　*/
                <button 
                  onClick={askContractToMintNft} 
                  className="cta-button connect-wallet-button"
                >
                  Let's Mint NFT
                </button>
              )
          }
        </div>
        { MintingFlg ?
            (
              <div>
              <MoonLoader color="white" loading={MintingFlg} css={override} size={60} /><br/>
              <div className="spin-color">
                Now Minting ...
              </div>
              </div>
            ) :<></>
        }
        <button className="opensea-button cta-button">
          <a href={OPENSEA_LINK}>
            OpenSeaでコレクションを見る
          </a>
        </button>
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
