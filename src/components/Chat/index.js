import React, {useState, useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import InfoBar from '../InfoBar/'
import Input from '../Input/'
import Messages from '../Messages/'

import './Chat.scss'

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
    const inputProps = {
        message,
        setMessage,
        sendMessage
    }

    const messagesProps = {
        messages,
        name
    }
    return (
        <div className="chat">
            <div>
                <InfoBar room={room} />
                <Messages {...messagesProps} />
                <Input {...inputProps} />
            </div>
        </div>
    )
}

export default Chat