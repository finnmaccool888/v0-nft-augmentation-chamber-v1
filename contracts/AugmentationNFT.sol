// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract AugmentationNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    // Mapping from augmentation token ID to original NFT contract and token ID
    mapping(uint256 => OriginalNFT) public originalNFTs;
    
    // Mapping from original NFT to augmentation token IDs
    mapping(address => mapping(uint256 => uint256[])) public augmentations;
    
    // Augmentation types
    enum AugmentationType { CYBER, ARMOR, MAGIC }
    
    // Rarity levels
    enum RarityLevel { COMMON, UNCOMMON, RARE, EPIC, LEGENDARY }
    
    // Struct to store original NFT information
    struct OriginalNFT {
        address contractAddress;
        uint256 tokenId;
    }
    
    // Struct to store augmentation details
    struct AugmentationDetails {
        AugmentationType augType;
        RarityLevel rarity;
        uint8 processingBoost;
        uint8 powerBoost;
        uint8 defenseBoost;
        string name;
    }
    
    // Mapping from token ID to augmentation details
    mapping(uint256 => AugmentationDetails) public augmentationDetails;
    
    // Events
    event AugmentationMinted(
        uint256 indexed augmentationId, 
        address indexed originalContract, 
        uint256 indexed originalTokenId,
        AugmentationType augType,
        RarityLevel rarity
    );
    
    // Constructor
    constructor() ERC721("0N1 Force Augmentation", "0N1AUG") Ownable(msg.sender) {}
    
    // Mint a new augmentation NFT
    function mintAugmentation(
        address originalContract,
        uint256 originalTokenId,
        string memory tokenURI,
        AugmentationType augType,
        RarityLevel rarity,
        uint8 processingBoost,
        uint8 powerBoost,
        uint8 defenseBoost,
        string memory name
    ) public returns (uint256) {
        // Verify the caller owns the original NFT
        require(
            IERC721(originalContract).ownerOf(originalTokenId) == msg.sender,
            "You must own the original NFT"
        );
        
        // Increment token ID
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        
        // Mint the new token
        _mint(msg.sender, newItemId);
        
        // Set token URI
        _setTokenURI(newItemId, tokenURI);
        
        // Store original NFT information
        originalNFTs[newItemId] = OriginalNFT({
            contractAddress: originalContract,
            tokenId: originalTokenId
        });
        
        // Store augmentation details
        augmentationDetails[newItemId] = AugmentationDetails({
            augType: augType,
            rarity: rarity,
            processingBoost: processingBoost,
            powerBoost: powerBoost,
            defenseBoost: defenseBoost,
            name: name
        });
        
        // Add to augmentations list
        augmentations[originalContract][originalTokenId].push(newItemId);
        
        // Emit event
        emit AugmentationMinted(
            newItemId, 
            originalContract, 
            originalTokenId, 
            augType, 
            rarity
        );
        
        return newItemId;
    }
    
    // Get all augmentations for an original NFT
    function getAugmentations(address originalContract, uint256 originalTokenId) 
        public 
        view 
        returns (uint256[] memory) 
    {
        return augmentations[originalContract][originalTokenId];
    }
    
    // Get augmentation details
    function getAugmentationDetails(uint256 tokenId) 
        public 
        view 
        returns (
            AugmentationType augType,
            RarityLevel rarity,
            uint8 processingBoost,
            uint8 powerBoost,
            uint8 defenseBoost,
            string memory name
        ) 
    {
        AugmentationDetails memory details = augmentationDetails[tokenId];
        return (
            details.augType,
            details.rarity,
            details.processingBoost,
            details.powerBoost,
            details.defenseBoost,
            details.name
        );
    }
    
    // Override transfer function to check if original NFT is still owned
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override returns (address) {
        OriginalNFT memory originalNFT = originalNFTs[tokenId];
        
        // If this is a transfer (not a mint or burn), check original NFT ownership
        if (auth != address(0) && to != address(0)) {
            require(
                IERC721(originalNFT.contractAddress).ownerOf(originalNFT.tokenId) == auth,
                "You must own the original NFT to transfer the augmentation"
            );
        }
        
        return super._update(to, tokenId, auth);
    }
}
