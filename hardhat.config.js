require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

require('dotenv').config()

const GOERLI_RPC_URL =process.env.GOERLI_RPC_URL;
const DEPLOYER_KEY =process.env.DEPLOYER_KEY 

module.exports = {
   networks: {
    localhost: {
      url: 'http://127.0.0.1:8545',
    },
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [DEPLOYER_KEY],
      chainId: 5,
    }
  },
  solidity: "0.8.17",
};
