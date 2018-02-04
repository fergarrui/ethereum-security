var OverUnderFlow = artifacts.require("./OverUnderFlow.sol");
var OverUnderFlowFixed = artifacts.require("./OverUnderFlowFixed.sol");
var ReentrancyVulnerable = artifacts.require("./ReentrancyVulnerable.sol");
var ReentrancyVulnerableFixed = artifacts.require("./ReentrancyVulnerableFixed.sol");
var ReentrancyAttacker = artifacts.require("./ReentrancyAttacker.sol");

module.exports = function(deployer) {
  deployer.deploy(OverUnderFlow);
  deployer.deploy(OverUnderFlowFixed);
  deployer.deploy(ReentrancyVulnerable);
  deployer.deploy(ReentrancyVulnerableFixed);
  deployer.deploy(ReentrancyAttacker);
};
