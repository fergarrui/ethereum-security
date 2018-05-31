pragma solidity ^0.4.23;

import "./Reentrancy.sol";

contract ReentrancyVulnerable is Reentrancy {

    mapping(address => uint) balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdrawAll() public {
        uint amount = balances[msg.sender];
        require(amount > 0);
        msg.sender.call.value(balances[msg.sender])();
        balances[msg.sender] = 0;
    }

    function checkBalance() public view returns (uint) {
        return balances[msg.sender];
    }

    function getContractBalance() public view returns (uint) {
        return this.balance;
    }
}
