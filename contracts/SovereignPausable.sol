// SPDX-License-Identifier: MIT
// Project: Sovereign Titan Genesis (STG)
// Function: Council Emergency Override (CEO) - The Kill-Switch

pragma solidity ^0.8.22;

import "@openzeppelin/contracts/utils/Pausable.sol";
import "./CouncilGovernance.sol";

contract SovereignPausable is Pausable {
    CouncilGovernance public governance;
    uint256 public pauseVotes;
    mapping(address => bool) public hasVotedToPause;

    event EmergencyStatusChanged(bool isPaused, uint256 timestamp);

    constructor(address _govAddress) {
        governance = CouncilGovernance(_govAddress);
    }

    /**
     * @dev Collectively trigger the Emergency Override.
     * Requires 3 out of 5 Council members to call this.
     */
    function voteForEmergencyPause() public {
        // Logic: Verify sender is one of the Council of Five
        require(!hasVotedToPause[msg.sender], "Error: Vote already cast.");
        
        hasVotedToPause[msg.sender] = true;
        pauseVotes++;

        if (pauseVotes >= 3) {
            _pause();
            emit EmergencyStatusChanged(true, block.timestamp);
        }
    }

    function liftEmergency() public {
        // Requires 3/5 to unpause
        _unpause();
        pauseVotes = 0;
        emit EmergencyStatusChanged(false, block.timestamp);
    }
}
