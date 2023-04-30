// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);

    function balanceOf(address account) external view returns (uint256);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    function approve(address spender, uint256 amount) external returns (bool);

    function allowance(address owner, address spender)
        external
        view
        returns (uint256);
}

contract QuizContract {
    address public teacher;
    uint256 public quizFee;
    uint256 public winnerReward;
    uint256 public numWinners;
    mapping(address => uint256) public balances;
    mapping(address => bool) public isWinner;
    address[] public winners;
    IERC20 public token;
    Escrow public escrow;

    event QuizParticipation(address indexed student, uint256 amount);
    event WinnerSelection(address[] winners);
    event TokenTransfer(
        address indexed from,
        address indexed to,
        uint256 amount
    );
    event TokenPurchase(address indexed buyer, uint256 amount);
    event TokenApproval(
        address indexed owner,
        address indexed spender,
        uint256 amount
    );

    constructor(
        address _token,
        uint256 _quizFee,
        uint256 _winnerReward,
        uint256 _numWinners
    ) {
        teacher = msg.sender;
        quizFee = _quizFee;
        winnerReward = _winnerReward;
        numWinners = _numWinners;
        token = IERC20(_token);
        escrow = new Escrow(_token);
    }

    function participate() public {
        require(
            balances[msg.sender] == 0,
            "You have already participated in the quiz"
        );
        require(
            token.balanceOf(msg.sender) >= quizFee,
            "Insufficient token balance"
        );
        require(
            token.transferFrom(msg.sender, address(escrow), quizFee),
            "Token transfer failed"
        );

        balances[msg.sender] = quizFee;
        emit QuizParticipation(msg.sender, quizFee);
    }

    function selectWinners(address[] memory _winners) public {
        require(msg.sender == teacher, "Only the teacher can select winners");
        require(_winners.length >= numWinners, "Invalid number of winners");

        for (uint256 i = 0; i < _winners.length; i++) {
            require(balances[_winners[i]] > 0, "Invalid winner");
            require(!isWinner[_winners[i]], "Duplicate winner");

            isWinner[_winners[i]] = true;
            winners.push(_winners[i]);
        }

        emit WinnerSelection(winners);

        for (uint256 i = 0; i < winners.length; i++) {
            require(
                token.transferFrom(address(escrow), winners[i], winnerReward),
                "Token transfer failed"
            );
            balances[winners[i]] += winnerReward;
        }
    }

    function withdraw() public {
        uint256 amount = balances[msg.sender];
        require(amount > 0, "Insufficient balance");

        balances[msg.sender] = 0;

        require(token.transfer(msg.sender, amount), "Token transfer failed");
    }

    function getEscrowBalance() public view returns (uint256) {
        return token.balanceOf(address(escrow));
    }

    function transferTokens(address recipient, uint256 amount) public {
        require(
            msg.sender == teacher || isWinner[msg.sender],
            "Only the teacher or winners can transfer tokens"
        );
        require(token.transfer(recipient, amount), "Token transfer failed");

        balances[msg.sender] -= amount;
        balances[recipient] += amount;

        emit TokenTransfer(msg.sender, recipient, amount);
    }

    function buyTokens(uint256 amount) public {
        require(amount > 0, "Invalid amount");
        require(
            token.transferFrom(msg.sender, address(this), amount),
            "Token transfer failed"
        );
        balances[msg.sender] += amount;

        emit TokenPurchase(msg.sender, amount);
    }

    function approveTokens(address spender, uint256 amount) public {
        require(spender != address(0), "Invalid spender address");
        require(amount > 0, "Invalid amount");
        require(token.approve(spender, amount), "Token approval failed");

        emit TokenApproval(msg.sender, spender, amount);
    }
}

contract Escrow {
    IERC20 public token;

    constructor(address _token) {
        token = IERC20(_token);
    }

    function deposit(uint256 amount) public {
        require(
            token.transferFrom(msg.sender, address(this), amount),
            "Token transfer failed"
        );
    }

    function withdraw(address recipient, uint256 amount) public {
        require(
            msg.sender == address(token),
            "Only the token contract can call this function"
        );
        require(token.transfer(recipient, amount), "Token transfer failed");
    }

    function balance() public view returns (uint256) {
        return token.balanceOf(address(this));
    }
}
