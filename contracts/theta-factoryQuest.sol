// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "./theta-quest.sol";
// import "./registration.sol";

contract quizFactory {
    uint256 public maxEntrance;
    uint256 public minEntrance;
    address public owner;
    uint256 public suscriptionFee; //20% of 100
    uint256 public amountRecaudedFees;
    //acces quiz once time created
    mapping(address => address[]) public userQuiz;
    mapping(string => address) public uuidQuiz;

    constructor() {
        suscriptionFee = 20;
        owner = msg.sender;
        minEntrance = 10;
        maxEntrance = 500;
    }

    function newQuiz(
        string memory uuid,
        uint256 _entrancePrice,
        uint256[] memory _winnerReward
    ) public payable {
        //require range entrance price
        require(_entrancePrice > minEntrance, "minium entrance is 5 tfuel");
        require(_entrancePrice < maxEntrance, "max entrance is 500 tfuel");
        //require valid amount
        uint256 _prizepoolsAmount;
        for (uint i = 0; _winnerReward.length > i; i++) {
            uint _reward = _winnerReward[i] * 1000000;
            _prizepoolsAmount += _reward;
        }

        QuizContractnew _newQuiz = new QuizContractnew{value: msg.value}(
            _entrancePrice,
            msg.sender,
            _winnerReward,
            _prizepoolsAmount,
            suscriptionFee
        );
        address addr = address(_newQuiz);
        userQuiz[msg.sender].push(addr);
        uuidQuiz[uuid] = addr;
    }

    function recaudeFees() public payable {
        amountRecaudedFees += msg.value;
    }

    function withdrawFees(address payable _to) public {
        require(msg.sender == owner);
        amountRecaudedFees = 0;
        _to.transfer(amountRecaudedFees);
    }
}
