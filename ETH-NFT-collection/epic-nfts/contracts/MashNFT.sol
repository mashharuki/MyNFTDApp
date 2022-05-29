// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import { Base64 } from "./libraries/Base64.sol";

contract MashNFT is ERC721URIStorage {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string[] baseSvgs = [
        "",
        ""
    ];
    
    constructor() ERC721("MashNFT", "MASH") {
        console.log("This is my MashNFT contract.");
    }

    function makeAnEpicNFT() public {
        uint256 newItemId = _tokenIds.current();
        // choose image        
        string memory image = pickRandomImage(newItemId);
        string memory finalSvg = string(abi.encodePacked(image));

        // convert json data
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        "MashNFT #", newItemId, 
                        '", "description": "Mash is a faithful dog!!"', 
                        '"image": "data:image/svg+xml;base64,',
                        //  add encoded data
                        Base64.encode(bytes(finalSvg)),
                        '"}'
                    )
                )
            )
        );

        string memory finalTokenUri = string(abi.encodePacked("data:application/json;base64,", json));

        console.log("\n--------------------");
        console.log(finalTokenUri);
        console.log("--------------------\n");

        // mint to msg.sender
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, finalTokenUri);

        console.log("An NFT w/ ID %s has been minted to %s", newItemId, msg.sender);
        _tokenIds.increment();
    }

    function random(string memory input) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(input)));
    }

    function pickRandomImage(uint256 tokenId) public view returns (string memory) {
        // generate rand
        uint256 rand = random(string(abi.encodePacked("RAND_Mash", Strings.toString(tokenId))));
        console.log("rand seed: ", rand);

        rand = rand % baseSvgs.length;
        console.log("rand image: ", rand);
        return baseSvgs[rand];
    }
}