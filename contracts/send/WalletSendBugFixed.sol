pragma solidity ^0.4.0;

contract WalletSendBugFixed {

    address owner;
    mapping(address=> uint) balances;
    uint totalSupply;

    function WalletSendBug() public {
        owner = msg.sender;
        totalSupply = 0;
    }

    function deposit() public payable {
        require(msg.value > 0);
        // we ignore overflows/underflows for this example
        balances[msg.sender] += msg.value;
        totalSupply += msg.value;
        assert(this.balance == totalSupply);
    }

    function withdraw(uint _amount) public {
        assert(this.balance == totalSupply);
        require(balances[msg.sender] >= _amount);
        // we ignore overflows/underflows for this example
        balances[msg.sender] -= _amount;
        totalSupply -= _amount;
        msg.sender.transfer(_amount);
    }

    function balanceOf(address _address) public view returns(uint) {
        return balances[_address];
    }

    function getTotalSupply() public view returns(uint) {
        return totalSupply;
    }
}
