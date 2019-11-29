import React, {useState, useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

let socket

const Chat = ({location}) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const ENDPOINT = 'localhost:4000'

    useEffect(() => {
        const {name, room} = queryString.parse(location.search)
        socket = io(ENDPOINT)
        setName(name)
        setRoom(room)

        socket.emit('user-join', {name, room}, (error) => {
            alert(error)
        })

        return () => {
            socket.emit('disconnect')
            socket.off()
        }
    },[ENDPOINT, location.search])

    useEffect(() => {
        socket.on('admin-message', (message) => {
            setMessages([...messages, message])
        })
    }, [messages])

    const sendMessage = (e)=> {
        e.preventDefault()
        if (message){
            socket.emit('send-message', message, () => setMessage(''))
        }
    }
    console.log({message, messages})
    return (
        <div>
            <input value={message}
             onChange={e => setMessage(e.target.value)}
             onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
             />
        </div>
    )
}

export default Chat