var BigNumber = require('bignumber.js');
var OverUnderFlowFixed = artifacts.require("./OverUnderFlowFixed.sol");

contract("OverUnderFlowFixed", function (accounts) {

var maxNumber = new BigNumber(2).pow(256).minus(1);
var zeroNumber = new BigNumber(0);
var inst;

    it("Test overflow", function() {
        return OverUnderFlowFixed.deployed().then(instance => {
            inst = instance;
            return instance.getMax.call();
        }).then((max) => {
            // checking that 'max' variable in the contract is actually 2^256-1
            assert.isTrue(max.equals(maxNumber));
        }).then(() => {
            // we call overflow, which increments 'max' and should causes an overflow but throws a VM exception
            return inst.overflow({gasPrice:0});
        }).then(() => {
            // will not run this
            assert(false, "Should throw an exception");
        }).catch(error => {
            assert(true, "Exception thrown");
            return inst.getMax.call();
        }).then((max) => {
            // we check that overflow didn't happen
            assert.isTrue(max.equals(maxNumber));
        });
    });

    it("Test underflow", function() {
        return OverUnderFlowFixed.deployed().then(instance => {
            inst = instance;
            return instance.getZero.call();
        }).then((zero) => {
            // checking that 'zero' variable in the contract is actually 0
            assert.isTrue(zero.equals(zeroNumber));
        }).then(() => {
            // we call underflow, which increments 'zero' and should causes an underflow but throws a VM exception
            return inst.underflow({gasPrice:0});
        }).then(() => {
            // will not run this
            assert(false, "Should throw an exception");
        }).catch(error => {
            assert(true, "Exception thrown");
            return inst.getZero.call();
        }).then((zero) => {
            // we check that underflow didn't happen
            assert.isTrue(zero.equals(zeroNumber));
        });
    });
});
