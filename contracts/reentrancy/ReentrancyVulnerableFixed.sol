pragma solidity ^0.4.23;

import "./Reentrancy.sol";

contract ReentrancyVulnerableFixed is Reentrancy {

    mapping(address => uint) balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdrawAll() public {
        uint amount = balances[msg.sender];
        require(amount > 0);
        // This is the only change compared to ReentrancyVulnerable.sol
        balances[msg.sender] = 0;
        msg.sender.call.value(amount)();
    }

    function checkBalance() public view returns (uint) {
        return balances[msg.sender];
    }

    function getContractBalance() public view returns (uint) {
        return this.balance;
    }
}
