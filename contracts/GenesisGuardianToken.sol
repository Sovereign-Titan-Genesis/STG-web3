// SPDX-License-Identifier: MIT
// Project: Sovereign Titan Genesis (STG)
// Pillar: Genesis Reward (The Titan Guardian Badge)

pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GenesisGuardianToken is ERC721, Ownable {
    uint256 private _nextTokenId;

    // Metadata Lencana
    string private _baseTokenURI;

    constructor() ERC721("Titan Guardian Badge", "TGB") Ownable(msg.sender) {
        _baseTokenURI = "https://quorumstate.international";
    }

    /**
     * @dev Minting khusus untuk Titan Guardian di Blok Nomor 1.
     * Hanya bisa dilakukan oleh Arsitek Utama (Capo).
     */
    function awardGuardian(address guardian) public onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(guardian, tokenId);
        return tokenId;
    }

    /**
     * @dev Mekanisme Soulbound: Mencegah transfer token.
     * Lencana ini melekat selamanya pada Jantung (Wallet) sang Guardian.
     */
    function _update(address to, uint256 tokenId, address auth) 
        internal 
        virtual 
        override 
        returns (address) 
    {
        address from = _ownerOf(tokenId);
        // Hanya izinkan minting (from == address(0)) atau burning (to == address(0))
        // Transfer antar dompet (from != 0 && to != 0) akan ditolak.
        if (from != address(0) && to != address(0)) {
            revert("Sovereign Error: Lencana Guardian tidak dapat dipindahtangankan!");
        }
        return super._update(to, tokenId, auth);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }
}
