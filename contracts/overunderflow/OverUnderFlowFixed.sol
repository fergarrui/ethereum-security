pragma solidity ^0.4.0;

import "./SafeMath.sol";

contract OverUnderFlowFixed {

    using SafeMath for uint;

    uint public zero = 0;
    uint public max = 2**256-1;

    function overflow() public {
        max = max.add(1);
    }

    function underflow() public {
        zero = zero.sub(1);
    }

    function getZero() public view returns (uint) {
        return zero;
    }

    function getMax() public view returns (uint) {
        return max;
    }
}
