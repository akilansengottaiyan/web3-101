const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades')
const PlayerToken = artifacts.require('PlayerToken.sol')
module.exports = async function (deployer, network) {
  let existing
  try {
    existing = await PlayerToken.deployed()
  } catch (e) {
  } finally {
    if (existing) {
      await upgradeProxy(existing.address, PlayerToken, {
        deployer
      })
    } else {
      await deployProxy(PlayerToken, { deployer })
    }
  }
}
