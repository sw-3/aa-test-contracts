const { expect } = require('chai');
const { ethers } = require('hardhat');

const Moods = {
  Sad: 0,
  Meh: 1,
  Happy: 2,
  Overjoyed: 3
}

describe('ScottsMood', () => {
  let scottsMood
  let deployer, user

  beforeEach(async () => {
    // set up accounts
    let accounts = await ethers.getSigners()
    deployer = accounts[0]
    user = accounts[1]

    // deploy contract
    const ScottsMood = await ethers.getContractFactory('ScottsMood')
    scottsMood = await ScottsMood.deploy()
  })

  describe('Deployment', () => {

    it ('returns initial mood of Meh', async () => {
      expect(await scottsMood.getMood()).to.equal(Moods.Meh)
    })

  })

  describe('Set Mood', () => {

    it ('sets and returns a mood', async () => {
      await scottsMood.setAMood(Moods.Happy)
      expect(await scottsMood.getMood()).to.equal(Moods.Happy)
    })
  })

})
