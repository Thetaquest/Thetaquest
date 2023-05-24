// SPDX-License-Identifier: MIT
// pragma solidity ^0.8.1;

// contract QuizContractnew {
//     struct User {
//         string username;
//         string email;
//         string walletAddress;
//         string role;
//     }

//     mapping(address => User) public users;
//     address[] public userAddresses;

//     function register(
//         string memory username,
//         string memory email,
//         string memory walletAddress,
//         string memory role
//     ) public {
//         require(users[msg.sender].walletAddress == '', "User is already registered");

//         User memory newUser = User({
//             username: username,
//             email: email,
//             walletAddress: walletAddress,
//             role: role
//         });

//         users[msg.sender] = newUser;
//         userAddresses.push(msg.sender);
//     }
// }

pragma solidity ^0.8.1;

contract UserRegistration {
    struct User {
        string username;
        string email;
        string walletAddress;
        string role;
        uint256 balance;
    }

    mapping(address => User) public users;
    address[] public userAddresses;

    function register(
        string memory username,
        string memory email,
        string memory walletAddress,
        string memory role
    ) public {
        require(bytes(users[msg.sender].walletAddress).length == 0, "User is already registered");

        User memory newUser = User({
            username: username,
            email: email,
            walletAddress: walletAddress,
            role: role,
            balance: 0
        });

        users[msg.sender] = newUser;
        userAddresses.push(msg.sender);
    }

    function login() public view returns (User memory) {
        require(bytes(users[msg.sender].walletAddress).length != 0, "User is not registered");

        return users[msg.sender];
    }

    function getWalletBalance() public view returns (uint256) {
        require(bytes(users[msg.sender].walletAddress).length != 0, "User is not registered");

        return users[msg.sender].balance;
    }

    function updateWalletBalance(uint256 newBalance) public {
        require(bytes(users[msg.sender].walletAddress).length != 0, "User is not registered");

        users[msg.sender].balance = newBalance;
    }
}
