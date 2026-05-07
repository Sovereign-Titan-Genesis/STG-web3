const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("STGToken", function () {
  let Token, token, owner, user1, user2;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();
    Token = await ethers.getContractFactory("STGToken");
    token = await Token.deploy();
    await token.waitForDeployment();
  });

  it("Owner should have initial supply", async function () {
    const ownerBalance = await token.balanceOf(owner.address);
    expect(await token.totalSupply()).to.equal(ownerBalance);
  });

  it("Should transfer tokens between accounts", async function () {
    // Transfer 50 tokens from owner to user1
    await token.transfer(user1.address, 50);
    expect(await token.balanceOf(user1.address)).to.equal(50);

    // Transfer 20 tokens from user1 to user2
    await token.connect(user1).transfer(user2.address, 20);
    expect(await token.balanceOf(user2.address)).to.equal(20);
  });

  it("Should fail if sender doesn’t have enough tokens", async function () {
    const initialOwnerBalance = await token.balanceOf(owner.address);
    // Try to send more tokens than available
    await expect(
      token.connect(user1).transfer(owner.address, 1)
    ).to.be.revertedWith("ERC20: transfer amount exceeds balance");

    // Owner balance should not change
    expect(await token.balanceOf(owner.address)).to.equal(initialOwnerBalance);
  });
});
