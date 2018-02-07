pragma solidity ^0.4.0;

contract WalletLibrary {

    address owner;

    event InitWallet(address addr);

    function initWallet(address _owner) {
        InitWallet(_owner);
        owner = _owner;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function deposit() public payable {
    }

    function withdraw(uint _amount) public returns (bool success) {
        require(msg.sender == owner);
        return owner.send(_amount);
    }
}
