import React, { Component } from "react";
import door from "../../Images/door.png";
import { DungeonContract} from "../../Config/Web3Config";
import { sendTransaction } from "../../Hooks/SendTransaction";
import Web3 from "web3";

class Dungeon extends Component {

  async Enter () {
    let web3 = new Web3("https://rpc-mumbai.matic.today")
    const input = document.getElementById('tokenIdInput').value;
    const toAddress = DungeonContract;
    const data = web3.eth.abi.encodeFunctionCall({
        "inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "enterTheDungeon",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}, [input]);

    await sendTransaction(String(0), toAddress, data);

}

  render() {
    return (
      <div className="bg-blue  pt-16 pb-16">
        <div className="bg-off-black mr-16 ml-16 grid rounded-2xl">
          <div className="text-white font1 text-center mt-8 text-2xl">
            Enter The Dungeon
          </div>{" "}
          <div className="flex justify-center mt-8">
            <img src={door} alt=""></img>
          </div>
          <div className="flex justify-center mt-8">
            <input id="tokenIdInput" className="text-off-black text-center font1 text-2xl" placeholder="Enter Token Id"></input>
          </div>
          <button onClick={() => this.Enter()} className="rounded-2xl bg-blue m-auto pt-2 pb-2 pl-4 pr-4 mt-8 mb-8 text-2xl font1 text-off-black">Quest!</button>
        </div>
      </div>
    );
  }
}

export default Dungeon;
