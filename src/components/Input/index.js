import React from 'react'

const Input = (props) => {
    const { message, setMessage, sendMessage } = props
    return (
        <form>
            <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
            />
            <button
            type="submit"
            onClick={e => sendMessage(e)}
            >Send</button>
        </form>
    )
}

export default Input