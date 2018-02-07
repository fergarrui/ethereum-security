var ReentrancyVulnerableFixed = artifacts.require("./ReentrancyVulnerableFixed.sol");
var ReentrancyAttacker = artifacts.require("./ReentrancyAttacker.sol");

contract("ReentrancyVulnerableFixed", (accounts) => {

    var victim;
    var attacker;

    it("Test reentrancy Fixed", () => {
        // deploying the victim contract
        return ReentrancyVulnerableFixed.deployed().then(instanceVictim => {
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
            assert.equal(510, victimBalance);
        });
    });
});
