//SPDX-License-Identifier: MIT

// Solidity 파일은 pragma로 시작합니다.
// pragma는 Solidity 컴파일러의 버전을 확인하는데 사용됩니다.
pragma solidity ^0.8.9;

import "hardhat/console.sol";

// 아래 코드블럭(스코프)는 스마트 컨트랙트를 만드는 메인 코드입니다.
contract Token {
    // 토큰 정보에 대한 String 타입의 변수입니다.
    string public name = "My Hardhat Token";
    string public symbol = "MHT";

    // 토큰의 총 발행량을 unsigned integer 타입 변수에 저장합니다.
    uint256 public totalSupply = 1000000;

    // 이더리움 지갑 계정을 address 타입 변수에 저장합니다.
    address public owner;

    // 각 지갑 별 잔액 정보를 key/value 쌍으로 이루어진 map 자료형에 저장합니다.
    mapping(address => uint256) balances;

    // 전송 event를 선언하여 off-chain 상의  Dapp 등이 컨트랙트의 활동을 인식하는데 도움을 줍니다.
    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    /**
     * 컨트랙트 초기화
     */
    constructor() {
        // 토큰의 총 공급량 모두와 owner변수를 트랜잭션 송신자로 할당합니다.
        // 이때 송신자는 스마트 컨트랙트를 배포한 사랍니다.
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    /**
     * 토큰 전송 함수
     *
     * `external` 라는 함수변경자는 함수를 컨트랙트 외부에서만 호출 가능하도록 속성을 부여합니다.
     */
    function transfer(address to, uint256 amount) external {
        // 토큰 전송자가 충분한 토큰을 가지고 있는지 체크합니다.
        // 만약에 require 문의 첫번째 인자가 false이면, 트랜잭션을 revert 합니다.
        require(balances[msg.sender] >= amount, "Not enough tokens");

        console.log(
            "Transferring from %s to %s %s tokens",
            msg.sender,
            to,
            amount
        );
        // 전송 로직
        balances[msg.sender] -= amount;
        balances[to] += amount;

        // off-chain상의 어플리케이션에 전송 내역을 알리니다.
        emit Transfer(msg.sender, to, amount);
    }

    /**
     * 지정한 계정의 토큰 잔액을 불러오는 읽기 전용 함수입니다.
     *
     * `view` 라는 함수변경자는 해당 메소드가 컨트랙트의 State(상태)를 변경하지 않고,
     * 트랜잭션을 실행하지 않고 호출 할 수 있다는 것을 의미합니다.
     */
    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}
