pragma solidity ^0.4.23;

contract OverUnderFlow {

    uint public zero = 0;
    uint public max = 2**256-1;

    function overflow() public {
        max += 1;
    }

    function underflow() public {
        zero -= 1;
    }

    function getZero() public view returns (uint) {
        return zero;
    }

    function getMax() public view returns (uint) {
        return max;
    }
}
