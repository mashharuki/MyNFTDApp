# MyNFTDApp
ジェネレティブNFTをmintするDApp用のプロジェクトリポジトリです。

### base64 encoder/decoder
 <a href="https://www.utilities-online.info/base64">https://www.utilities-online.info/base64</a>

### このプロジェクトで利用するNFTのサンプルメタデータ

```json
{
  "name": "EpicNftCreator",
  "description": "The highly acclaimed square collection",
  "image": "data:image/svg+xml;base64,PHN2ZwogIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWluWU1pbiBtZWV0IgogIHZpZXdCb3g9IjAgMCAzNTAgMzUwIgo+CiAgPHN0eWxlPgogICAgLmJhc2UgewogICAgICBmaWxsOiB3aGl0ZTsKICAgICAgZm9udC1mYW1pbHk6IHNlcmlmOwogICAgICBmb250LXNpemU6IDE0cHg7CiAgICB9CiAgPC9zdHlsZT4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJibGFjayIgLz4KICA8dGV4dAogICAgeD0iNTAlIgogICAgeT0iNTAlIgogICAgY2xhc3M9ImJhc2UiCiAgICBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIgogICAgdGV4dC1hbmNob3I9Im1pZGRsZSIKICA+CiAgICBFcGljTmZ0Q3JlYXRvcgogIDwvdGV4dD4KPC9zdmc+"
}
```

### コントラクトを検証する時の方法
 `npx hardhat verify YOUR_CONTRACT_ADDRESS --network rinkeby`

```cmd
Contract deployed to: 0x5Dc8B0d2783F5Bd331C61777b4Ca8e59a650f922
MashNFTContract deployed to: 0x336709CAbCB19362Bf9374aE4811FF934E9626B6
```

検証結果の例

```cmd
Successfully submitted source code for contract
contracts/MyEpicNFT.sol:MyEpicNFT at 0x5Dc8B0d2783F5Bd331C61777b4Ca8e59a650f922
for verification on the block explorer. Waiting for verification result...

Successfully verified contract MyEpicNFT on Etherscan.
https://rinkeby.etherscan.io/address/0x5Dc8B0d2783F5Bd331C61777b4Ca8e59a650f922#code
```