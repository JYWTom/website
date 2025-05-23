import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./header.css";

import fb from "../assets/fb-white.svg";
import ig from "../assets/ig-white.svg";
import yt from "../assets/yt-white.svg";
import medium from "../assets/medium-white.svg";
import Logo from "../assets/logo.svg";
import cons from "../assets/website_cons.svg";
import csess from "../assets/website_csess.svg";

function Header() {
  let isHome = useLocation().pathname === "/";
  return (
    <div className={`box-header ${isHome ? "tall" : ""}`}>
      <Link to="/" className="logo">
        <img src={Logo} alt="CSESS, HKUSTSU" />
      </Link>
      <div className="header-social-media">
        <a
          href="https://www.facebook.com/csess.hkustsu/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={fb} alt="Facebook" />
        </a>
        <a
          href="https://www.instagram.com/csess.hkustsu/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={ig} alt="Instagram" />
        </a>
        <a
          href="https://www.youtube.com/@CSESSHKUSTSU"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={yt} alt="Youtube" />
        </a>
        <a
          href="https://ustcsess.medium.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={medium} alt="Medium" />
        </a>
      </div>
      <div className="csess" aria-selected="false">
        <img src={csess} alt="csess" />
      </div>
      <div className="cons" aria-selected="false">
        <img src={cons} alt="csess" />
      </div>
    </div>
  );
}

export default Header;
