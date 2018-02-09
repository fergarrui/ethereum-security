var AuctionFixed = artifacts.require("./AuctionFixed.sol");
var AuctionAttacker = artifacts.require("./AuctionAttacker.sol");

contract("Auction DOS Fixed", (accounts) => {

    var auction;
    var attacker;

    it("Test Auction DOS Fixed", () => {

        return AuctionFixed.deployed().then(instance => {
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
            return auction.getRefund(accounts[0]);
        }).then(refunds => {
            assert.equal(1, refunds)
            return auction.getRefund(accounts[1]);
        }).then(refunds => {
            assert.equal(0, refunds)
            // attacker contract bids 3
            attacker.bidAuction({value : 3});
        }).then(() => {
            return auction.getCurrentLeader.call();
        }).then(currentLeader => {
            assert(attacker.address, currentLeader)
            return auction.getHighestBid.call();
        }).then((highestBid) => {
            assert(3, highestBid);
            return auction.getRefund(accounts[1]);
        }).then(refunds => {
            assert(2, refunds);
            // acounts[2] bids 4
            return auction.bid({value:4, from: accounts[2]});
        }).then(() => {
            return auction.getCurrentLeader.call();
        }).then((currentLeader) => {
            // now accounts[2] is the leader, so the attacker contract
            // is not stuck forever
            assert.equal(accounts[2], currentLeader);
            return auction.getRefund(attacker.address);
        }).then((refunds => {
            assert.equal(3, refunds);
        }));
    });
});
