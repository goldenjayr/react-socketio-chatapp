import React from 'react'
import closeIcon from './close.png'
import onlineIcon from './online.png'
import './InfoBar.scss'

const InfoBar = ({room, name}) => {
    return (
        <>
        <div style={{display: 'flex', alignItems:'center'}}>
            <img className="icon icon-online" src={onlineIcon} alt="online" width="15" height="15" />
            <h4 className="room-name">{room} room</h4>
        </div>
        <div className="infobar">
            <div className="infobar">
                <img className="message-profilepic" src={`https://robohash.org/${name}${room}?set=set5`} alt="online" width="20" height="20" />
                <h3>{name}</h3>
            </div>
            <div>
                <a href="/">
                    <img className="icon icon-close" src={closeIcon} alt="close" width="15" height="15"  />
                </a>
            </div>
        </div>
        </>
    )
}

export default InfoBar