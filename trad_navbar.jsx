import React, { useState } from 'react';
import style from './style.module.css';
import logo from './logo.png';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Sun } from '../assets/Sun.svg';
import { ReactComponent as Moon } from '../assets/Moon.svg';

function TNavbar({ theme, setTheme }) {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const setDarkMode = () => {
    document.querySelector("body").setAttribute('data-theme', 'light');
  };

  const setLightMode = () => {
    document.querySelector("body").setAttribute('data-theme', 'dark');
  };

  const toggleTheme = (e) => {
    if (e.target.checked) {
      const Theme = theme === 'dark' ? 'light' : 'dark';
      setTheme(Theme);
      setDarkMode();
    } else {
      const Theme = theme === 'light' ? 'dark' : 'light';
      setTheme(Theme);
      setLightMode();
    }
  };

  const handleConnectWallet = async () => {
    // Function to check if Petra is installed
    const getAptosWallet = () => {
      if ('aptos' in window) {
        return window.aptos;
      } else {
        window.open('https://petra.app/', '_blank');
      }
    };

    const wallet = getAptosWallet();

    try {
      // Connect to Petra
      const response = await wallet.connect();
      console.log(response); // { address: string, publicKey: string }

      // Set the connection status and wallet address
      setIsConnected(true);
      setWalletAddress(response.address);

      // Do something with the connected wallet, e.g., update UI
      alert(`Connected to Petra! Address: ${response.address}`);
    } catch (error) {
      // Handle errors
      console.error(error);
      alert('Failed to connect to Petra. Please try again.');
    }
  };

  return (
    <div className={style.tnav}>
      <div className={style.navlink1}>
        <div className={style.logo}>
          <img src={logo} alt='Aptos Logo' />
        </div>
        <div className={style.navlink3}>
          <NavLink to="/trading" exact>
            Trading
          </NavLink>
          <NavLink to="/portfolio" exact>
            Portfolio
          </NavLink>
        </div>
      </div>
      <div className={style.navlink2}>
        <div className={style.navnums}>
          <NavNum label='Balance' value='0.0000' />
          <NavNum label='P&L' value='0.0000' />
          <NavNum label='Equity' value='0.0000' />
        </div>
        {isConnected ? (
          <div className={style.connected}>{walletAddress.slice(0, 6)}</div>
        ) : (
          <div className={style.connect} onClick={handleConnectWallet} >
            Connect Wallet
          </div>
        )}
        <div className={style.dark_mode}>
          <input
            className={style.dark_mode_input}
            type='checkbox'
            id='darkmode-toggle'
            onChange={toggleTheme}
          />
          <label className={style.dark_mode_label} htmlFor='darkmode-toggle'>
            <div className={style.sun}>
              <Moon />
            </div>
            <div className={style.Moon}>
              <Sun />
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

export default TNavbar;

function NavNum({ label, value }) {
  return (
    <div className={style.navnum}>
      <div className={style.head}>{label}</div>
      <div className={style.value}>{value}</div>
    </div>
  );
}
