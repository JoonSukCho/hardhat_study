import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import { config, ethers } from "hardhat";
import { HttpNetworkUserConfig } from "hardhat/src/types/config";
import Caver from "caver-js";

async function main() {
  // network 셋팅 및 caver 연결
  const network = config.networks[
    process.env.HARDHAT_NETWORK as string
  ] as HttpNetworkUserConfig;

  const caver = new Caver(
    new Caver.providers.HttpProvider(network.url!, {
      headers: [{ name: "x-chain-id", value: network.chainId!.toString() }],
    })
  );

  // Keyring 생성 및 인메모리 지갑 등록
  const keyring = caver.wallet.keyring.createFromPrivateKey(
    process.env.PRIVATE_KEY!
  );
  caver.wallet.add(keyring);

  // 컨트랙트 불러오기
  const Token = await ethers.getContractFactory("Token");
  const jsonData = require("../artifacts/contracts/Token.sol/Token.json");
  const { abi } = jsonData;
  const abiData = Token.interface.functions;

  const contractInstance = new caver.contract(abi);

  // Transaction 전송
  console.log("Deploying contracts with the account:", keyring.address);

  const result = await contractInstance
    .deploy({
      data: Token.bytecode,
    })
    .send(
      {
        from: keyring.address,
        gas: 50000000,
      },
      (error, transactionHash) => {
        console.log(error);
        console.log(transactionHash);
      }
    );
  console.log(result);
  /** 
   * caver ~ 1.4.1
  // keyring 생성 및 인메모리 지갑 등록
  const keyring = caver.klay.accounts.privateKeyToAccount(
    process.env.PRIVATE_KEY!
  );
  caver.klay.accounts.wallet.add(keyring);
  
  // 트랜잭션 전송
  const transaction = await caver.klay.sendTransaction({
    type: "SMART_CONTRACT_DEPLOY",
    from: keyring.address,
    data: Token.bytecode, // bytecode
    gas: "50000000",
    value: 0,
  });
  */
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
