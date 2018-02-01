var BigNumber = require('bignumber.js');
var OverUnderFlow = artifacts.require("./OverUnderFlow.sol");

contract("OverUnderFlow", function (accounts) {

var maxNumber = new BigNumber(2).pow(256).minus(1);
var zeroNumber = new BigNumber(0);
var inst;

    it("Test overflow", function() {
        return OverUnderFlow.deployed().then(instance => {
            inst = instance;
            return instance.getMax.call();
        }).then((max) => {
            // checking that 'max' variable in the contract is actually 2^256-1
            assert.isTrue(max.equals(maxNumber));
        }).then(() => {
            // we call overflow, which increments 'max' and causes an overflow
            inst.overflow({gasPrice:0});
            return inst.getMax.call();
        }).then((max) => {
            // checking that the overflow happened, and now the value of 'max' is 0
            assert.isTrue(max.equals(zeroNumber));
        });
    });

    it("Test underflow", function() {
        return OverUnderFlow.deployed().then(instance => {
            inst = instance;
            return instance.getZero.call();
        }).then((zero) => {
            // checking that 'zero' variable in the contract is actually 0
            assert.isTrue(zero.equals(zeroNumber));
        }).then(() => {
            // we call underflow, which decrements 'zero' and causes an underflow
            inst.underflow({gasPrice:0});
            return inst.getZero.call();
        }).then((zero) => {
            // checking that the underflow happened, and now the value of 'zero' is 2^256-1
            assert.isTrue(zero.equals(maxNumber));
        });
    });
});
