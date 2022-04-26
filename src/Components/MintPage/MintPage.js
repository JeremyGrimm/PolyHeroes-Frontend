import React, { Component } from "react";
import "../../Css/Fonts.css";
import h990 from "../../Images/h990.png";
import h365 from "../../Images/h365.png";
import { UseGoldContract, UseNftContract } from "../../Hooks/UseContractInstance";
import { GoldContract, NftContract } from "../../Config/Web3Config";
import { sendTransaction } from "../../Hooks/SendTransaction";
import Web3 from "web3";
import {GetAddress} from "../../Hooks/UseWeb3"

class MintPage extends Component {
  state = {Account: "", approvalAmount: 0, GoldLeft: 0, MaticLeft: 0};

  async componentWillMount() {
    const web3 = new Web3 ("https://rpc-mumbai.matic.today")
    const Account = await GetAddress()
    let approvalAmount;
    if(Account) {
     approvalAmount = web3.utils.fromWei(await UseGoldContract.methods.allowance(Account, NftContract).call(), 'ether')
    }
    else {
      approvalAmount = 0;
    }
    const GoldLeft = 10000 - await UseNftContract.methods.remainderOfGold().call();
    const MaticLeft = 10000 - await UseNftContract.methods.remainderOfPrimary().call();

    console.log(approvalAmount)
    
    this.setState({Account, approvalAmount, GoldLeft, MaticLeft})
  }

  

  async maticMint () {
      let web3 = new Web3("https://rpc-mumbai.matic.today")
      const input = document.getElementById('maticInput').value;
      const value = input * 0.02
      const toAddress = NftContract;
      const data = web3.eth.abi.encodeFunctionCall({
        "inputs": [
          {
            "internalType": "uint256",
            "name": "numberOfNfts",
            "type": "uint256"
          }
        ],
        "name": "publicMint",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      }, [input]);

      await sendTransaction(String(value), toAddress, data);

  }

  async Approval () {
    let web3 = new Web3("https://rpc-mumbai.matic.today")
    const toAddress = GoldContract;
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
    }, [NftContract, web3.utils.toWei('200000', 'ether')]);

    await sendTransaction(String(0), toAddress, data);

}

async GoldMint () {
  let web3 = new Web3("https://rpc-mumbai.matic.today")
  const input = document.getElementById('goldInput').value;
  const toAddress = NftContract;
  const data = web3.eth.abi.encodeFunctionCall(	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "numberOfNfts",
				"type": "uint256"
			}
		],
		"name": "Goldmint",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"  
	}, [input]);

  await sendTransaction(String(0), toAddress, data);

}

  render() {
      
    return (
      <div>
        <div className="pt-24 pb-24 bg-blue grid xl:grid-cols-2 gap-24">
          <div className="text-center font1 text-white bg-off-black mr-24 xl:mr-0 ml-24 rounded-2xl pt-20 pb-20">
            <h1>Mint a hero with Matic</h1>
            <img className="mt-12 m-auto" src={h990} alt=""></img>
            <div className="text-2xl mt-8">{this.state.MaticLeft}/10000</div>
            <div className="grid mt-8 ml-52 mr-52">
            <input className="text-off-black text-center" placeholder="Number of Nfts (max 20)" id="maticInput"></input>
            <button onClick={this.maticMint} className="mt-4 bg-gray p-4 rounded-2xl">Mint!</button>
            </div>
          </div>
          <div className="text-center font1 text-white bg-off-black ml-24 xl:ml-0 mr-24 rounded-2xl pt-20 pb-20">
          <h1>Mint a hero with Gold</h1>
          <img className="mt-12 m-auto" src={h365} alt=""></img>
          <div className="text-2xl mt-8">{this.state.GoldLeft}/10000</div>
            <div className="grid mt-8 ml-52 mr-52">
            <input className="text-off-black text-center" placeholder="Number of Nfts (max 20)" id="goldInput"></input>
            <button onClick={this.state.approvalAmount >= 20000 ? this.GoldMint : this.Approval} className="mt-4 bg-gray p-4 rounded-2xl">{this.state.approvalAmount >= 20000 ? "Mint!" : "Approve!"}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MintPage;
