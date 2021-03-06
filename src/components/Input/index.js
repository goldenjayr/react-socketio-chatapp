import React from 'react'
import { TextField, Button } from 'react-md'

import './Input.scss'

const Input = (props) => {
    const { message, setMessage, sendData } = props
    return (
        <div>
            <form>
                <div className="input">
                    <TextField
                    id="message"
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={e => setMessage(e)}
                    onKeyDown={e => e.key === 'Enter' ? sendData(e) : null}
                    className="input-message"
                    fullWidth
                    />
                    <Button
                    raised
                    primary
                    swapTheming
                    type="submit"
                    onClick={e => sendData(e)}
                    >Send</Button>
                </div>
            </form>
        </div>
    )
}

export default Input