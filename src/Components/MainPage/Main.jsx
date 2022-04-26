import React, { Component } from "react";
import "../../Css/Fonts.css";
import door from "../../Images/door.png";
import {UseGoldContract, UseNftContract} from "../../Hooks/UseContractInstance"
import {DungeonContract} from "../../Config/Web3Config"
import Web3 from "web3";

class Main extends Component {

  

  state = {GoldTotalMinted: 0, GoldTotalBurned: 0, CirculatingSupply: 0, NftMinted: 0, NftBurned: 0}

  async componentDidMount(){
    const TotalMinted = await UseGoldContract.methods.totalSupply().call()
    const address0Amount = await UseGoldContract.methods.balanceOf('0x0000000000000000000000000000000000000000').call();
    const dungeonAmount = await UseGoldContract.methods.balanceOf(DungeonContract).call();
    const NftMinted = await UseNftContract.methods.totalSupply().call();   
    const NftBurned = await UseNftContract.methods.balanceOf(DungeonContract).call();
    const GoldTotalBurned = await Number(address0Amount) + await Number(dungeonAmount)
    const CirculatingSupply = await Number(TotalMinted) - await Number(GoldTotalBurned)

    //to ether

    const web3 = new Web3("https://rpc-mumbai.matic.today")

    const TotalMintedEther =  await web3.utils.fromWei( TotalMinted,'ether')
    const TotalBurnedEther = await web3.utils.fromWei( String(GoldTotalBurned),'ether')
    const TotalCirculatingEther = await web3.utils.fromWei( String(CirculatingSupply),'ether')

    console.log(NftMinted)
    console.log(NftBurned)

    this.setState({TotalMintedEther,  GoldTotalBurned: TotalBurnedEther, TotalCirculatingEther, NftMinted, NftBurned });
  };

    

  render() {
    console.log(this.state.NftBurned)
    console.log(this.state.NftMinted)
    return (
      <div>
        <div className="flex justify-between bg-blue pt-24 pb-24">
          <div className="grid xl:flex ml-16 mr-16  lg:ml-52 lg:mr-52 ">
            <div className="m-auto text-center -mr-8">
              <div className="font1 text-6xl text-off-black text-center grid">
                PolyHeroes
              </div>
              <div className="font1 text-2xl text-white text-center mt-4">
                A brand new blockchain exprience...
              </div>
              <div className="bg-blue grid grid-cols-2 mt-4 mb-4 gap-2">
                <a
                  href="https://discord"
                  className="bg-off-black rounded-xl p-2 text-lg text-white font1 text-center "
                >
                  Join Discord
                </a>
                <a
                  href="https://discord"
                  className="bg-off-black rounded-xl p-2 text-lg text-white font1 text-center "
                >
                  Whitepaper
                </a>
              </div>
              <div className="font1 text-white text-center">
                Built ontop of the Polygon blockchain, we aim to deliver gameplay
                to our holders which allows players to earn while playing.
              </div>
            </div>
            <div className="m-auto w-100 h-100 xl:ml-8 xl:mr-8 mt-8 xl:mt-0 text-center">
              <img src={door} alt=""></img>
            </div>
          </div>
        </div>
        <div className="bg-off-black text-center pt-16 pb-24">
          <h1 className="text-blue text-6xl font1 mb-8">What are PolyHeros</h1>
          <div className="flex font1 grid xl:grid-cols-3">
            <div className="mb-6 xl:mb-0">
              <h1 className="text-white text-2xl font1">
                A Set of 20,000 NFTs
              </h1>
              <div className="bg-off-black border-blue mt-8 border-8 ml-24 mr-24 rounded-2xl">
                {" "}
                <div className="mt-4 mb-4 mr-4 ml-4 text-white text-2xl font1">
                  Polyheroes are a set of 20,000 NFTs that represent characters
                  inside the PolyHero game. However, if they die their death
                  is permanent.
                </div>
              </div>
            </div>
            <div className="mb-6 xl:mb-0">
              <h1 className="text-white text-2xl font1">$Gold Utility Coin</h1>
              <div className="bg-off-black border-blue mt-8 border-8 ml-24 mr-24 rounded-2xl">
                {" "}
                <div className="mt-4 mb-4 mr-4 ml-4 text-white text-2xl font1">
                  The Polyhero game revolves around the gold token. Heros
                  earn gold on quest which can be used to hire new heros or make
                  purchases in the marketplace.
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-white text-2xl font1">Play to Earn</h1>
              <div className="bg-off-black border-blue mt-8 border-8 ml-24 mr-24 rounded-2xl">
                {" "}
                <div className="mt-4 mb-4 mr-4 ml-4 text-white text-2xl font1">
                  Use your polyheros NFTs to explore dungeons and earn gold,
                  however, if your character dies they will be lost forever.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue text-center grid pt-16 pb-24">
          <h1 className="text-gold text-6xl font1 mb-8">Hero Stats</h1>
          <div className="flex font1 grid xl:grid-cols-2">
            <div className="mb-6 xl:mb-0">
              <h1 className="text-white text-2xl font1">
                Ammount of Heros Minted
              </h1>
              <div className="mt-4 ml-52 mr-52 xl:ml-72 xl:mr-72 p-4 bg-off-black rounded-2xl text-white text-xl font1">
              {this.state.NftMinted}/20,000
              </div>
            </div>
            <div className="mb-6 xl:mb-0">
              <h1 className="text-white text-2xl font1">
                Ammount of Heros Burned
              </h1>
              <div className="mt-4 ml-52 mr-52 xl:ml-72 xl:mr-72 p-4 bg-off-black rounded-2xl text-white text-xl font1">
              {this.state.NftBurned}/20,000
              </div>
            </div>
          </div>
        </div>

        <div className="bg-off-black text-center grid pt-16 pb-24">
        <h1 className="text-gold text-6xl font1 mb-8">Gold Stats</h1>
          <div className="flex font1 grid xl:grid-cols-3">
            <div className="mb-6 xl:mb-0">
              <h1 className="text-white text-2xl font1">
                Ammount of Gold Minted
              </h1>
              <div className="mt-4 ml-52 mr-52 p-4 bg-gold rounded-2xl text-white text-xl font1">
                {Math.round(Number(this.state.TotalMintedEther ) * 100 ) / 100}
              </div>
            </div>
            <div className="mb-6 xl:mb-0">
              <h1 className="text-white text-2xl font1">
                Ammount of Gold Burned
              </h1>
              <div className="mt-4 ml-52 mr-52 p-4 bg-gold rounded-2xl text-white text-xl font1">
                {Math.round(Number(this.state.GoldTotalBurned) * 100 ) / 100}
              </div>
            </div>
            <div className="mb-6 xl:mb-0">
              <h1 className="text-white text-2xl font1">
                Circulating Gold Supply
              </h1>
              <div className="mt-4 ml-52 mr-52 p-4 bg-gold rounded-2xl text-white text-xl font1">
              {Math.round(Number(this.state.TotalCirculatingEther) * 100 ) / 100}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-blue text-center pt-16 pb-24">
          <h1 className="text-Off-Black text-6xl font1 mb-8">The Team</h1>
          <div className="flex font1 grid">
            <div className="mb-6 xl:mb-0">
              <h1 className="text-white text-2xl font1">
                0xDog
              </h1>
              <div className="bg-blue border-Off-black mt-8 border-8 ml-24 mr-24 rounded-2xl">
                {" "}
                <div className="mt-4 mb-4 mr-4 ml-4 text-white text-2xl font1">
                  A experienced blockchain developer who has been working with creating game smart contracts. He has developed the contracts and frontend for this project.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
