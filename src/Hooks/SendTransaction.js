import Web3 from "web3";
import { GetAddress } from "./UseWeb3";

export const sendTransaction = async (value, toAddress, data) => {

    const ethereum = window.ethereum
    const web3 = new Web3(window.ethereum);
    const fromAddress = await GetAddress()

    const valueInWei = web3.utils.toWei(value, 'ether')
    const valueHex = web3.utils.toHex(valueInWei)

    const transactionParameters = {
        from:fromAddress,
        to: String(toAddress), 
        value: valueHex, 
        data: data, 
      };
      
        await ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
}