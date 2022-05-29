const main = async () => {
    // コントラクトがコンパイルしますs
    const nftContractFactory = await hre.ethers.getContractFactory("MyEpicNFT");
    // Hardhat がローカルの Ethereum ネットワークを作成します。
    const nftContract = await nftContractFactory.deploy();
    await nftContract.deployed();
    console.log("Contract deployed to:", nftContract.address);

    // mint NFT
    let txn = await nftContract.makeAnEpicNFT();
    await txn.wait();
    // mint again!!
    txn = await nftContract.makeAnEpicNFT();
    await txn.wait();
    
};
        
// エラー処理を行っています。
const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
        
runMain();