var WalletLibrary = artifacts.require("./WalletLibrary.sol");
var Wallet = artifacts.require("./Wallet.sol");

contract("Wallet delegate", (accounts) => {

    var library;
    var wallet;
    it("Test Delegate bug", () => {
         return WalletLibrary.deployed().then(instanceLibrary => {
            library = instanceLibrary;
            return library.address;
         }).then(address => {
            return Wallet.new(address);
         }).then(instanceWallet => {
            wallet = instanceWallet;
         }).then(() => {
            return wallet.getOwner.call();
         }).then(walletOwner => {
            // check that the wallet was properly initialized having owner == accounts[0]
            assert.equal(walletOwner, accounts[0]);
            return library.getOwner.call();
         }).then(libraryOwner => {
            // the library owner was not set, because delegatecall modifies the storage of the caller
            assert.equal(libraryOwner, 0x0);
            // calculating the function id of initWallet
            var functionHash = web3.sha3("initWallet(address)").slice(0, 10);
            // passing accounts[2] as argument. Adding 0s to make it 32 bytes long
            var functionArgument = "000000000000000000000000" + accounts[2].slice(2, accounts[2].length);
            var _data = functionHash + functionArgument;
            // calling the fallback function of Wallet.sol passing as msg.data the necessary
            // input to call initWallet from there
            return web3.eth.sendTransaction({
                from: accounts[1],
                to: wallet.address,
                data: _data,
                value: 0,
                gas: 200000
            });
         }).then((result) => {
            return wallet.getOwner.call();
         }).then(walletOwner => {
            // checking that the new owner of Wallet.sol is accounts[2]
            assert.equal(walletOwner, accounts[2]);
        });
    });
});
