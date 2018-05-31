var ExtCodeSizeFixed = artifacts.require("./ExtCodeSizeFixed.sol");
var ExtCodeSizeAttacker = artifacts.require("./ExtCodeSizeAttacker.sol");

contract("Extcodesize test", (accounts) => {

    it("Test extcodesize", async () => {

        var victim = await ExtCodeSizeFixed.new();
        // We check that the initial address is 0
        var addr = await victim.thisIsNotAContract();
        assert.equal(0x0, addr);
        // now this call should fail because we are checking the condition in a different way (using tx.origin == msg.sender)
        try {
            var attacker = await ExtCodeSizeAttacker.new(victim.address);
            assert(false, "This contract creation should revert");
        } catch (error) {
            assert.include(error.message, "revert");
        }
        var addr = await victim.thisIsNotAContract();
        // checking that the address was not modified
        assert.equal(0x0, addr);

        await victim.aContractCannotCallThis();
        var addr = await victim.thisIsNotAContract();
        // checking that the address now is modified when calling the method from a non-contract address
        assert.equal(accounts[0], addr);
    });
});
