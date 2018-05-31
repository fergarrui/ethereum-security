pragma solidity ^0.4.23;

import "./ExtCodeSize.sol";

contract ExtCodeSizeAttacker {

    // When ExtCodeSize does extcodesize, since we are calling the function from the constructor, it will return 0
    // even if this is a contract...
    constructor(address _victim) {
        ExtCodeSize victim = ExtCodeSize(_victim);
        victim.aContractCannotCallThis();
    }
}
