var UnboundArray = artifacts.require("./UnboundArray.sol");

contract("Unbound array test", (accounts) => {

    var victim;

    it("Test unbound array", () => {
        return UnboundArray.deployed().then(instance => {
            victim = instance;
        }).then(() => {
            return victim.push(100);
        }).then(() => {
            // Empirically I saw that to run sum() with 100 elements in the array,
            // it uses 98427 gas. So from now on, let's simulate the max gas per block is 98427
            // when running sum() to make things simpler
            return victim.sum({gas: 98427});
        }).then(sum => {
            // the sum from 1 to 99 is 4950
            assert.equal(4950, sum);
            // we push one more item into the array
            return victim.push(1);
        }).then(() => {
            return victim.sum({gas: 98427});
        }).then(() => {
            assert(false, "It should not reach this block because of out of gas");
        }).catch(error => {
            // sum() needs to do an additional iteration, so we reach the gas limit and fail
            assert(true, "Error thrown, we were expecting an out of gas error");
        });
    });
});
