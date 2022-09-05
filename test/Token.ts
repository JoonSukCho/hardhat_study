import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";

// Hardhat은 test 폴더 안에 있는 모든 자바스크립트 기반 파일을 실행합니다.
// Hardhat test는 일반적으로 Mocha와 Chai로 작성됩니다.

// `loadFixture`를 활용하여, 테스트 간에 활용되는 공통 설정을 공유할 수 있습니다.
// 해당 작업을 통해 쉽고, 빠른 테스트를 진행할 수 있습니다.

// `describe`는 Mocha에서 테스트를 구조화하기 위한 함수 입니다.
// 구조화된 테스트를 가짐으로서 디버깅이 쉬워지고, 모든 Mocha 함수들은 글로벌 스코프를 가집니다.

// `describe` 함수는 테스트에 대한 이름과, 콜백으로 테스트 셋을 인자로 받습니다.
// 콜백은 반드시 테스틑 셋을 정의해야하며, 비동기 함수를 넣을 수 없습니다.
describe("Token contract", function () {
  // 모든 테스트에서 재사용할 fixture 를 정의합니다. We use
  // loadFixture 는 최초 실행 될 때, 상태에 대하여 스냅샷을 한번 찍어두고, 테스트가 진행 될 떄 마다
  // 해당 상태로 Hardhat Network를 재설정 합니다.
  async function deployTokenFixture() {
    // 컨트랙트와 지갑을 불러옵니다.
    const Token = await ethers.getContractFactory("Token");
    const [owner, addr1, addr2] = await ethers.getSigners();

    // 컨트랙트를 배포하기 위해서는, 비동기로 <컨트랙트>.deploy()를 호출하면 됩니다.
    // deploy 메소드가 pending이 끝나면, 배포 트랜잭션이 채굴(mining)된 메모리를 반환합니다.
    const hardhatToken = await Token.deploy();

    await hardhatToken.deployed();

    // 테스트에 재사용 될 것 같은 어떤 것이던지 반환 가능합니다.
    return { Token, hardhatToken, owner, addr1, addr2 };
  }

  // 구조화 하기 위해서 decribe 호출을 중첩할 수 있습니다.
  describe("Deployment", function () {
    // `it`은 각 테스트를 정의하는 함수입니다.테스트의 이름과, 비동기 테스트 함수를 인자로 받습니다.
    it("Should set the right owner", async function () {
      // loadFixture를 이용하여, 위에서 반환한 공통변수를 불러옵니다.
      const { hardhatToken, owner } = await loadFixture(deployTokenFixture);

      // `expect` 값을 인자로 받아 assertion 객체로 감싸는 함수입니다.
      // asesertion 객체는 다양한 유틸리티 메소드를 가지고 있어, 테스트에 유용합니다.

      // 이 테스트는 배포한 소유자가 전체 물량을 다 가지고 있는지 확인하는 테스트 입니다.
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const { hardhatToken, owner } = await loadFixture(deployTokenFixture);
      const ownerBalance = await hardhatToken.balanceOf(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      const { hardhatToken, owner, addr1, addr2 } = await loadFixture(
        deployTokenFixture
      );

      await expect(
        hardhatToken.transfer(addr1.address, 50)
      ).to.changeTokenBalances(hardhatToken, [owner, addr1], [-50, 50]);

      // .connect(<지갑>) 함수를 이용하여, 트랜잭션을 발송할 계정을 변경할 수 있습니다.
      await expect(
        hardhatToken.connect(addr1).transfer(addr2.address, 50)
      ).to.changeTokenBalances(hardhatToken, [addr1, addr2], [-50, 50]);
    });

    it("should emit Transfer events", async function () {
      const { hardhatToken, owner, addr1, addr2 } = await loadFixture(
        deployTokenFixture
      );

      await expect(hardhatToken.transfer(addr1.address, 50))
        .to.emit(hardhatToken, "Transfer")
        .withArgs(owner.address, addr1.address, 50);

      await expect(hardhatToken.connect(addr1).transfer(addr2.address, 50))
        .to.emit(hardhatToken, "Transfer")
        .withArgs(addr1.address, addr2.address, 50);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const { hardhatToken, owner, addr1 } = await loadFixture(
        deployTokenFixture
      );
      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

      // 0원인 계좌에서 보냈기 때문에 transfer 내부의 'require' 구문에 의해 트랜잭션이
      // revert 처리되는지 확인하는 테스트 입니다.
      await expect(
        hardhatToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("Not enough tokens");

      // 소유자 계정의 잔액이 변경되어서는 안되기 때문에 해당 테스트도 포함되어 있습니다.
      expect(await hardhatToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });
  });
});
