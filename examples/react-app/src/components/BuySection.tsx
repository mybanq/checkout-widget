import React from 'react';
import {PayButton} from './PayButton';
import etheriumSvg from '../assets/etherium.svg';
import './BuySection.css';

export const BuySection = () => (
  <div className="container-buy-section">
    <div className="title">Current Price</div>
    <div className="price">
      <img className="buy-img" src={etheriumSvg} alt="etherium" />
      0.15
      <span className="title converted-price">($349.91)</span>
    </div>
    <PayButton />
  </div>
);
