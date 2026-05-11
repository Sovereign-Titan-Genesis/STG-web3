// SPDX-License-Identifier: MIT
// Project: Sovereign Titan Genesis (STG)
// Function: Council of Five - 100 Day Loyalty Vesting

pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CouncilVesting is Ownable {
    IERC20 public aksaToken;
    
    uint256 public constant SERVICE_PERIOD = 100 days;
    uint256 public constant REWARD_PER_MEMBER = 500_000_000 * 10**18; // 500M AKSA

    struct CouncilMember {
        bool isActive;
        uint256 appointmentDate;
        uint256 releasedAmount;
        bool hasClaimed;
    }

    mapping(address => CouncilMember) public council;
    address[] public members;

    event CouncilAppointed(address indexed member, uint256 timestamp);
    event RewardClaimed(address indexed member, uint256 amount);

    constructor(address _aksaToken) Ownable(msg.sender) {
        aksaToken = IERC20(_aksaToken);
    }

    /**
     * @dev Appoint a winner of the Trial of the Five Sovereigns.
     */
    function appointCouncil(address _member) public onlyOwner {
        require(members.length < 5, "Error: Council of Five is already full.");
        require(!council[_member].isActive, "Error: Member already appointed.");

        council[_member] = CouncilMember({
            isActive: true,
            appointmentDate: block.timestamp,
            releasedAmount: 0,
            hasClaimed: false
        });
        
        members.push(_member);
        emit CouncilAppointed(_member, block.timestamp);
    }

    /**
     * @dev Claim rewards after 100 days of service.
     */
    function claimCouncilReward() public {
        CouncilMember storage member = council[msg.sender];
        
        require(member.isActive, "Access Denied: Not a Council Member.");
        require(block.timestamp >= member.appointmentDate + SERVICE_PERIOD, "Error: Service period not yet completed (100 days required).");
        require(!member.hasClaimed, "Error: Reward already claimed.");

        member.hasClaimed = true;
        member.releasedAmount = REWARD_PER_MEMBER;
        
        bool success = aksaToken.transfer(msg.sender, REWARD_PER_MEMBER);
        require(success, "Transfer Failed: Check Vault Liquidity.");

        emit RewardClaimed(msg.sender, REWARD_PER_MEMBER);
    }

    function getDaysServed(address _member) public view returns (uint256) {
        if (!council[_member].isActive) return 0;
        return (block.timestamp - council[_member].appointmentDate) / 1 days;
    }
}
