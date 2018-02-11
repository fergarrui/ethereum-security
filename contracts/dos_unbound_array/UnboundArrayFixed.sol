pragma solidity ^0.4.0;

contract UnboundArrayFixed {

    uint[] arr;

    function push(uint _number) public {
        for (uint i = 0; i < _number; i++) {
            arr.push(i);
        }
    }

    // To fix the issue, we can never loop over an unbounded array.
    // Kind of a pagination, so the frontend can do the logic
    function sum(uint _start, uint _size) public view returns (uint) {
        uint s = 0;
        for(uint i = _start; i < _start + _size && i < arr.length; i++) {
            s+=arr[i];
        }
        return s;
    }
}
