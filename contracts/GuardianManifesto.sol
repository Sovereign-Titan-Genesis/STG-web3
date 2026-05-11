// SPDX-License-Identifier: MIT
// Project: Sovereign Titan Genesis (STG)
// Function: The Guardian's Oath (On-Chain Manifesto)

pragma solidity ^0.8.22;

import "@openzeppelin/contracts/access/Ownable.sol";

contract GuardianManifesto is Ownable {
    
    // The Sacred Text of the Manifesto
    string public constant MANIFESTO_TEXT = 
        "I, a Guardian of the STG-Chain, do solemnly swear by my pulse and my code: "
        "To protect the Nusantara-Root from all threats, foreign or domestic. "
        "To uphold the transparency of Unit 008 and the kedaulatan of the 100K Quadrillion. "
        "I am the shield of Unit 012. I am the Sentinel. VIVA AUTHENTIC.";

    mapping(address => bool) public hasSigned;
    mapping(address => uint256) public signatureTimestamp;
    uint256 public totalSignatories;

    event ManifestoSigned(address indexed guardian, uint256 timestamp);

    constructor() Ownable(msg.sender) {}

    /**
     * @dev The Signing Ceremony. 
     * Requires the Guardian to call this function to gain access.
     */
    function signManifesto() public {
        require(!hasSigned[msg.sender], "Error: You have already sworn the oath.");
        
        hasSigned[msg.sender] = true;
        signatureTimestamp[msg.sender] = block.timestamp;
        totalSignatories++;

        emit ManifestoSigned(msg.sender, block.timestamp);
    }

    function verifyGuardian(address _guardian) public view returns (bool) {
        return hasSigned[_guardian];
    }
}
