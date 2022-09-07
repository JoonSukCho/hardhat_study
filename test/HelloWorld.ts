import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect, should } from "chai";

describe("Hello World", function () {
  async function deployHelloWorldFixture() {
    const HelloWorld = await ethers.getContractFactory("HelloWorld");
    const [owner, addr1, addr2] = await ethers.getSigners();

    const hardhatToken = await HelloWorld.deploy();

    await hardhatToken.deployed();

    return { HelloWorld, hardhatToken, owner, addr1, addr2 };
  }

  it("Call Hello", async function () {
    const { hardhatToken } = await loadFixture(deployHelloWorldFixture);

    expect(await hardhatToken.Hello()).to.equal("Hello World!");
  });
});
