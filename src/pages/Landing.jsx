import React, { useRef, useState } from 'react'
import Logo from "../assets/logo.png"

import { useNavigate } from 'react-router-dom'


const Landing = () => {


  const navigate = useNavigate();

  const explanationRef = useRef(null);

  // Function to handle the scroll
  const scrollToExplanation = () => {
    explanationRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const [domainOverlay, setDomainOverlay] = useState(false)

  {/* Domain */}
  const openDomainOverlay = () => {
    setDomainOverlay(true);
  }

  const closeDomainOverlay = () => {
    setDomainOverlay(false);
  }

  return (
    <>
      <div className="header">
        <img src={Logo} className="logo-img"/>
        <h1>GiftyGo</h1>
        {/* <h2 style={{ fontWeight: "normal", paddingBottom: "15px", fontFamily: "EB Garamond", color:"gray" }}>Explore our matrix of innnovative projects all crafted from the heart of Europe.</h2>         */}
        {/* <h2 style={{ fontWeight: "normal", paddingBottom: "15px", fontFamily: "EB Garamond", color:"gray" }}>Explore the place where our creative imaginations becomes reality.</h2> */}
        <h2 style={{ fontWeight: "normal", paddingBottom: "15px", fontFamily: "EB Garamond", color:"gray" }}>The ultimate personalised AI tool for gift recommendations.</h2>
        {/* <h2 style={{ fontWeight: "normal", paddingBottom: "15px", fontFamily: "EB Garamond", color:"gray" }}>Filfla.eu - where innovation meets collaboration.</h2> */}
        <div className="title-btns">
          <button className="link-btn link-1" onClick={scrollToExplanation}>Learn more</button>
          <button className="link-btn link-2" onClick={() => navigate('/gift-form')}>Get started</button>
        </div>
      </div>
      <div ref={explanationRef}></div>
    </>
  )
}

export default Landing