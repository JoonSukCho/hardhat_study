pragma solidity ^0.8.13;
import "hardhat/console.sol";

contract Events {
    event burned(address who, uint amount);

    function burn(uint _amount) public payable {
        console.log('Call burn', msg.sender, _amount);
        emit burned(msg.sender, _amount);
    }
}