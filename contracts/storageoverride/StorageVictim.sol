pragma solidity ^0.4.0;

// Useless contract with not much sense, just to demonstrate the override
contract StorageVictim {

    address owner;

    struct Storage {
        address user;
        uint amount;
    }

    mapping(address => Storage) storages;

    function StorageVictim() public {
        owner = msg.sender;
    }

    function store(uint _amount) public {
        // uninitialised pointer. str.user points to the storage address 0 which is "owner"
        Storage str;
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
