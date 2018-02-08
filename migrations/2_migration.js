var OverUnderFlow = artifacts.require("./OverUnderFlow.sol");
var OverUnderFlowFixed = artifacts.require("./OverUnderFlowFixed.sol");
var ReentrancyVulnerable = artifacts.require("./ReentrancyVulnerable.sol");
var ReentrancyVulnerableFixed = artifacts.require("./ReentrancyVulnerableFixed.sol");
var ReentrancyAttacker = artifacts.require("./ReentrancyAttacker.sol");
var WalletLibrary = artifacts.require("./WalletLibrary.sol");
var WalletLibraryFixed = artifacts.require("./WalletLibraryFixed.sol");
var Wallet = artifacts.require("./Wallet.sol");

module.exports = function(deployer) {
  deployer.deploy(OverUnderFlow);
  deployer.deploy(OverUnderFlowFixed);
  deployer.deploy(ReentrancyVulnerable);
  deployer.deploy(ReentrancyVulnerableFixed);
  deployer.deploy(ReentrancyAttacker);
  deployer.deploy(Wallet);
  deployer.deploy(WalletLibrary);
  deployer.deploy(WalletLibraryFixed);
};
