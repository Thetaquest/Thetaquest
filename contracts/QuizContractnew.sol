// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "./quizFactory.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract QuizContractnew is ERC721 {
    //quiz data
    address public factoryContractAddress;
    uint256 public suscriptionFee; //for organization
    uint256 public entrancePrice; //range
    //teacher
    address public teacher;
    uint256 public balanceTeacher;
    //user data
    mapping(address => bool) userParticipating;
    //nft count
    uint256 public suscribedUsersAmount;
    //prizes
    uint256[] public winnerReward;
    uint256 public prizepoolBalance;
    //winner
    mapping(address => uint256) public balancesWinners;
    mapping(address => bool) public isWinner;
    address[] public winners;
    bool quizFinished;

    //teacher select
    constructor(
        uint256 _entrancePrice,
        address _teacher,
        uint256[] memory _winnerReward,
        uint256 _prizepoolsAmount,
        uint256 _suscriptionFee
    ) payable ERC721("name", "symbol") {
        //minium 1 winner
        require(_winnerReward.length > 0);
        //teacher set prizepools
        require(
            _prizepoolsAmount <= msg.value,
            "you must send as money as the prizepool"
        );
        entrancePrice = _entrancePrice * 1000000;
        teacher = _teacher;
        winnerReward = _winnerReward;
        prizepoolBalance = msg.value;
        //set fees
        suscriptionFee = _suscriptionFee;
        //set factory contract
        factoryContractAddress = msg.sender;
    }

    function joinQuest() public payable {
        //require user payed entrance price
        require(msg.value >= entrancePrice);
        require(userParticipating[msg.sender] == false);
        //set user as participating
        userParticipating[msg.sender] = true;
        //mint nft
        suscribedUsersAmount = suscribedUsersAmount + 1;
        _safeMint(msg.sender, suscribedUsersAmount);
        //distribute money teacher/organization
        uint organizationFees = (suscriptionFee * msg.value) / 100;
        balanceTeacher = msg.value - organizationFees;
        quizFactory factoryContract = quizFactory(factoryContractAddress);
        factoryContract.recaudeFees{value: organizationFees}();
    }

    function takeWinners(address[] memory _selectedWinners) public {
        require(quizFinished == false);
        require(
            winnerReward.length == winnerReward.length,
            "amount of winners dont match amount of prizes"
        );
        for (uint i = 0; winners.length > i; i++) {
            //set winners data on the smart contract
            balancesWinners[_selectedWinners[i]] = winnerReward[i];
            isWinner[_selectedWinners[i]] = true;
            winners.push(_selectedWinners[i]);
            //transfer prizes
            payable(_selectedWinners[i]).transfer(winnerReward[i]);
        }
        quizFinished = true;
    }

    function takeBalancesTeacher() public {
        require(msg.sender == teacher);
        balanceTeacher = 0;
        payable(teacher).transfer(balanceTeacher);
    }
}
