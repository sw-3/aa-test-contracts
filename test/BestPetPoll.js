const { expect } = require('chai');
const { ethers } = require('hardhat');

const VoteType = {
  None: 0,
  Cat: 1,
  Dog: 2,
  Horse: 3,
  Fish: 4,
  Rodent: 5,
  Reptile: 6
}

describe('BestPetPoll', () => {
  let bestPetPoll
  let deployer, user1, user2, user3, user4

  beforeEach(async () => {
    // set up accounts
    let accounts = await ethers.getSigners()
    deployer = accounts[0]
    user1 = accounts[1]
    user2 = accounts[2]
    user3 = accounts[3]
    user4 = accounts[4]

    // deploy contract
    const BestPetPoll = await ethers.getContractFactory('BestPetPoll')
    bestPetPoll = await BestPetPoll.deploy()
  })

  describe('Deployment', () => {

    it ('returns initial votes of 0', async () => {
      expect(await bestPetPoll.getCatVotes()).to.equal(0)
      expect(await bestPetPoll.getDogVotes()).to.equal(0)
      expect(await bestPetPoll.getHorseVotes()).to.equal(0)
      expect(await bestPetPoll.getFishVotes()).to.equal(0)
      expect(await bestPetPoll.getRodentVotes()).to.equal(0)
      expect(await bestPetPoll.getReptileVotes()).to.equal(0)
    })

    it ('returns user has not voted', async () => {
      expect(await bestPetPoll.hasVoted(user1)).to.equal(false)
    })
  })

  describe('Voting', () => {
    let transaction, result, numVotes

    describe('Success', () => {

      it ('records a vote for Cat', async () => {
        transaction = await bestPetPoll.connect(user1).voteForCat()
        result = await transaction.wait()
        expect(await bestPetPoll.getCatVotes()).to.equal(1)
      })

      it ('records a vote for Dog', async () => {
        transaction = await bestPetPoll.connect(user1).voteForDog()
        result = await transaction.wait()
        expect(await bestPetPoll.getDogVotes()).to.equal(1)
      })

      it ('records a vote for Horse', async () => {
        transaction = await bestPetPoll.connect(user1).voteForHorse()
        result = await transaction.wait()
        expect(await bestPetPoll.getHorseVotes()).to.equal(1)
      })

      it ('records a vote for Fish', async () => {
        transaction = await bestPetPoll.connect(user1).voteForFish()
        result = await transaction.wait()
        expect(await bestPetPoll.getFishVotes()).to.equal(1)
      })

      it ('records a vote for Rodent', async () => {
        transaction = await bestPetPoll.connect(user1).voteForRodent()
        result = await transaction.wait()
        expect(await bestPetPoll.getRodentVotes()).to.equal(1)
      })

      it ('records a vote for Reptile', async () => {
        transaction = await bestPetPoll.connect(user1).voteForReptile()
        result = await transaction.wait()
        expect(await bestPetPoll.getReptileVotes()).to.equal(1)
      })

      it ('records votes for Fish from multiple users', async () => {
        transaction = await bestPetPoll.connect(user1).voteForFish()
        result = await transaction.wait()
        expect(await bestPetPoll.getFishVotes()).to.equal(1)
        transaction = await bestPetPoll.connect(user2).voteForFish()
        result = await transaction.wait()
        expect(await bestPetPoll.getFishVotes()).to.equal(2)
        transaction = await bestPetPoll.connect(user3).voteForFish()
        result = await transaction.wait()
        expect(await bestPetPoll.getFishVotes()).to.equal(3)
        transaction = await bestPetPoll.connect(user4).voteForFish()
        result = await transaction.wait()
        expect(await bestPetPoll.getFishVotes()).to.equal(4)
      })

      it ('emits vote event', async () => {
        transaction = await bestPetPoll.connect(user1).voteForRodent()
        result = await transaction.wait()

        await expect(transaction).to.emit(bestPetPoll, 'Vote')
          .withArgs(user1.address, VoteType.Rodent)
      })
    })

    describe('Failure', () => {

      it ('does not allow multiple votes', async () => {
        transaction = await bestPetPoll.connect(user1).voteForFish()
        result = await transaction.wait()
        expect(await bestPetPoll.getFishVotes()).to.equal(1)
        await expect(bestPetPoll.connect(user1).voteForDog()).to.be.reverted
      })

    })

  })

})
