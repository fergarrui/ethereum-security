pragma solidity ^0.4.23;

contract AuctionFixed {

    address currentLeader;
    uint highestBid;
    mapping(address => uint) refunds;

    function bid() public payable {
        require(msg.value > highestBid);
        // there can be an overflow but it is not the point of this contract
        // having a withdraw pattern instead of just transferring fixes the issue
        refunds[currentLeader] += highestBid;
        currentLeader = msg.sender;
        highestBid = msg.value;
    }

    function withdraw() public {
        uint refund = refunds[msg.sender];
        require(refund > 0);
        refunds[msg.sender] = 0;
        msg.sender.transfer(refund);
    }

    function getCurrentLeader() public view returns (address) {
        return currentLeader;
    }

    function getHighestBid() public view returns (uint) {
        return highestBid;
    }

    function getRefund(address _bidder) public view returns (uint) {
        return refunds[_bidder];
    }
}
