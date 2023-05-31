// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract QuizContract is ERC20 {
    uint256 public suscriptionFee;
    uint256 public entrancePrice;
    address public teacher;
    uint256 public balanceTeacher;
    mapping(address => bool) userParticipating;
    uint256 public suscribedUsersAmount;
    uint256[] public winnerReward;
    uint256 public prizepoolBalance;
    mapping(address => uint256) public balancesWinners;
    mapping(address => bool) public isWinner;
    address[] public winners;
    bool public quizFinished;

    constructor(
        uint256 _entrancePrice,
        address _teacher,
        uint256[] memory _winnerReward,
        uint256 _prizepoolsAmount,
        uint256 _suscriptionFee
    ) ERC20("QuizToken", "QT") {
        require(_winnerReward.length > 0);
        entrancePrice = _entrancePrice;
        teacher = _teacher;
        winnerReward = _winnerReward;
        prizepoolBalance = _prizepoolsAmount;
        suscriptionFee = _suscriptionFee;
    }

    function joinQuiz() public payable {
        require(msg.value >= entrancePrice);
        require(!userParticipating[msg.sender]);
        userParticipating[msg.sender] = true;
        suscribedUsersAmount++;
        _mint(msg.sender, 1);
        uint256 organizationFees = (suscriptionFee * msg.value) / 100;
        balanceTeacher = msg.value - organizationFees;
        transferFrom(msg.sender, address(this), organizationFees);
    }

    function takeWinners(address[] memory _selectedWinners) public {
        require(!quizFinished);
        require(winnerReward.length == _selectedWinners.length, "Amount of winners don't match amount of prizes");

        for (uint256 i = 0; i < _selectedWinners.length; i++) {
            balancesWinners[_selectedWinners[i]] = winnerReward[i];
            isWinner[_selectedWinners[i]] = true;
            winners.push(_selectedWinners[i]);
            transfer(_selectedWinners[i], winnerReward[i]);
        }

        quizFinished = true;
    }

    function takeBalanceTeacher() public {
        require(msg.sender == teacher);
        balanceTeacher = 0;
        transfer(teacher, balanceTeacher);
    }
}

contract QuizFactory {
    uint256 public maxEntrance;
    uint256 public minEntrance;
    address public owner;
    uint256 public suscriptionFee;
    uint256 public amountRecaudedFees;
    mapping(address => address[]) public userQuiz;
    mapping(string => address) public uuidQuiz;

    constructor() {
        suscriptionFee = 20;
        owner = msg.sender;
        minEntrance = 10;
        maxEntrance = 500;
    }

    function createQuiz(
        string memory uuid,
        uint256 _entrancePrice,
        uint256[] memory _winnerReward
    ) public payable {
        require(_entrancePrice > minEntrance, "Minimum entrance price is 10");
        require(_entrancePrice < maxEntrance, "Maximum entrance price is 500");

        uint256 _prizepoolsAmount;
        for (uint256 i = 0; i < _winnerReward.length; i++) {
            uint256 _reward = _winnerReward[i];
            _prizepoolsAmount += _reward;
        }

        QuizContract newQuiz = new QuizContract(
            _entrancePrice,
            msg.sender,
            _winnerReward,
            _prizepoolsAmount,
            suscriptionFee
        );
        address addr = address(newQuiz);
        userQuiz[msg.sender].push(addr);
        uuidQuiz[uuid] = addr;
    }

    function recaudeFees() public payable {
        amountRecaudedFees += msg.value;
    }

    function withdrawFees(address payable _to) public {
        require(msg.sender == owner);
        uint256 feesToWithdraw = amountRecaudedFees;
        amountRecaudedFees = 0;
        _to.transfer(feesToWithdraw);
    }
}
