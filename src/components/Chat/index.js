import React, {useState, useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import ss from 'socket.io-stream'

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
    const ENDPOINT = 'localhost:4000'
    const stream = ss.createStream()

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
        console.log("TCL: message", message)
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
        ss(socket).emit('send-message', stream, message, () => setMessage(''))
        }

        if (image) {
            ss(socket).emit('send-message', stream, {image: image.name}, () => setImage(''))
            ss.createBlobReadStream(image).pipe(stream)
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