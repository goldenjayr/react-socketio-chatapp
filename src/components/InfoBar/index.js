import React from 'react'

const InfoBar = ({room}) => {
    return (
        <div>
            <div>
                <img src={'onlineIcon'} alt="online" />
                <h3>{room}</h3>
            </div>
            <div>
                <a href="/">
                    <img src={'closeIcon'} alt="close" />
                </a>
            </div>
        </div>
    )
}

export default InfoBar