var UnboundArrayFixed = artifacts.require("./UnboundArrayFixed.sol");

contract("Unbound array test Fixed", (accounts) => {

    var victim;

    it("Test unbound array Fixed", () => {
        return UnboundArrayFixed.deployed().then(instance => {
            victim = instance;
        }).then(() => {
            return victim.push(100);
        }).then(() => {
            // the gas cost is a bit higher since we added an additional check in the for loop
            // but that's not the important point here
            // We calculate the sum in bulks instead of doing it for the whole
            // unbounded array, that would lead us to an out of gas error at some point
            return victim.sum(0, 100, {gas: 102352});
        }).then(sum => {
            // the sum from 1 to 99 is 4950
            assert.equal(4950, sum);
            // we push two more items more into the array [0, 1]
            return victim.push(2);
        }).then(() => {
            // Checking that obviously we don't run out of gas
            // (redundant assertion but just double checking for better understanding)
            return victim.sum(0, 100, {gas: 102352});
        }).then((sum) => {
            assert.equal(4950, sum);
            // starting now in index 100 instead of 0, so the frontend would take care
            // of doing the calls in a paginated way and compute the partial results
            return victim.sum(100, 100, {gas: 102352});
        }).then(sum => {
            // we pushed [0,1] at the end of the array, so the sum of those is 1
            assert.equal(1, sum);
        });
    });
});
