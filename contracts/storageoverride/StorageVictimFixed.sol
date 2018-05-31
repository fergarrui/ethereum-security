pragma solidity ^0.4.23;

contract StorageVictimFixed {

    address owner;

    struct Storage {
        address user;
        uint amount;
    }

    mapping(address => Storage) storages;

    function StorageVictimFixed() public {
        owner = msg.sender;
    }

    function store(uint _amount) public {
        // FIXED
        Storage memory str;
        str.user = msg.sender;
        str.amount = _amount;
        storages[msg.sender] = str;
    }

    function getStore() public view returns (address, uint) {
        Storage str = storages[msg.sender];
        return (str.user, str.amount);
    }

    function getOwner() public view returns (address) {
        return owner;
    }
}
