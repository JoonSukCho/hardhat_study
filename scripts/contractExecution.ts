import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import { ethers } from "hardhat";

async function main() {
  // 컨트랙트 불러오기
  const Token = await ethers.getContractFactory("Token");
  const token = Token.attach("0xe03ABC340eD46487c6e3225Bb7E72B7A24F99460");

  const result = await token.transfer(
    "0x9810474715F389848B630085899FF03eAC8AC31a",
    50
  );
  console.log(result);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
