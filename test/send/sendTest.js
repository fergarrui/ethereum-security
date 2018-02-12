var WalletSendBug = artifacts.require("./WalletSendBug.sol");
var WalletSendAttacker = artifacts.require("./WalletSendAttacker.sol");

contract("WalletSendBug", (accounts) => {

    var wallet;
    var attacker;

    it("Unchecked send()", () => {
        return WalletSendBug.deployed().then(instance => {
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
            // Here the bug happens. Attacker withdraws, the victim tries to send ether, but it does not accept it.
            // Since the attacker does not check the output of send(), it removes the funds from the balances and totalSupply
            // variables, but the contract still has the amount in its balance, breaking the invariant.
            return attacker.withdraw(50);
        }).catch(error => {
            assert(true, "A revert is executed in the attacker fallback function");
        }).then(() => {
            return wallet.balanceOf(attacker.address);
        }).then(attackerBalance => {
            assert.equal(50, attackerBalance);
            return web3.eth.getBalance(wallet.address);
        }).then(walletBalance => {
            // Checking that the balance of the contract was untouched even if attacker tried to withdraw
            assert.equal(125, walletBalance);
            return wallet.getTotalSupply.call();
        }).then(walletTotalSupply => {
            // checking that the invariant is now broken
            assert.equal(75, walletTotalSupply);
            // We check that now noone can withdraw from the wallet because the invariant is violated
            return wallet.withdraw(1);
        }).then(() => {
            assert(false, "This block should not be run");
        }).catch(error => {
            assert(true, "assert() kicks in");
        }).then(() => {
            return wallet.balanceOf(accounts[0]);
        }).then(balance0 => {
            // we check again that the balance of account[0] did not change because it is not possible to withdraw
            assert.equal(25, balance0);
        });
    });
});
