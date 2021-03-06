const main = async () => {
    // コントラクトがコンパイルしますs
    const nftContractFactory = await hre.ethers.getContractFactory("MyEpicNFT");
    // Hardhat がローカルの Ethereum ネットワークを作成します。
    const nftContract = await nftContractFactory.deploy();
    await nftContract.deployed();
    console.log("Contract deployed to:", nftContract.address);

    const mashNftContractFactory = await hre.ethers.getContractFactory("MashNFT");
    const mashNftContract = await mashNftContractFactory.deploy();
    await mashNftContract.deployed();
    console.log("MashNFTContract deployed to:", mashNftContract.address);

    // mint NFT
    let txn = await mashNftContract.makeAnEpicNFT();
    await txn.wait();
    console.log("Minted NFT #1");
    /*
    // mint again!!
    txn = await nftContract.makeAnEpicNFT();
    await txn.wait();
    console.log("Minted NFT #2");
    */
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