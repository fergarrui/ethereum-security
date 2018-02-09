pragma solidity ^0.4.0;

//
//  A fix is not provided for this contract.
//  A contract balance cannot be guaranteed to be zero
//  even if we perform revert in the fallback function
//
contract ForceEtherVictim {

    address owner;

    function ForceEtherVictim() public {
        owner = msg.sender;
    }

    function changeOwner() public {
        require(this.balance > 0);
        // this should never be reached, because we cannot (HEH) deposit any ether here
        // NEVER trust in the invariant this.balance == 0
        owner = msg.sender;
    }

    // blocks any payment done to this contract (or tries it)
    function() public payable {
        revert();
    }

    function getOwner() public view returns(address) {
        return owner;
    }
}
