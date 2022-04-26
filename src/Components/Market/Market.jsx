/*
This is going to be a long one

some notes to keep me organized

across top: Buy/sell slider, search, token filter, refresh button 

auto sort by lowest price in given token. Sort by USD will come later.

SELL PAGE

1. loop through all of users nfts
2. display each nft in grid layout
3. on click open modal with info and set price ect layout
4. send transaction with said state. 
5. This will be done through another component.

BUY PAGE

1. iterate through all listings.
2. display all listings given said listing details.
3. On purchase send transaction to metamask to purchase the listing.
4. Make sure filters work

*/

import React, { Component } from "react";
import "../../Css/Fonts.css";
import ListComponent from "./ListComponent";
import MarketComponent from "./MarketComponent";
import bitcoin from "../../Images/bitcoin.png";
import eth from "../../Images/eth.png";
import polygon from "../../Images/polygon.png";
import usdc from "../../Images/usdc.png";

class Market extends Component {

  state = {
    PageSide: true,
    isListOpen: false,
    listTokenId: "-1",
    listTokenText: "On Sale In",
    listTokenImg: bitcoin,
    reload: true,
  };
  


  render() {
    console.log(this.state.listTokenId)
    return (
      <div className="bg-gray pt-24 pb-24">
        <div className="flex justify-between flex-wrap">
            <div className="flex">
          <input
            className="text-off-black ml-16 rounded-2xl pt-2 pb-2 pl-4 pr-36 font1 self-start	"
            placeholder="Search (Coming Soon)"
          ></input>
          <div>
            <div className="">
          <div className={this.state.PageSide ? "ml-8 bg-off-black text-blue absolute rounded-2xl pt-2 pb-2 pl-4 pr-4 text-center font1 justify-items-start self-start"  : "hidden" }>
            
            <div
                    className={this.state.isListOpen ? "hidden" : "cursor-pointer flex"}
                    onClick={() =>
                      this.setState({ isListOpen: !this.state.isListOpen })
                    }
                  >
                    <img alt="" className={this.state.listTokenId === "-1" ? "hidden" : "h-6 w-6"} src={this.state.listTokenImg}></img>
                    <h1 className="self-center ml-3">{this.state.listTokenText} </h1>
                    <i className="fa fa-angle-down ml-3 text-2xl self-center"></i>
                  </div>
                  <div className={this.state.isListOpen ? "block " : "hidden"}>
                    <div
                      onClick={async () => {
                        await this.setState({PageSide: !this.state.PageSide})
                        this.setState({ isListOpen: !this.state.isListOpen });
                        this.setState({ listTokenId: 1 });
                        this.setState({ listTokenText: "Gold" });
                        this.setState({ listTokenImg: bitcoin });
                        await this.setState({PageSide: !this.state.PageSide})
                      }}
                      className="mt-4 m-auto text-center flex self-center cursor-pointer"
                    >
                      <img alt="" className="h-6 w-6" src={bitcoin}></img>
                      <div className="ml-3 self-center">Gold</div>
                    </div>

                    <div
                      onClick={async () => {
                        await this.setState({PageSide: !this.state.PageSide})
                        this.setState({ isListOpen: !this.state.isListOpen });
                        this.setState({ listTokenId: 0 });
                        this.setState({ listTokenText: "Polygon" });
                        this.setState({ listTokenImg: polygon });
                        await this.setState({PageSide: !this.state.PageSide})
                      }}
                      className="mt-4 m-auto text-center flex self-center cursor-pointer"
                    >
                      <img alt="" className="h-6 w-6" src={polygon}></img>
                      <div className="self-center ml-3">Polygon</div>
                    </div>

                    <div
                      onClick={async () => {
                        await this.setState({PageSide: !this.state.PageSide})
                        this.setState({ isListOpen: !this.state.isListOpen });
                        this.setState({ listTokenId: 2});
                        this.setState({ listTokenText: "Ethereum" });
                        this.setState({ listTokenImg: eth });
                        await this.setState({PageSide: !this.state.PageSide})
                      }}
                      className="mt-4 m-auto text-center flex self-center cursor-pointer"
                    >
                      <img alt="" className="h-6 w-6" src={eth}></img>
                      <div className="self-center ml-3">Ethereum</div>
                    </div>

                    <div
                      onClick={async () => {
                        await this.setState({PageSide: !this.state.PageSide})
                        this.setState({ isListOpen: !this.state.isListOpen });
                        this.setState({ listTokenId: 3 });
                        this.setState({ listTokenText: "USDC" });
                        this.setState({ listTokenImg: usdc });
                        await this.setState({PageSide: !this.state.PageSide})
                      }}
                      className="mt-4 m-auto text-center flex self-center cursor-pointer"
                    >
                      <img alt="" className="h-6 w-6" src={usdc}></img>
                      <div className="self-center ml-3">USDC</div>
                    </div>
                    </div>
                  
          </div>
            </div>
            </div>
            </div>
          <div className="text-off-black bg-blue rounded-2xl pt-2 pb-2 pl-4 pr-4 text-center font1 grid justify-items-end mr-16 self-start">
            <button onClick={() => this.setState({PageSide: !this.state.PageSide})}>{this.state.PageSide ? "My Heroes" : "Market"}</button>
          </div>
        </div>
        {this.state.PageSide ? <div><MarketComponent selectedToken={this.state.listTokenId}/></div> : <ListComponent/>}

      </div>
    );
  }
}

export default Market;
