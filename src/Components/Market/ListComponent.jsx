// reminder set approval in contract with nft automatic


import React, { Component } from "react";
import { UseNftContract } from "../../Hooks/UseContractInstance";
import { GetAddress } from "../../Hooks/UseWeb3";
import "../../Css/Fonts.css";
import bitcoin from "../../Images/bitcoin.png";
import eth from "../../Images/eth.png";
import polygon from "../../Images/polygon.png";
import usdc from "../../Images/usdc.png";
import Web3 from "web3";
import { sendTransaction } from "../../Hooks/SendTransaction";
import {NftContract } from "../../Config/Web3Config";

class ListComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      OwnedAssets: [],
      isModalOpen: false,
      modalTokenId: 0,
      isListOpen: false,
      listTokenId: -1,
      listTokenText: "Select Token",
      listTokenImg: bitcoin
    };
  }

  async componentDidMount () {
    const user = await GetAddress();
    if (user) {
      const balanceOf = await UseNftContract.methods.balanceOf(user).call();
      const listOfAssets = [];
      for (let i = 0; i < balanceOf; i++) {
        const tokenId = await UseNftContract.methods
          .tokenOfOwnerByIndex(user, i)
          .call();
        listOfAssets.push(tokenId);
      }
      this.Modal = this.Modal.bind(this);
      this.setState({ OwnedAssets: listOfAssets });
    }
  }

  async createListing (tokenIdNFT, listingTokenId) {
    const web3 = new Web3("https://rpc-mumbai.matic.today");
    const listPrice = web3.utils.toWei(String(document.getElementById("listPriceInput").value), 'ether')
    console.log(listPrice)
    const tokenId = tokenIdNFT;
    console.log(tokenId)
    const listTokenId = listingTokenId
    console.log(listTokenId)
    const toAddress = NftContract;
    const data = web3.eth.abi.encodeFunctionCall({
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_price",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_purchaseTokenId",
          "type": "uint256"
        }
      ],
      "name": "createListing",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }, [listPrice, tokenId, listTokenId]);

    await sendTransaction(String(0), toAddress, data);
  }

  async removeListing (tokenId) {
    const web3 = new Web3("https://rpc-mumbai.matic.today");
    const toAddress = NftContract;
    const data = web3.eth.abi.encodeFunctionCall({
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "removeListing",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }, [tokenId]);

    await sendTransaction(String(0), toAddress, data);
  }

  async Modal(_tokenId) {
    let isModalOpen = true;
    let tokenId = _tokenId;
    this.setState({ isModalOpen: isModalOpen });
    this.setState({ modalTokenId: tokenId });
  }

  render() {
    console.log(this.state.isModalOpen);
    return (
      <div>
        {" "}
        <div
          className={
            this.state.OwnedAssets.length === 0
              ? "hidden"
              : "mt-8 inline-flex flex-wrap justify-center w-100 m-auto"
          }
        >
          {" "}
          {this.state.OwnedAssets.map((OwnedAsset) => (
            <div className=" inline-block bg-off-black m-2 pt-2 pb-2 pl-4 pr-4">
              <h1 className="text-center text-white mt-4 text-2xl font2">
                PolyHero {OwnedAsset}
              </h1>{" "}
              <img
                className="m-auto mt-4"
                alt=""
                src={
                  "https://gateway.pinata.cloud/ipfs/QmcY81TBoc8fKZCFToqER5SAxPmsRSuYYTgLtJi8Z1sAUt/" +
                  OwnedAsset +
                  ".png"
                }
              ></img>{" "}
              <div
                onClick={() => this.Modal(OwnedAsset)}
                className=" cursor-pointer text-center text-off-black rounded-2xl text-xl font2 bg-blue mb-4 mt-4 ml-24 mr-24"
              >
                Sell
              </div>
              <div
                onClick={() => this.removeListing(OwnedAsset)}
                className=" cursor-pointer text-center text-off-black rounded-2xl text-xl font2 bg-blue mb-4 mt-4 ml-16 mr-16"
              >
                Remove Listing
              </div>
            </div>
          ))}
        </div>{" "}
        <div
          className={
            this.state.OwnedAssets.length === 0
              ? "text-white text-4xl font2 pt-52 pb-52 text-center"
              : "hidden"
          }
        >
          You Own No Heroes
        </div>{" "}
        <div
          className={
            this.state.isModalOpen === true
              ? "fixed h-5/6 w-3/4 m-auto inset-x-0 inset-y-0 p-4 bg-off-black rounded-2xl flex justify-center"
              : "hidden"
          }
        >
         
          <div className="grid">
            <div className="flex mt-12">
              <div className="grid">
                <h1 className="text-white text-center font2 text-4xl">
                  PolyHero #{this.state.modalTokenId}
                </h1>
                <div className="m-auto mt-12">
            {" "}
            <img
              className=" border-8 rounded-2xl border-gray h-96 w-96"
              alt=""
              src={
                "https://gateway.pinata.cloud/ipfs/QmcY81TBoc8fKZCFToqER5SAxPmsRSuYYTgLtJi8Z1sAUt/" +
                this.state.modalTokenId +
                ".png"
              }
            ></img>{" "}
          </div>
                <input
                  id="listPriceInput"
                  placeholder="Price"
                  className={this.state.isListOpen ? "text-off-black text-center m-auto text-4xl font2" : "text-off-black text-center m-auto text-4xl font2 "}
                ></input>
                <div className={this.state.isListOpen ? "bg-gray rounded-2xl font2 pl-8 pr-8 pt-4 pb-4 m-auto text-center text-xl text-white grid -mb-12" : "bg-gray rounded-2xl font2 pl-8 pr-8 pt-4 pb-4 m-auto text-center text-xl text-white grid mt-2"}>
                  <div
                    className={this.state.isListOpen ? "hidden" : "cursor-pointer flex"}
                    onClick={() =>
                      this.setState({ isListOpen: !this.state.isListOpen })
                    }
                  >
                    <img alt="" className={this.state.listTokenId === -1 ? "hidden" : "h-12 w-12"} src={this.state.listTokenImg}></img>
                    <h1 className="mt-2 ml-3">{this.state.listTokenText} </h1>
                  </div>
                  <div className={this.state.isListOpen ? "block" : "hidden"}>
                    <div
                      onClick={() => {
                        this.setState({ isListOpen: !this.state.isListOpen });
                        this.setState({ listTokenId: 1 });
                        this.setState({ listTokenText: "Gold" });
                        this.setState({ listTokenImg: bitcoin });
                      }}
                      className="mt-4 m-auto text-center flex cursor-pointer"
                    >
                      <img alt="" className="h-12 w-12" src={bitcoin}></img>
                      <div className="mt-2 ml-3">Gold</div>
                    </div>

                    <div
                      onClick={() => {
                        this.setState({ isListOpen: !this.state.isListOpen });
                        this.setState({ listTokenId: 0 });
                        this.setState({ listTokenText: "Polygon" });
                        this.setState({ listTokenImg: polygon });
                      }}
                      className="mt-4 m-auto text-center flex cursor-pointer"
                    >
                      <img alt="" className="h-12 w-12" src={polygon}></img>
                      <div className="mt-2 ml-3">Matic</div>
                    </div>

                    <div
                      onClick={() => {
                        this.setState({ isListOpen: !this.state.isListOpen });
                        this.setState({ listTokenId: 2 });
                        this.setState({ listTokenText: "Ethereum" });
                        this.setState({ listTokenImg: eth });
                      }}
                      className="mt-4 m-auto text-center flex cursor-pointer"
                    >
                      <img alt="" className="h-12 w-12" src={eth}></img>
                      <div className="mt-2 ml-3">Ethereum</div>
                    </div>

                    <div
                      onClick={() => {
                        this.setState({ isListOpen: !this.state.isListOpen });
                        this.setState({ listTokenId: 3 });
                        this.setState({ listTokenText: "USDC" });
                        this.setState({ listTokenImg: usdc });
                      }}
                      className="mt-4 m-auto text-center flex cursor-pointer"
                    >
                      <img alt="" className="h-12 w-12" src={usdc}></img>
                      <div className="mt-2 ml-3">USDC</div>
                    </div>

                  </div>
                </div>
                <button onClick = {() => this.createListing(this.state.modalTokenId, this.state.listTokenId)} className={this.state.isListOpen ? "hidden" : " rounded-2xl bg-blue pt-4 pb-4 pr-8 pl-8 font2 text-xl m-auto mt-2"}>List</button>
              </div>
              <i
                onClick={() => this.setState({ isModalOpen: false })}
                className="fa fa-close cursor-pointer text-white text-6xl text-right  -mt-3"
              ></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListComponent;
