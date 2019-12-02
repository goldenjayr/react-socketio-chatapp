import React from 'react'
import onlineIcon from './online.png'
import closeIcon from './close.png'
import './InfoBar.scss'

const InfoBar = ({room}) => {
    return (
        <div className="infobar">
            <div className="infobar">
                <img className="icon icon-online" src={onlineIcon} alt="online" width="20" height="20" />
                <h3>{room}</h3>
            </div>
            <div>
                <a href="/">
                    <img className="icon icon-close" src={closeIcon} alt="close" width="15" height="15"  />
                </a>
            </div>
        </div>
    )
}

export default InfoBar