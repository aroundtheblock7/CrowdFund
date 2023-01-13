const { expect, assert } = require('chai');
const { ethers } = require("hardhat");
const { BigNumber } = require("@ethersproject/bignumber");


describe('Token Contract()', () => {
    let CrowdFund, crowdfund, CrowdCoin, crowdcoin, owner, addr1, addr2;



    beforeEach(async () => {
        CrowdCoin = await ethers.getContractFactory("CrowdCoin");
        crowdcoin = await CrowdCoin.deploy();
        CrowdFund = await ethers.getContractFactory("CrowdFund");
        crowdfund = await CrowdFund.deploy(crowdcoin.address);

        [owner, addr1, addr2, _] = await ethers.getSigners();
    })

    describe('Deployment', () => {
        it('Should set the right owner', async () => {
            expect(await crowdfund.owner()).to.equal(owner.address);
         });

         it('Should allow addr1 to mint 25 crowdcoin tokens', async () => {
         await crowdcoin.connect(addr1).mint("25");
         expect(await crowdcoin.balanceOf(addr1.address)).to.equal(25);
        });

        it("Should allow under to launch a project", async () => {
            console.log(((new Date().getTime()/1000).toString()));
            const a = Math.floor(Number((new Date().getTime()/1000).toString()));
            const b = Math.floor(Number(((new Date().getTime()/1000) + 100).toString()));
            //console.log(a);
            //console.log(b);
            const abig =  new BigNumber.from(a);
            const bbig =  new BigNumber.from(b);
            //console.log(abig);
            //console.log(bbig);
            const BigToNumba = Number(abig);
            const BigToNumbb = Number(bbig);
            console.log(BigToNumba);
            console.log(BigToNumbb);
            const ONE_ETHER = ethers.utils.parseEther("1");
            //const ONE_CONVERT =  new BigNumber.from(ONE_ETHER);
            const ONE_RIGHT = ethers.utils.formatEther(ONE_ETHER)
            const ONE_NUMBER = Number(ONE_RIGHT);
            //const ONE_BIGTONUMB = Number(ONE_CONVERT);
            console.log(ONE_NUMBER);
            //console.log(await crowdfund.campaigns(0));
            await crowdfund.connect(owner).launch(ethers.utils.parseEther("100"), BigToNumba, BigToNumbb);
            console.log(crowdfund.count);
            
            //setTimeout((crowdfund.connect(owner).launch(ONE_ETHER, abig, bbig)), 11);
            console.log(await crowdfund.campaigns(1));
            expect(await crowdfund.count()).to.equal("1");
            
          });

        it("Should allow addr1 to pledge tokens to campaign", async () => {
            await crowdcoin.connect(addr1).approve(crowdfund.address, "15");
            await crowdcoin.transferFrom(addr1.address, crowdfund.address, "15");
            await crowdfund.connect(addr1).pledge(1, 15);
            
            const balance = await crowdfund.campaigns(1).pledged;
            expect(ethers.utils.parseEther(balance) == "15")

            //expect(await (crowdfund.campaigns(1).pledged).to.equal(ethers.utils.formatEther(15)));
        //     const pledgedAmount = await crowdfund.campaigns(1).pledged;
        //     await assert.equal(funder, deployer.address);
        //     //
        });
    });
});