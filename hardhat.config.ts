import "dotenv/config";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy-ethers";

import { HardhatUserConfig } from "hardhat/types";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.13",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {},
    cypress: {
      url: process.env.CYPRESS_URL,
      accounts: [process.env.PRIVATE_KEY || ""],
      chainId: 8217,
      gas: 8500000,
    },
    baobab: {
      url: process.env.BAOBAB_URL,
      accounts: [process.env.PRIVATE_KEY || ""],
      chainId: 1001,
      gas: 8500000,
    },
  },
  mocha: {
    timeout: 100000,
  },
};

export default config;
