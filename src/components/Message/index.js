import React from 'react'
import ReactEmoji from 'react-emoji'

import './Message.scss'

const Message = ({message: { user, text }, name}) => {
    let isSentByCurrentUser = false
    const trimmedName = name.trim().toLowerCase()
    if (user === trimmedName){
        isSentByCurrentUser = true
    }
    return (
        isSentByCurrentUser ?
        (
            <div className="message-current-user">
                <div className="message-current-user-text">
                    {ReactEmoji.emojify(text)}
                </div>
            </div>
        ):
        (
            <div className="message-another-user">
                <div className="message-another-user-text">
                    {ReactEmoji.emojify(text)}
                </div>
                <p className="message-label">{user}</p>
            </div>
        )
    )
}

export default Message