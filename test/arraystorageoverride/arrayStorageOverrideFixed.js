var BigNumber = require('bignumber.js');
var ArrayStorageOverride = artifacts.require("./ArrayStorageOverrideFixed.sol");

contract("Array storage override test", (accounts) => {

    it("Test override", async () => {

        var victim = await ArrayStorageOverride.new();

        var isHacked = await victim.isHacked.call();
        assert.isFalse(isHacked);
        var size = await victim.size.call();
        assert.equal(0, size);

        var maxNumber = new BigNumber(2).pow(256).minus(1);
        var arrayDataPointer = web3.sha3("0x0000000000000000000000000000000000000000000000000000000000000001", {encoding: 'hex'});
        var arrayDataPointerNumber = new BigNumber(arrayDataPointer)
        var offset = maxNumber.minus(arrayDataPointerNumber).plus(1);
        try {
            // we cannot pop if the size is not 0
            await victim.pop();
            assert(false);
        } catch (error) {
            assert.include(error.message, "revert");
        }
        var size = await victim.size.call();
        assert.equal(0, size);
        var isHacked = await victim.isHacked.call();
        assert.isFalse(isHacked);
        try {
            // now, since the size is 0, we cannot insert at an arbitrary index, so this will also fail
            await victim.insert("0x" + offset.toString(16), 0x1);
            assert(false);
        } catch (error) {
            assert.include(error.message, "revert");
        }
        var isHacked = await victim.isHacked.call();
        // No luck this time
        assert.isFalse(isHacked);
    });
});
