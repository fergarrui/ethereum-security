pragma solidity ^0.4.23;

contract ExtCodeSize {

    // This contract would be 'hacked' if the address saved here is a contract address
    address public thisIsNotAContract;

    function aContractCannotCallThis() public {
        uint codeSize;
        assembly { codeSize := extcodesize(caller) }
        // If extcodesize returns 0, it means the caller's code length is 0, so, it is not a contract...
        // or maybe not
        require(codeSize == 0);
        thisIsNotAContract = msg.sender;
    }
}
