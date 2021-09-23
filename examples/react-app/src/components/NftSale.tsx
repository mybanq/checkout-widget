import React from 'react';
import {ListItem} from './ListItem';
import {BuySection} from './BuySection';
import './NftSale.css';

export const NftSale = () => (
  <>
    <div className="left-container">
      <div className="nft-img" />
      <ListItem title="description" />
      <ListItem title="properties" />
      <ListItem title="statisticks" />
      <ListItem title="about" />
      <ListItem title="details" />
    </div>
    <div className="right-container">
      <div className="category">banqCats</div>
      <div className="nft-name">banqbandi</div>
      <div className="owned-by">
        Owned by <span className="category">banq-cats-auction</span>
      </div>
      <BuySection />
      <ListItem title="price history" />
      <ListItem title="listings" />
      <ListItem title="offers" />
    </div>
  </>
);
