const Auction = artifacts.require('../contracts/Auction.sol')
const Participants = artifacts.require('../contracts/Participants.sol')
const web3 = require('web3')

contract('Auction', (accounts) => {
  let auction
  before(async () => {
    auction = await Auction.deployed()
    const playersIpfsURI = [
      'www.dummyurl1.com',
      'www.dummyurl2.com',
      'www.dummyurl3.com'
    ]
    await auction.createPlayers(playersIpfsURI)
    // participants = await Participants.deployed()
    const names = ['ross', 'joey', 'bing']
    for (let i = 0; i < 3; i++) {
      await auction.addParticipant(names[i], {
        from: accounts[i + 1],
        value: web3.utils.toWei('0.01', 'ether')
      })
    }
    await auction.startAuction()
  })

  describe('Auction Bidding', async () => {
    it('bid for player 1', async () => {
      //   await auction.claimPlayer()

      await auction.bidForPlayer(10, { from: accounts[2] })
      await auction.bidForPlayer(20, { from: accounts[1] })
      await auction.bidForPlayer(30, { from: accounts[2] })
      //   await auction.claimPlayer({ from: accounts[2] })

      await new Promise((resolve) => {
        setTimeout(async () => {
          await auction.claimPlayer({ from: accounts[2] })
          resolve()
        }, 1000 * 21)
      })
      const p = await auction.getParticipant(1)
      assert(p.ownedPlayers.length == 1)
      assert((await auction.ownerOf(p.ownedPlayers[0])) == accounts[2])
    })
    it('bid for player 2', async () => {
      //   await auction.claimPlayer()

      await auction.bidForPlayer(10, { from: accounts[2] })
      await auction.bidForPlayer(20, { from: accounts[1] })
      await auction.bidForPlayer(30, { from: accounts[2] })
      //   await auction.claimPlayer({ from: accounts[2] })

      await new Promise((resolve) => {
        setTimeout(async () => {
          await auction.claimPlayer({ from: accounts[2] })
          resolve()
        }, 1000 * 21)
      })
      const p = await auction.getParticipant(1)
      assert(p.ownedPlayers.length == 2)
      assert((await auction.ownerOf(p.ownedPlayers[1])) == accounts[2])
    })
    it('bid for player 3', async () => {
      //   await auction.claimPlayer()

      await auction.bidForPlayer(10, { from: accounts[2] })
      await auction.bidForPlayer(20, { from: accounts[1] })
      await auction.bidForPlayer(30, { from: accounts[2] })
      //   await auction.claimPlayer({ from: accounts[2] })

      await new Promise((resolve) => {
        setTimeout(async () => {
          await auction.claimPlayer({ from: accounts[2] })
          resolve()
        }, 1000 * 21)
      })
      const p = await auction.getParticipant(1)
      assert(p.ownedPlayers.length == 3)
      assert((await auction.ownerOf(p.ownedPlayers[2])) == accounts[2])
    })
    it('bid for non existing player ', async () => {
      //   await auction.claimPlayer()

      await auction.bidForPlayer(10, { from: accounts[2] })
      await auction.bidForPlayer(20, { from: accounts[1] })
      await auction.bidForPlayer(30, { from: accounts[2] })
      //   await auction.claimPlayer({ from: accounts[2] })

      await new Promise((resolve) => {
        setTimeout(async () => {
          await auction.claimPlayer({ from: accounts[2] })
          resolve()
        }, 1000 * 21)
      })
      const p = await auction.getParticipant(1)
      assert(p.ownedPlayers.length == 4)
      assert((await auction.ownerOf(p.ownedPlayers[3])) == accounts[2])
    })
  })
})
