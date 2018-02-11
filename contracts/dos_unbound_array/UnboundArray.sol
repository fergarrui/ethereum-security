pragma solidity ^0.4.0;

contract UnboundArray {

    uint[] arr;

    function push(uint _number) public {
        for (uint i = 0; i < _number; i++) {
            arr.push(i);
        }
    }

    function sum() public view returns (uint) {
        uint s = 0;
        for(uint i = 0; i < arr.length; i++) {
            s+=arr[i];
        }
        return s;
    }
}
