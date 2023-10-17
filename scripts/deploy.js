// Run with `npx hardhat run <script>`.
// Hardhat will compile your contracts, add the Hardhat Runtime Environment's
// members to the global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  console.log('\n\n\nDeploying BestPetPoll contract...\n')

  const bestPetPoll = await hre.ethers.deployContract("BestPetPoll")
  await bestPetPoll.waitForDeployment();

  console.log(`\nBestPetPoll deployed to: ${bestPetPoll.target}\n`)

  console.log("\nDone.\n");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
