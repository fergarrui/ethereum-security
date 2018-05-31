pragma solidity ^0.4.23;

import "./WalletLibrary.sol";

contract Wallet {

    address owner;
    address walletLibrary;

    function Wallet(address _walletLibrary) public {
        walletLibrary = _walletLibrary;
        walletLibrary.delegatecall(bytes4(keccak256("initWallet(address)")), msg.sender);
    }

    function deposit() public payable {
        walletLibrary.delegatecall(bytes4(keccak256("deposit()")));
    }

    function withdraw(uint _amount) public {
        walletLibrary.delegatecall(bytes4(keccak256("withdraw(uint256)")), _amount);
    }

    function () public payable {
        walletLibrary.delegatecall(msg.data);
    }

    function getOwner() public view returns (address) {
        return owner;
    }
}
