import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect, should } from "chai";

describe("Events", function () {
  async function deployEventsFixture() {
    const Events = await ethers.getContractFactory("Events");
    const [owner, addr1, addr2] = await ethers.getSigners();

    const hardhatToken = await Events.deploy();

    await hardhatToken.deployed();

    return { Events, hardhatToken, owner, addr1, addr2 };
  }

  it("Call logTest", async function () {
    const { hardhatToken } = await loadFixture(deployEventsFixture);

    await expect(hardhatToken.burn(100)).to.emit(hardhatToken, "burned");
  });
});
