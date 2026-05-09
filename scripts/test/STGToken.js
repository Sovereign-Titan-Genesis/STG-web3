const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("STGToken", function () {
  let Token, token, owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    Token = await ethers.getContractFactory("STGToken");
    token = await Token.deploy();
    await token.waitForDeployment();
  });

  it("Should assign total supply to owner", async function () {
    const ownerBalance = await token.balanceOf(owner.address);
    expect(await token.totalSupply()).to.equal(ownerBalance);
  });

  it("Should transfer tokens between accounts", async function () {
    await token.transfer(addr1.address, 100);
    const addr1Balance = await token.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(100);
  });

  it("Should fail if sender doesn’t have enough tokens", async function () {
    const initialOwnerBalance = await token.balanceOf(owner.address);
    await expect(
      token.connect(addr1).transfer(owner.address, 1)
    ).to.be.revertedWith("ERC20: transfer amount exceeds balance");

    expect(await token.balanceOf(owner.address)).to.equal(initialOwnerBalance);
  });
});
