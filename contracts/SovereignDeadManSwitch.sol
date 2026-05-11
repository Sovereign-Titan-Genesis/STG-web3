// SPDX-License-Identifier: MIT
// Project: Sovereign Titan Genesis (STG)
// Function: Quantum Dead-Man's Switch (The Arsitek's Legacy Protocol)

pragma solidity ^0.8.22;

import "@openzeppelin/contracts/access/Ownable.sol";

contract SovereignDeadManSwitch is Ownable {
    
    uint256 public lastHeartbeat;
    uint256 public constant TIMEOUT = 30 days;
    
    address[] public topGuardians;
    bool public switchTriggered = false;

    event HeartbeatReceived(uint256 timestamp);
    event QDMSActivated(uint256 activationTime, address[] beneficiaries);

    constructor(address[] memory _initialGuardians) Ownable(msg.sender) {
        require(_initialGuardians.length == 5, "Error: Must designate exactly 5 Guardians.");
        topGuardians = _initialGuardians;
        lastHeartbeat = block.timestamp;
    }

    /**
     * @dev The Arsitek's Pulse. 
     * This must be called (via H2K hardware) at least once every 30 days.
     */
    function pulse() public onlyOwner {
        require(!switchTriggered, "Error: Switch already triggered.");
        lastHeartbeat = block.timestamp;
        emit HeartbeatReceived(lastHeartbeat);
    }

    /**
     * @dev Check if the Giant has stopped breathing.
     * Can be called by any of the 5 Guardians if 30 days have passed.
     */
    function triggerSwitch() public {
        require(block.timestamp > lastHeartbeat + TIMEOUT, "Error: Arsitek is still active.");
        require(!switchTriggered, "Error: Already triggered.");
        
        bool isGuardian = false;
        for(uint i=0; i < topGuardians.length; i++) {
            if(topGuardians[i] == msg.sender) isGuardian = true;
        }
        require(isGuardian, "Access Denied: Only a designated Guardian can trigger.");

        switchTriggered = true;
        emit QDMSActivated(block.timestamp, topGuardians);
        
        // LOGIC: At this point, the contract unlocks the Unit 008 Master Keys
        // to the topGuardians' multisig wallet.
    }

    function getRemainingTime() public view returns (uint256) {
        if (block.timestamp >= lastHeartbeat + TIMEOUT) return 0;
        return (lastHeartbeat + TIMEOUT) - block.timestamp;
    }
}
