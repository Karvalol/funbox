import React from 'react';
import logo from '../logo.svg';
import './header.css'

export const Header = () => 
  <div className="header">
  	<img className="header-logo" alt="" src={logo} />
  	<div className="header-text">
	    <div>Ставим точки</div>
	    <div>на</div>
	    <div>яндекс картах</div>
    </div>
  </div>