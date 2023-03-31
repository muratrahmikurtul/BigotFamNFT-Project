//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "erc721a/contracts/ERC721A.sol";

contract BigotFamNFT is ERC721A, Ownable, ERC2981 {
    uint256 public cost = 3300000000000000; // 0.0033 eth
    uint256 public maxSupply = 3333;
    uint256 public perWalletMaxAmount = 5;

    string public baseURI = "";

    bool public publicSaleIsActive;
    bool public preSaleIsActive;
    bool public isRevealed;

    bytes32 public root;

    mapping(address => uint256) private amount;

    constructor(
    ) ERC721A("BigotFamNFT", "BGF") {
        _setDefaultRoyalty(address(this), 750); // 7.5% royalties
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory _newBaseURI) external onlyOwner {
        baseURI = (_newBaseURI);
    }

    function setCost(uint256 _cost) external onlyOwner {
        cost = (_cost);
    }

    function _startTokenId() internal view virtual override returns (uint256) {
        return 1;
    }

    function setRoyalties(address recipient, uint96 value) external onlyOwner {
        require(recipient == address(0), "Invalid address");

        _setDefaultRoyalty(recipient, value);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC2981, ERC721A) returns (bool) {
        return ERC721A.supportsInterface(interfaceId) || ERC2981.supportsInterface(interfaceId);
    }

    function mint(uint256 _amount) external payable {
        require(publicSaleIsActive, "Public sale is not active");
        uint256 supply = totalSupply();
        require(_amount > 0, "Total number of mints cannot be 0");
        require(_amount <= 5, "Total number of mints cannot exceed 5");
        require(amount[msg.sender] + _amount <= perWalletMaxAmount,"You can only mint 5 in total");
        require(supply + _amount <= maxSupply, "Purchase would exceed max supply of Tokens");

        //Check msg.value
        require(cost * _amount <= msg.value, "Ether value sent is not correct");

        amount[msg.sender] += _amount;
        _safeMint(msg.sender, _amount);
    }

    function mintedNFTNumber(address addr) external view returns (uint256){
        return amount[addr];
    }

    function withdraw() public payable onlyOwner {
        (bool os, ) = payable(owner()).call{ value: address(this).balance }("");
        require(os);
    }

    function reveal() public onlyOwner {
        isRevealed = true;
    }

    function togglePublicSale() external onlyOwner {
        publicSaleIsActive = !publicSaleIsActive;
    }

    function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory){
        require(_exists(tokenId),"ERC721Metadata: URI query for nonexistent token");
        string memory currentBaseURI = _baseURI();

        if(isRevealed == false){
            return "ipfs://{QmZGdjFvaoCTdnbT3N2897wUDw1Ms6gJG6N8RbWqgGp8bD}/hidden.json";
        }

        return
        bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, Strings.toString(tokenId), ".json"))
        : "";
    }
}
