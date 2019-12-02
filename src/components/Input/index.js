import React from 'react'
import { TextField, Button } from 'react-md'

import './Input.scss'

const Input = (props) => {
    const { message, setMessage, sendMessage } = props
    return (
        <div>
            <form>
                <div className="input">
                    <TextField
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={e => setMessage(e)}
                    onKeyDown={e => e.key === 'Enter' ? sendMessage(e) : null}
                    className="input-message"
                    fullWidth
                    />
                    <Button
                    raised
                    primary
                    swapTheming
                    type="submit"
                    onClick={e => sendMessage(e)}
                    >Send</Button>
                </div>
            </form>
        </div>
    )
}

export default Input