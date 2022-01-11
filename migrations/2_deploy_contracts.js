var Auction = artifacts.require('Auction.sol')
var MockV3Aggregator = artifacts.require('mock/MockV3Aggregator.sol')
const networkToPriceFeedAddress = {
  rinkeby: '0x8a753747a1fa494ec906ce90e9f37563a8af630e',
  kovan: '0x9326BFA02ADD2366b30bacB125260Af641031331',
  'mainnet-fork': '0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419'
}
// we do not need to deploy Participant and PlayerToken since Auction inherits both and we do not need their separate instance.
module.exports = async function (deployer, network) {
  if (network == 'development') {
    let mockAggregator = await MockV3Aggregator.deployed()
    if (!mockAggregator) {
      mockAggregator = await deployer.deploy(MockV3Aggregator, 8, 300000000000)
    }
    networkToPriceFeedAddress['development'] = mockAggregator.address
  }
  await deployer.deploy(Auction, networkToPriceFeedAddress[network])
}
