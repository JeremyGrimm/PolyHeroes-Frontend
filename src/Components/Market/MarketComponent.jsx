import React, { Component } from "react";
import { UseNftContract, UseGoldContract, UseUSDCContract, UseWETHContract } from "../../Hooks/UseContractInstance";
import {NftContract, GoldContract, USDCContract,WETHContract   } from "../../Config/Web3Config";
import { sendTransaction } from "../../Hooks/SendTransaction";
import Web3 from "web3";
import {GetAddress} from "../../Hooks/UseWeb3"

class MarketComponrnt extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ListedAssets: [],
      OwnedAssets: [],
      allowance1: 0,
      allowance2: 0,
      allowance3: 0,
    };
  }

  async componentDidMount() {

    const getAllNftAssets = await UseNftContract.methods.getNftAddress().call()
    const nftsForSale = [...new Set(getAllNftAssets)];

    for (let i = 0; i < nftsForSale.length; i++) {
      if(nftsForSale[i] === "0") {
        nftsForSale.splice(i, 1);
        i--;
      }
    }

    let listings = [];

    for(let i = 0; i < nftsForSale.length; i++) {
    const listDetail = await UseNftContract.methods.list(nftsForSale[i]).call();
    listDetail.tokenId = nftsForSale[i];
    if (listDetail.isForSale) {
      if (String(this.props.selectedToken) === "-1") {
        
        listings.push(listDetail);
      } else if (listDetail.purchaseTokenId === String(this.props.selectedToken)) {
        listings.push(listDetail);
        console.log("pushed by token")
      }
    }
  }

  listings.sort((a, b) => {
    return a.price - b.price;
});

  const Account = await GetAddress()

  if(Account) {
  const goldApproved = Web3.utils.fromWei(await UseGoldContract.methods.allowance(Account, NftContract).call(), 'ether')
  const wethApproved = Web3.utils.fromWei(await UseWETHContract.methods.allowance(Account, NftContract).call(), 'ether')
  const usdcApproved = Web3.utils.fromWei(await UseUSDCContract.methods.allowance(Account, NftContract).call(), 'ether')
  
  this.setState({ allowance1: goldApproved });
  this.setState({ allowance2: wethApproved });
  this.setState({ allowance3: usdcApproved });
  }
  this.setState({ OwnedAssets: listings });
  this.setState({ ListedAssets: nftsForSale });
  }

  async purchase (tokenId, purchaseTokenId, price) {
    if (purchaseTokenId === "0") {
      let web3 = new Web3("https://rpc-mumbai.matic.today")
      const value = price;
      const toAddress = NftContract;
      const data = web3.eth.abi.encodeFunctionCall({
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256"
            }
          ],
          "name": "buyNFTMatic",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        }, [tokenId]);

      await sendTransaction(String(value), toAddress, data);
    } else {
      let web3 = new Web3("https://rpc-mumbai.matic.today")
      const toAddress = NftContract;
      const data = web3.eth.abi.encodeFunctionCall(	{
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
          }
        ],
        "name": "buyNFTWithToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }, [tokenId]);

        await sendTransaction(String(0), toAddress, data);
    }
  }

  async Approval (Erc20TokenId) {
    let web3 = new Web3("https://rpc-mumbai.matic.today")
    let toAddress;
    switch(Erc20TokenId) {
    case "1":
    toAddress = GoldContract;
    break;
    case "2":
    toAddress = WETHContract;
    break;
    case "3":
    toAddress = USDCContract;
    break;
    default:
    toAddress = "lawl"
    }
    const data = web3.eth.abi.encodeFunctionCall(	{
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }, [NftContract, web3.utils.toWei('2000000000', 'ether')]);

    await sendTransaction(String(0), toAddress, data);
  }

  render() {
    
    return (
      <div>
        <div className={this.state.OwnedAssets.length > 0 ? "block" : "hidden"}>
        {" "}
        <div className="mt-8 flex flex-wrap justify-center w-100 m-auto">
          {" "}
          {this.state.OwnedAssets.map((asset, id) => (
            <div className="inline-block bg-off-black m-2 pt-2 pb-2 pl-4 pr-4">
              <h1  className="text-center text-white mt-4 text-2xl font2">
                PolyHero {asset.tokenId}
              </h1>{" "}
              <img
                className="m-auto mt-4"
                alt=""
                src={
                  "https://gateway.pinata.cloud/ipfs/QmcY81TBoc8fKZCFToqER5SAxPmsRSuYYTgLtJi8Z1sAUt/" +
                  asset.tokenId +
                  ".png"
                }
              ></img>{" "}
              <div className="flex mt-4 justify-center">
                {" "}
                <h1 className="font2 text-white text-xl mr-2 mt-0.5">
                  Price:
                </h1>{" "}
                <img
                  className="h-8 ml-2 mr-1"
                  alt=""
                  src={"https://gateway.pinata.cloud/ipfs/QmYnDPuHPMFwejTxD31ZJsGSSGr5y9UACqgE99VPBqoRXB/" + asset.purchaseTokenId + ".png"}
                ></img>{" "}
                <h1 className="font2 text-white text-xl mt-0.5 ml-1">
                  {Web3.utils.fromWei(asset.price, "ether")}
                </h1>{" "}
              </div>
              <div onClick={asset.purchaseTokenId === "0" ? () => this.purchase(asset.tokenId, asset.purchaseTokenId, Web3.utils.fromWei(asset.price, "ether"))  : this.state["allowance" + asset.purchaseTokenId] > 20000 ? () => this.purchase(asset.tokenId, asset.purchaseTokenId, Web3.utils.fromWei(asset.price, "ether")) : () => this.Approval(asset.purchaseTokenId)} className=" cursor-pointer text-center text-off-black rounded-2xl text-xl font2 bg-blue mb-4 mt-4 ml-24 mr-24">
                {asset.purchaseTokenId === "0" ? "Purchase" : this.state["allowance" + asset.purchaseTokenId] > 20000 ? "Purchase" : "Approve"}
              </div>
            </div>
          ))}
        </div>{" "}
      </div>
      <div className={this.state.OwnedAssets.length > 0 ? "hidden" : "font2 pt-80 pb-80 text-white text-center text-4xl"}>
        No Items For Sale
      </div>
      </div>
    );
  }
}

export default MarketComponrnt;
