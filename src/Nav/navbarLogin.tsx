import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '../Models/User';
import { Coach } from '../Models/Coach';
import { Paticipant } from '../Models/Client';
import { convertToUser } from './convertToUser';

class Navbarlogin extends Component{
  render(){return (
    <header className="header_section">
      <div className="container">
        <div className="header_nav">
          <a className="navbar-brand brand_desktop" href="index.html">
            <img src="images/logo.png" alt="logo" />
          </a>
          <div className="main_nav">
            <div className="top_nav">
              <ul>
                
                  
                    <li>
                      <a href="">
                        <img src="images/telephone.png" alt="telephone" />
                        <span>+01 1234567890</span>
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <img src="images/mail.png" alt="mail" />
                        <span>demo@gmail.com</span>
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <img src="images/location.png" alt="location" />
                        <span>Den mark Loram ipusum</span>
                      </a>
                    </li>
                  
                
              </ul>
            </div>
            <div className="bottom_nav">
              <nav className="navbar navbar-expand-lg custom_nav-container">
                <a className="navbar-brand brand_mobile" href="index.html">
                  <img src="images/logo.png" alt="logo" />
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <div className="d-flex ml-auto flex-column flex-lg-row align-items-center">
                    <ul className="navbar-nav">
                      <li className="nav-item active">
                        <a className="nav-link" href="index.html">
                          Home <span className="sr-only">(current)</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="about.html">
                          About
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="className.html">
                          Classes
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="blog.html">
                          Blog
                        </a>
                      </li>
                    </ul>
                    <form className="form-inline">
                      <button className="btn ml-3 ml-lg-5 nav_search-btn" type="submit"></button>
                    </form>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}}

export default Navbarlogin;
