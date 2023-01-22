const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

// Global constants for listing an item...
const ID = 1
const NAME = "Shoes"
const CATEGORY = "Clothing"
const IMAGE = "https://ipfs.io/ipfs/QmTYEboq8raiBs7GTUg2yLXB3PMz6HuBNgNfSZBx5Msztg/shoes.jpg"
const COST = tokens(1)
const RATING = 4
const STOCK = 5

describe("Mundo", function () {
  let mundo
  let deployer, buyer
  this.beforeEach(async()=>{
    // set accounts
    [deployer,buyer] = await ethers.getSigners();

    // Deploy the contract
    const Mundo = await ethers.getContractFactory('Mundo')
    mundo = await Mundo.deploy();

  })
  describe("Deployment", function () {
   it('it set the owner', async()=>{
      expect( await mundo.owner()).to.equal(deployer.address);
   })
  });
  describe('list product',()=>{
    beforeEach(async () => {
      // List a product
      transaction = await mundo.connect(deployer).list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK)
      await transaction.wait()
    })
    it("Returns item attributes", async () => {
      const item = await mundo.items(ID)

      expect(item.id).to.equal(ID)
      expect(item.name).to.equal(NAME)
      expect(item.category).to.equal(CATEGORY)
      expect(item.image).to.equal(IMAGE)
      expect(item.cost).to.equal(COST)
      expect(item.rating).to.equal(RATING)
      expect(item.stock).to.equal(STOCK)
    })

    it("Emits List event", () => {
      expect(transaction).to.emit(mundo, "List")
    })
  })

  describe('buys product',()=>{
    let tx;
    beforeEach(async()=>{
      // list product
      tx  = await mundo.connect(deployer).list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK)
      await tx.wait()

      // buy product
      const buy = await mundo.connect(buyer).buy(ID, { value: COST })
      await buy.wait()
   })

   it("Updates buyer's order count", async () => {
    const result = await mundo.orderCount(buyer.address)
    expect(result).to.equal(1)
  })

  it("Adds the order", async () => {
    const order = await mundo.orders(buyer.address, 1)

    expect(order.time).to.be.greaterThan(0)
    expect(order.item.name).to.equal(NAME)
  })

  it("Updates the contract balance", async () => {
    const result = await ethers.provider.getBalance(mundo.address)
    expect(result).to.equal(COST)
  })

  it("Emits Buy event", () => {
    expect(transaction).to.emit(mundo, "Buy")
  })

  })
  describe("Withdrawing", () => {
    let balanceBefore

    beforeEach(async () => {
      // List a item
      let transaction = await mundo.connect(deployer).list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK)
      await transaction.wait()

      // Buy a item
      transaction = await mundo.connect(buyer).buy(ID, { value: COST })
      await transaction.wait()

      // Get Deployer balance before
      balanceBefore = await ethers.provider.getBalance(deployer.address)

      // Withdraw
      transaction = await mundo.connect(deployer).withdraw()
      await transaction.wait()
    })

    it('Updates the owner balance', async () => {
      const balanceAfter = await ethers.provider.getBalance(deployer.address)
      expect(balanceAfter).to.be.greaterThan(balanceBefore)
    })

    it('Updates the contract balance', async () => {
      const result = await ethers.provider.getBalance(mundo.address)
      expect(result).to.equal(0)
    })
  })
})