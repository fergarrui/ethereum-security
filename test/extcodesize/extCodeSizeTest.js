var ExtCodeSize = artifacts.require("./ExtCodeSize.sol");
var ExtCodeSizeAttacker = artifacts.require("./ExtCodeSizeAttacker.sol");

contract("Extcodesize test", (accounts) => {

    it("Test extcodesize", async () => {

        var victim = await ExtCodeSize.new();
        // We check that the initial address is 0
        var addr = await victim.thisIsNotAContract();
        assert.equal(0x0, addr);
        // just creating an instance of the attacker passing the victim address as an argument will call the method
        // aContractCannotCallThis from the constructor. Because we call it from the constructor, extcodesize
        // will return 0. If we call that method from a normal function it wouldn't
        var attacker = await ExtCodeSizeAttacker.new(victim.address);
        var addr = await victim.thisIsNotAContract();
        assert.equal(attacker.address, addr);

        // just double checking what we already know, obviously, the attacker is a contract and it has code
        // PWND!
        var attackerCode = await web3.eth.getCode(attacker.address);
        assert.isFalse(attackerCode.length == 0);
    });
});
