pragma solidity ^0.4.23;

contract ArrayStorageOverride {

    bool public isHacked;
    uint[] public array;

    function push(uint _value) public {
        array.push(_value);
    }

    function pop() public {
        array.length--;
    }

    function insert(uint _key, uint _value) public {
        require(_key < array.length);
        array[_key] = _value;
    }

    function size() public view returns (uint) {
        return array.length;
    }
}
