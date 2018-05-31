pragma solidity ^0.4.23;

contract ExtCodeSizeFixed {

    // This contract would be 'hacked' if the address saved here is a contract address
    address public thisIsNotAContract;

    function aContractCannotCallThis() public {
        // a way to check that a contract is not calling this method without relying in extcodesize
        require(msg.sender == tx.origin);
        thisIsNotAContract = msg.sender;
    }
}
