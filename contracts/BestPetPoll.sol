// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.9;

contract BestPetPoll {
    address owner;
    uint8 constant numVoteTypes = 7;
    enum VoteType { None, Cat, Dog, Horse, Fish, Bird, Reptile }

    mapping(address => VoteType) userHasVoted;

    // State array to store the votes
    uint256[numVoteTypes] votes;

    event Vote(
        address voter,
        VoteType vote
    );

    event ChangeVote(
        address voter,
        VoteType priorVote,
        VoteType newVote
    );

    constructor () {
        owner = msg.sender;

        // initialize all votes to 0 when deployed
        for (uint8 i=0; i<numVoteTypes; i++) {
            votes[i] = 0;
        }
    }

    // internal vote function
    function _vote(VoteType _voteType) internal {
        VoteType priorVoteType;
        bool changeVote = false;

        // if they already voted, change their vote
        if (hasVoted(msg.sender)) {

            changeVote = true;

            // user already voted, subtract their prior vote
            priorVoteType = userHasVoted[msg.sender];
            votes[uint8(priorVoteType)]--;
        }

        // increment count for this vote
        votes[uint8(_voteType)]++;

        // track that the user has voted
        userHasVoted[msg.sender] = _voteType;

        // emit an event
        if (changeVote) {
            emit ChangeVote(msg.sender, priorVoteType, _voteType);
        } else {
            emit Vote(msg.sender, _voteType);
        }
    }


    // external interface
    //-------------------------------------------------------

    function voteForCat() external {
        _vote(VoteType.Cat);
    }

    function voteForDog() external {
        _vote(VoteType.Dog);
    }

    function voteForHorse() external {
        _vote(VoteType.Horse);
    }

    function voteForFish() external {
        _vote(VoteType.Fish);
    }

    function voteForBird() external {
        _vote(VoteType.Bird);
    }

    function voteForReptile() external {
        _vote(VoteType.Reptile);
    }

    // return whether an address has already voted
    function hasVoted(address _voter) public view returns(bool) {
        
        return (uint8(userHasVoted[_voter]) > 0);
    }

    // get votes for each type
    function getCatVotes() public view returns(uint256) {
        return votes[uint8(VoteType.Cat)];
    }

    function getDogVotes() public view returns(uint256) {
        return votes[uint8(VoteType.Dog)];
    }

    function getHorseVotes() public view returns(uint256) {
        return votes[uint8(VoteType.Horse)];
    }

    function getFishVotes() public view returns(uint256) {
        return votes[uint8(VoteType.Fish)];
    }

    function getBirdVotes() public view returns(uint256) {
        return votes[uint8(VoteType.Bird)];
    }

    function getReptileVotes() public view returns(uint256) {
        return votes[uint8(VoteType.Reptile)];
    }

}
