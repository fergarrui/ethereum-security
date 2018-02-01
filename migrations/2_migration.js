var OverUnderFlow = artifacts.require("./OverUnderFlow.sol");
var OverUnderFlowFixed = artifacts.require("./OverUnderFlowFixed.sol");

module.exports = function(deployer) {
  deployer.deploy(OverUnderFlow);
  deployer.deploy(OverUnderFlowFixed);
};
