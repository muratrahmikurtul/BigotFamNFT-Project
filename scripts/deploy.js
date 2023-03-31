const hre = require("hardhat");

async function main() {
  const BigotFamNFT = await hre.ethers.getContractFactory("BigotFamNFT");
  const bigotFamNFT = await BigotFamNFT.deploy();

  await bigotFamNFT.deployed();

  console.log("BigotFamNFT deployed to: ", bigotFamNFT.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
