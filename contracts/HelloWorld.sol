// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.13;
import "hardhat/console.sol";

contract HelloWorld {
    string public greet = "Hello World!";

    function Hello () external view returns(string memory){
        console.log(
            "greet %s %s", msg.sender, greet
        );

        return greet;
    }
}