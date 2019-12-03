import React, {useState, useEffect} from 'react'
import ReactEmoji from 'react-emoji'

import './Message.scss'

const Message = ({message: { user, text }, name}) => {
    console.log("TCL: Message -> text", text)
    const [imagePreviewUrl, setImagePreviewUrl] = useState('')

    let isSentByCurrentUser = false
    const trimmedName = name.trim().toLowerCase()

    if (user === trimmedName){
        isSentByCurrentUser = true
    }

    const parseImage = (parts) => {
        const blob = new Blob( [ ...parts ], { type: "image/jpeg" } );
        const urlCreator = window.URL || window.webkitURL;
        const imageUrl = urlCreator.createObjectURL( blob );
        setImagePreviewUrl(imageUrl)
    }

    useEffect(() => {
        if (typeof text === 'object') {
            parseImage(text)
        }
    }, [text])


    let imagePreview = null;
    if (imagePreviewUrl) {
        imagePreview = (<img width="100" height="auto" src={imagePreviewUrl} alt="preview" />);
    } else if (typeof text !== 'object') {
        imagePreview = ReactEmoji.emojify(text)
    }

    return (
        isSentByCurrentUser ?
        (
            <div className="message-current-user">
                <div className="message-current-user-text">
                    {imagePreview}
                </div>
            </div>
        ):
        (
            <div className="message-another-user">
                <div className="message-another-user-text">
                    <img className="message-profilepic" src={`https://robohash.org/${user}?set=set5`} alt='profile' />
                    {imagePreview}
                </div>
                <p className="message-label">{user}</p>
            </div>
        )
    )
}

export default Message