/* 1. Upload images to ipfs 
   2. Write players data with img to new files
   3. Generate players-{id}.json
   4. Call contrac.createPlayers()
*/
module.exports = async function (callback) {
  const Auction = artifacts.require('../contracts/Auction.sol')
  const playersJson = require('../metadata/players.json')
  const { uploadFilesInPathToIpfs } = require('./utils/ipfs')
  const { generatePlayersMeta } = require('./utils/generate-players-meta')
  const playersIpfsImgURIs = await uploadFilesInPathToIpfs('./metadata/images') // upload images to ipfs
  generatePlayersMeta(
    playersJson.players,
    playersIpfsImgURIs,
    `./metadata/players-nft`
  ) // generate metadata files for all the players given the imgURIs
  const playersIpfsURI = await uploadFilesInPathToIpfs(
    `./metadata/players-nft/`
  ) // Upload generated players meta files to ipfs
  const auctionContract = await Auction.deployed() //get the contract
  await auctionContract.createPlayers(playersIpfsURI) //call the onlyOwner function
  callback()
}
