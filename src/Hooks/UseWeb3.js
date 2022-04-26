    import Web3 from "web3"

    export const Connect = () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            window.ethereum.enable();
    }
    }

    export const GetAddress =  async () => {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
       
            const accounts = await web3.eth.getAccounts();
            
            return accounts[0];
        } else {
            return "Connect Wallet";
        }
    }
    

