import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import {
  FaChartLine,
  FaWallet,
  FaUserGear,
  FaChartPie,
  FaChevronLeft,
} from "react-icons/fa6";
import {
  PiArrowLineDownBold,
  PiArrowLineUpBold,
  PiCurrencyDollarSimpleBold,
  PiArrowsLeftRightBold,
} from "react-icons/pi";
import Logo from "../assets/logo";

import PropTypes from "prop-types";

const Sidebar = ({ logoSrc }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <aside className={`${styles.aside} ${menuOpen ? styles.open : ""}`}>
      <div className={styles.hamburger} onClick={toggleMenu}>
        {menuOpen ? (
          <FaChevronLeft className={styles.closeIcon} />
        ) : (
          <>
            <div className={`${styles.hamburgerLine}`} />
            <div className={`${styles.hamburgerLine}`} />
            <div className={`${styles.hamburgerLine}`} />
          </>
        )}
      </div>
      <div className={styles.mainLogo}>
        <Logo />
      </div>
      <div className={styles.sidebar_items}>
          <Logo className={styles.mobileLogo} />
        <ul aria-label="Sidebar Lists" className={styles.mainList}>
          <li>
            <FaChartPie />
            <p>Portfolio</p>
          </li>
          <li>
            <FaChartLine />
            <p>Markets</p>
          </li>
          <li>
            <FaWallet />
            <p>Accounts</p>
          </li>
          <li>
            <PiArrowLineUpBold />
            <p>Send</p>
          </li>
          <li>
            <PiArrowLineDownBold />
            <p>Receive</p>
          </li>
          <li>
            <PiCurrencyDollarSimpleBold />
            <p>Buy/Sell</p>
          </li>
          <li>
            <PiArrowsLeftRightBold />
            <p>Swap</p>
          </li>
          <li>
            <FaUserGear />
            <p>Manager</p>
          </li>
        </ul>
        <ul aria-label="Sidebar Lists" className={styles.mobileList}>
          <li>
            <FaChartPie />
            <p>Portfolio</p>
          </li>
          <li>
            <FaChartLine />
            <p>Markets</p>
          </li>
          <li>
            <FaWallet />
            <p>Accounts</p>
          </li>
          <li>
            <PiArrowLineUpBold />
            <p>Send</p>
          </li>
          <li>
            <PiArrowLineDownBold />
            <p>Receive</p>
          </li>
          <li>
            <PiCurrencyDollarSimpleBold />
            <p>Buy/Sell</p>
          </li>
          <li>
            <PiArrowsLeftRightBold />
            <p>Swap</p>
          </li>
          <li>
            <FaUserGear />
            <p>Manager</p>
          </li>
        </ul>
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  logoSrc: PropTypes.string.isRequired,
};

export default Sidebar;
