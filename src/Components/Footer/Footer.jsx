import React, { Component } from 'react'
import "../../Css/Fonts.css"

class Footer extends Component {
    state = {  } 
    render() { 
        return (<div className="bg-off-black pt-24 pb-24 grid grid-cols-3">
            <h1 className="text-white text-center font2 text-2xl ">PolyHeroes</h1> <h1 className="text-white m-auto font2 text-2xl">2022, PolyHeroes NFT all rights reserved</h1> <div className="text-center text-white">              <a href="https://twitter.com">
                <i className="fab fa-twitter  text-2xl"></i>
              </a>
              <a href="https://discord.gg">
                <i className="ml-8 fab fa-discord  text-2xl"></i>
              </a>
              <a href="https://opensea.io">
                <i className="ml-8 fas fa-anchor text-2xl mr-8"></i>
              </a></div>

        </div>);
    }
}
 
export default Footer;