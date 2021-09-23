import React from 'react';
import arrowDown from '../assets/arrow-down.svg';
import './ListItem.css';

interface Props {
  title: string;
}
export const ListItem = ({title}: Props) => (
  <div className="container-list-item">
    <div className="title">{title}</div>
    <img className="arrow-img" src={arrowDown} alt="arrow down" />
  </div>
);
