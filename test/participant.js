var web3 = require('web3')
const Participants = artifacts.require('../contracts/Participants.sol')

contract('Participants', (accounts) => {
  let participants
  before(async () => {
    participants = await Participants.deployed()
  })
  describe('Deployment', async () => {
    it('deploy success', async () => {
      let address = participants.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })
  })
  describe('Participants', async () => {
    const names = ['ross', 'joey', 'bing', 'monica', 'phoebe']
    it('add 5 participants', async () => {
      for (let i = 0; i < 5; i++) {
        await participants.addParticipant(names[i], {
          from: accounts[i + 1],
          value: web3.utils.toWei('0.01', 'ether')
        })
        let participant = await participants.getParticipant(i)
        assert(participant.name === names[i])
      }
    })
    it('add 6th participant', async () => {
      await participants.addParticipant('rachel', {
        from: accounts[6],
        value: web3.utils.toWei('0.01', 'ether')
      })
      let participant = await participants.getParticipant(5)
      assert(participant.name === 'rachel')
    })
    it('modifyMaxParticipants', async () => {
      await participants.modifyMaxParticipants(6, {
        from: accounts[0]
      })
    })
    it('add 6th participant after increasing limit', async () => {
      await participants.addParticipant('rachel', {
        from: accounts[6],
        value: web3.utils.toWei('0.01', 'ether')
      })
      let participant = await participants.getParticipant(5)
      assert(participant.name === 'rachel')
    })
  })
})
