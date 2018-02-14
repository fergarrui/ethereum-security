var OverUnderFlow = artifacts.require("./OverUnderFlow.sol");
var OverUnderFlowFixed = artifacts.require("./OverUnderFlowFixed.sol");
var ReentrancyVulnerable = artifacts.require("./ReentrancyVulnerable.sol");
var ReentrancyVulnerableFixed = artifacts.require("./ReentrancyVulnerableFixed.sol");
var WalletLibrary = artifacts.require("./WalletLibrary.sol");
var WalletLibraryFixed = artifacts.require("./WalletLibraryFixed.sol");
var Auction = artifacts.require("./Auction.sol");
var AuctionFixed = artifacts.require("./AuctionFixed.sol");
var ForceEtherVictim = artifacts.require("./ForceEtherVictim.sol");
var TxOriginVictim = artifacts.require("./TxOriginVictim.sol");
var TxOriginVictimFixed = artifacts.require("./TxOriginVictimFixed.sol");
var UnboundArray = artifacts.require("./UnboundArray.sol");
var UnboundArrayFixed = artifacts.require("./UnboundArrayFixed.sol");
var WalletSendBug = artifacts.require("./WalletSendBug.sol");
var WalletSendBugFixed = artifacts.require("./WalletSendBugFixed.sol");

module.exports = function(deployer) {

  deployer.deploy(OverUnderFlow);
  deployer.deploy(OverUnderFlowFixed);
  deployer.deploy(ReentrancyVulnerable);
  deployer.deploy(ReentrancyVulnerableFixed);
  deployer.deploy(WalletLibrary);
  deployer.deploy(WalletLibraryFixed);
  deployer.deploy(Auction);
  deployer.deploy(AuctionFixed);
  deployer.deploy(ForceEtherVictim);
  deployer.deploy(TxOriginVictim);
  deployer.deploy(TxOriginVictimFixed);
  deployer.deploy(UnboundArray);
  deployer.deploy(UnboundArrayFixed);
  deployer.deploy(WalletSendBug);
  deployer.deploy(WalletSendBugFixed);

};
