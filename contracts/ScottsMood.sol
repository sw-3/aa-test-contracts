// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.9;

contract ScottsMood {

    enum Moods { Sad, Meh, Happy, Overjoyed }
    Moods constant defaultMood = Moods.Meh;

    // State variable to store the mood string
    Moods private mood;

    constructor () {
        _setMood(defaultMood);
    }

    // Internal functions to set the mood
    function _setMood(Moods _mood) internal {
        mood = _mood;
    }

    function _setMeh() internal {
        mood = Moods.Meh;
    }

    function getMood() public view returns(Moods) {
        return mood;
    }

    function setAMood(Moods _mood) public {
        _setMood(_mood);
    }

}
