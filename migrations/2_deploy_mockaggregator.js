const MockV3Aggregator = artifacts.require('mock/MockV3Aggregator.sol')
module.exports = async function (deployer, network) {
  await deployer.deploy(MockV3Aggregator, 8, 300000000000)
}

//'0x615D91289C7d126bA822C405DA833E56Ed3E246f'
