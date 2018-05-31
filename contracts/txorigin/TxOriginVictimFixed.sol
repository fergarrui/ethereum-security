pragma solidity ^0.4.23;

contract TxOriginVictimFixed {

    address owner;

    function TxOriginVictimFixed() public {
        owner = msg.sender;
    }

    function transferTo(address _to, uint amount) public {
        // only owner can transfer (hehe)
        require(msg.sender == owner);
        _to.transfer(amount);
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function() public payable {
    // just to allow deposits
    }
}
