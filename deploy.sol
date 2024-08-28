const DreamNFT = artifacts.require("DreamNFT");

module.exports = function(deployer) {
    deployer.deploy(DreamNFT);
};