const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades')
const Participants = artifacts.require('Participants.sol')
const MockV3Aggregator = artifacts.require('mock/MockV3Aggregator.sol')
module.exports = async function (deployer, network) {
  let mockAggregator = await MockV3Aggregator.deployed()
  let existing
  try {
    existing = await Participants.deployed()
  } catch (e) {
  } finally {
    if (existing) {
      await upgradeProxy(existing.address, Participants, {
        deployer
      })
    } else {
      await deployProxy(Participants, [mockAggregator.address], { deployer })
    }
  }
}
