// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TNT20 is ERC20 {
    event UpdateAdmin(address newAdmin);

    address public admin;

    constructor(
        string memory name,
        string memory symbol,
        address initDistrWallet,
        uint initMintAmount,
        address adminAddr
    ) ERC20(name, symbol) {
        _mint(initDistrWallet, initMintAmount);
        admin = adminAddr;
        emit UpdateAdmin(admin);
    }

    function mint(address receiver, uint amount) external adminOnly {
        _mint(receiver, amount);
    }

    function updateAdmin(address adminAddr) external adminOnly {
        admin = adminAddr;
        emit UpdateAdmin(admin);
    }

    modifier adminOnly() {
        require(msg.sender == admin, "Only admin can make this call");
        _;
    }
}
