var TxOriginVictimFixed = artifacts.require("./TxOriginVictimFixed.sol");
var TxOriginAttacker = artifacts.require("./TxOriginAttacker.sol");

contract("TxOriginVictim Fixed", (accounts) => {

    var victim;
    var attacker;

    it("Test tx.origin fixed", () => {
        return TxOriginVictimFixed.deployed().then(instanceVictim => {
            victim = instanceVictim;
            return victim.address;
        }).then(victimAddress => {
            return TxOriginAttacker.new(victimAddress, accounts[1]);
        }).then(attackerInstance => {
            attacker = attackerInstance;
            return web3.eth.getBalance(victim.address);
        }).then((victimBalance) => {
            assert.equal(0, victimBalance);
            return attacker.getOwner.call();
        }).then(attackerOwner => {
            assert.equal(accounts[1], attackerOwner);
            return victim.getOwner.call();
        }).then(victimOwner => {
            assert.equal(accounts[0], victimOwner);
            // deposit ether into victim contract from accounts[0]
            web3.eth.sendTransaction({
                from: accounts[0],
                to: victim.address,
                value: 5
            });
        }).then(() => {
            return web3.eth.getBalance(victim.address);
        }).then(victimBalance => {
            assert.equal(5, victimBalance);
            // this should not work, since accounts[1] is not the owner
            return victim.transferTo(accounts[1], victimBalance, {from: accounts[1]});
        }).then(() => {
            assert(false, "It should revert");
        }).catch((error) => {
            assert(true);
            return web3.eth.getBalance(victim.address);
        }).then(victimBalance => {
            assert.equal(5, victimBalance);
            // this transfer will revert with the fixed version of the victim contract
            web3.eth.sendTransaction({
                from: accounts[0],
                to: attacker.address,
                value: 1
            });
        }).then(() => {
            assert(false, "Should revert, checking msg.sender and not tx.origin");
        }).catch((error) => {
            return web3.eth.getBalance(victim.address);
        }).then(victimBalance => {
            // we check that the victim contract balance is 5 and it is not vulnerable now
            assert.equal(5, victimBalance);
        });
    });
});
