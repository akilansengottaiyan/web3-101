const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades')
const Auction = artifacts.require('Auction.sol')
const MockV3Aggregator = artifacts.require('mock/MockV3Aggregator.sol')
module.exports = async function (deployer, network) {
  let mockAggregator = await MockV3Aggregator.deployed()
  let existing
  try {
    existing = await Auction.deployed()
  } catch (e) {
  } finally {
    if (existing) {
      await upgradeProxy(existing.address, Auction, {
        deployer
      })
    } else {
      await deployProxy(Auction, [mockAggregator.address], { deployer })
    }
  }
}
