pragma solidity ^0.4.23;

contract Auction {

    address currentLeader;
    uint highestBid;

    function bid() public payable {
        require(msg.value > highestBid);
        currentLeader.transfer(highestBid);

        currentLeader = msg.sender;
        highestBid = msg.value;
    }

    function getCurrentLeader() public view returns (address) {
        return currentLeader;
    }

    function getHighestBid() public view returns (uint) {
        return highestBid;
    }
}
