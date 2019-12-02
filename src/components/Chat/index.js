import React, {useState, useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import InfoBar from '../InfoBar/'
import Input from '../Input/'
import Messages from '../Messages/'
import UserList from '../UserList/'
import Upload from '../Upload/'

import './Chat.scss'

let socket

const Chat = ({location, history}) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [message, setMessage] = useState('')
    const [image, setImage] = useState('')
    const [messages, setMessages] = useState([])
    const [roomData, setRoomData] = useState({})
    const ENDPOINT = '10.111.2.53:4000'

    useEffect(() => {
        const {name, room} = queryString.parse(location.search)
        socket = io(ENDPOINT)
        setName(name)
        setRoom(room)

        socket.emit('user-join', {name, room}, (error) => {
            alert(error)
            history.push('/')
        })

        return () => {
            socket.emit('disconnect')
            socket.off()
        }
    },[ENDPOINT, location.search, history])

    useEffect(() => {
        socket.on('admin-message', (message) => {
            setMessages(state => {
                return [
                    ...state,
                    message
                ]
            })
        })
    }, [])

    useEffect(() => {
        socket.on('room-data', (data) => {
            setRoomData((datas) => {
                return {...data}
            })
        })

    }, [roomData])

    const sendMessage = (e)=> {
        e.preventDefault()
        if (message){
            socket.emit('send-message', message, () => setMessage(''))
        }

        if (image) {
            socket.emit('send-message', image, () => setImage(''))
        }
    }

    const inputProps = {
        message,
        setMessage,
        sendMessage
    }

    const uploadProps = {
        image,
        setImage,
        sendMessage
    }

    const messagesProps = {
        messages,
        name
    }
    // console.log("TCL: Chat -> message", message)
    // console.log("TCL: Chat -> messages", messages)
    return (
        <div className="chat">
            <div className="chat-container">
                <InfoBar room={room} />
                <Messages {...messagesProps} />
                <Input {...inputProps} />
                <Upload {...uploadProps} />
            </div>
            <div>
                <UserList roomData={roomData} />
            </div>
        </div>
    )
}

export default Chat