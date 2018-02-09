var Auction = artifacts.require("./Auction.sol");
var AuctionAttacker = artifacts.require("./AuctionAttacker.sol");

contract("Auction DOS", (accounts) => {

    var auction;
    var attacker;

    it("Test Auction DOS", () => {

        return Auction.deployed().then(instance => {
            auction = instance;
            return auction.address;
        }).then(address => {
            return AuctionAttacker.new(address);
        }).then((instanceAttacker => {
            attacker = instanceAttacker;
            // acounts[0] bids 1
            return auction.bid({value:1, from: accounts[0]});
        })).then(() => {
            return auction.getCurrentLeader.call();
        }).then(currentLeader => {
            assert.equal(accounts[0], currentLeader);
            return auction.getHighestBid.call();
        }).then(highestBid => {
            assert.equal(1, highestBid);
            // acounts[1] bids 2
            return auction.bid({value:2, from: accounts[1]});
        }).then(() => {
            return auction.getCurrentLeader.call();
        }).then(currentLeader => {
            assert.equal(accounts[1], currentLeader);
            return auction.getHighestBid.call();
        }).then(highestBid => {
            assert.equal(2, highestBid);
            // attacker contract bids 3
            attacker.bidAuction({value : 3});
        }).then(() => {
            return auction.getCurrentLeader.call();
        }).then(currentLeader => {
            assert(attacker.address, currentLeader)
            return auction.getHighestBid.call();
        }).then((highestBid) => {
            assert(3, highestBid);
            // acounts[2] bids 4
            return auction.bid({value:4, from: accounts[2]});
        }).then(() => {
            assert(false, "Should not reach this block");
        }).catch((error) => {
            assert(true, "Operation reverted");
            return auction.getCurrentLeader.call();
        }).then((currentLeader) => {
            assert.equal(attacker.address, currentLeader);
        });
    });
});
