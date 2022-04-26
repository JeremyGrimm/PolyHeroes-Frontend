import React from "react";
import "../../Css/Fonts.css";
import {Connect, GetAddress} from "../../Hooks/UseWeb3"

class Navbar extends React.Component {

    constructor(props){
        super(props);
        this.state = {  
            isMenuOpen: false,
            account: "",
          }
      }

      async setWallet () {
            let wallet = await GetAddress();
            this.setState({account: wallet});
      }

      componentWillMount () {
          this.setWallet();
          this.Check();
      }

      async Check() {
        if(window.ethereum) {
          window.ethereum.on('chainChanged', () => {
            window.location.reload();
          })
          window.ethereum.on('accountsChanged', () => {
            window.location.reload();
          })
      }
      }
    

  render(){
        
    return (
        
      <div>
      <nav className="flex justify-between flex-wrap  bg-off-black pt-8 pb-8 ">
        <div className="flex ">
        <a className="ml-8 text-3xl text-blue font1 inline-block" href="/">PolyHeros</a>
        <div className=" hidden lg:block font1 text-white mt-2">
          <a className="block inline-block text-center cursor-pointer ml-10" href="/Tavern">
              Tavern
          </a>
          <a className="block  inline-block ml-10 mr-10 text-center cursor-pointer" href="/Market">
              Market
          </a>
          <a className="block inline-block  text-center cursor-pointer" href="/Dungeon">
              Dungeon
          </a>
        </div>
        </div>
        <div className="hidden lg:block text-right font1 text-off-black grid justify-items-end mr-10 -mt-1">
            <button onClick={()=>Connect()} className="bg-blue rounded-2xl p-3">
            {this.state.account ? this.state.account.substring(0, 4) +
                  "..." +
                  this.state.account.substring(38, 42) : "Connect Wallet"}
            </button>
        </div>
        <button onClick={() => this.setState({isMenuOpen: !this.state.isMenuOpen})} className="block lg:hidden text-white justify-items-end mr-10 text-xl">
                <i className="fa fa-bars"></i>
          </button>
          
      </nav>
      <div className={this.state.isMenuOpen ? "block lg:hidden grid font1 text-2xl bg-gray text-white text-center" : "hidden"}>
          <a className="block inline-block text-center cursor-pointer mt-10" href="/Tavern">
              Tavern
          </a>
          <a className="block  inline-block text-center cursor-pointer mt-10 mb-10" href="/Market">
              Market
          </a>
          <a className="block inline-block  text-center cursor-pointer mb-10" href="/Dungeon">
              Dungeon
          </a>
          <button onClick={()=>Connect()} className=" bg-blue text-off-black ml-24 mr-24 sm:ml-52 sm:mr-52 rounded-2xl p-3 mb-10">
          {this.state.account ? this.state.account.substring(0, 4) +
                  "..." +
                  this.state.account.substring(38, 42) : "Connect Wallet"}
            </button>
        </div>
      </div>
    );
  }
}

export default Navbar;
