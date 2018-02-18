var StorageVictimFixed = artifacts.require("./StorageVictimFixed.sol");

contract("Storage override Fixed", (accounts) => {

    var storage;

    it("Test storage override Fixed" , () => {
        return StorageVictimFixed.deployed().then(instance => {
            storage = instance;
        }).then(() => {
            return storage.getOwner.call();
        }).then(owner => {
            assert.equal(accounts[0], owner);
            return storage.store(5, {from : accounts[1]});
        }).then(() => {
            return storage.getOwner.call();
        }).then(owner => {
            // owner didn't change
            assert.equal(accounts[0], owner);
            return storage.getStore.call({from: accounts[1]});
        }).then((result) => {
            assert.equal(accounts[1], result[0]);
            assert.equal(5, result[1]);
        });
    });
});
