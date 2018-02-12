var WalletSendBugFixed = artifacts.require("./WalletSendBugFixed.sol");
var WalletSendAttacker = artifacts.require("./WalletSendAttacker.sol");

contract("WalletSendBug", (accounts) => {

    var wallet;
    var attacker;

    it("Unchecked send()", () => {
        return WalletSendBugFixed.deployed().then(instance => {
            wallet = instance;
            return instance.address;
        }).then((address) => {
            return WalletSendAttacker.new(address);
        }).then(attackerInstance => {
            attacker = attackerInstance;
            return wallet.deposit({value: 50});
        }).then(() => {
            return wallet.balanceOf(accounts[0]);
        }).then(balance0 => {
            assert.equal(50, balance0);
            return wallet.withdraw(25);
        }).then(() => {
            return wallet.balanceOf(accounts[0]);
        }).then(balance0 => {
            // checking than deposit & withdraw work as expected
            assert.equal(25, balance0);
            return attacker.deposit({value: 100});
        }).then(() => {
            return wallet.balanceOf(attacker.address);
        }).then(attackerBalance => {
            assert.equal(100, attackerBalance);
            // The bug does not happen now
            return attacker.withdraw(50);
        }).catch(error => {
            assert(true, "Attacker does not accept ether, so this fails");
        }).then(() => {
            return wallet.balanceOf(attacker.address);
        }).then(attackerBalance => {
            assert.equal(100, attackerBalance);
            return web3.eth.getBalance(wallet.address);
        }).then(walletBalance => {
            assert.equal(125, walletBalance);
            return wallet.getTotalSupply.call();
        }).then(walletTotalSupply => {
            // the invariant is fine now
            assert.equal(125, walletTotalSupply);
            // We check that withdrawals work
            return wallet.withdraw(1);
        }).then(() => {
            return wallet.balanceOf(accounts[0]);
        }).then(balance0 => {
            assert.equal(24, balance0);
        });
    });
});
