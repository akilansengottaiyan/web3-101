var Auction = artifacts.require('Auction.sol')
var MockV3Aggregator = artifacts.require('mock/MockV3Aggregator.sol')

// we do not need to deploy Participant and PlayerToken since Auction inherits both and we do not need their separate instance.
module.exports = async function (deployer, network) {
  let priceFeed
  if (network == 'development') {
    let mockAggregator = await MockV3Aggregator.deployed()
    if (!mockAggregator) {
      mockAggregator = await deployer.deploy(MockV3Aggregator, 8, 300000000000)
    }
    priceFeed = mockAggregator.address
  } else {
    priceFeed = deployer[network].chainlinkConfig.priceFeed
  }
  if (!priceFeed) {
    console.error('No chainlink Config not found for ', network)
  }
  await deployer.deploy(Auction, priceFeed)
}
