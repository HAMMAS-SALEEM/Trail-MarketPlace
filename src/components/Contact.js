import React from 'react'
import arrow from '../assets/contact_arrow.svg'
import discord from '../assets/discord.png'
import x from '../assets/x.png'
import ship from '../assets/ship.png'
import clouds from '../assets/footer-clouds.png'
// import bird from '../assets/bird.gif'

export const Contact = () => {
  return (
    <footer className="footer" id="contact">
      <div className="footer-details">
        <h2 className="footer-heading">CONTACTS</h2>
        <img src={arrow} alt="arrow" className="footer-arrow-image" />
        <div className='social-icons-container'>
          <a href="https://discord.gg/EfVn4d64xY">
            <img className='social-icons' src={discord} alt='discord' />
          </a>
          <a href="https://twitter.com/metamountaineer">
            <img className='social-icons' src={x} alt='x' />
          </a>
          <a href="https://opensea.io/collection/meta-mountaineers-nft">
            <img className='social-icons' src={ship} alt='ship' />
          </a>
        </div>
        <img src={clouds} alt="clouds" className="footer-clouds-image" />
        {/* <img src={bird} alt="clouds" className="footer-clouds-image" /> */}
        <p className="footer-rights">© 2023 Meta Mountaineers in partnership with Granite Labs</p>
      </div>
    </footer>
  )
}
