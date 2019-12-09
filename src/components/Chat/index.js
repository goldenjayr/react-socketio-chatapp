import React, {useState, useEffect, useCallback} from 'react'
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
    const [image, setImage] = useState([])
    const [file, setFile] = useState([])
    const [messages, setMessages] = useState([])
    const [roomData, setRoomData] = useState({})
    const ENDPOINT = 'localhost:4000/'
    let namespace

    useEffect(() => {
        namespace = 'texts'
        const {name, room} = queryString.parse(location.search)
        socket = io(ENDPOINT + namespace)
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
        // ss(socket).on('admin-message-image', (stream, message) => {
        //     const binaryString = ''
        //     const parts = []
        //     stream.on('data', (chunk) => {
        //         parts.push(chunk)
        //     })
        //     message.text = parts
        //     stream.on('end', () => {
        //         setMessages(state => {
        //             return [
        //                 ...state,
        //                 message
        //             ]
        //         })
        //     })

        // })
        socket.on('admin-message', message => {
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

    const uploadFile = (e) => {
        e.preventDefault()
        if (file) {
            namespace = 'uploads'
            socket = io(ENDPOINT + namespace)
            socket.emit('file-upload', )
        }
    }

    const sendFiles = useCallback(e => {
            e.preventDefault()
        }, [])

    const sendMessage = (e) => {
        e.preventDefault()
        if (message){
            socket.emit('send-message', message, () => setMessage(''))
        }

        // if (image.length > 0) {
        // if (image.length > 0) {
        //     image.forEach(img =
        // if (image.length > 0) {
        //     image.forEach(img => {
        //         const stream = ss.createStream()
        //         ss(socket).emit('send-message', stream, {image: img.name}, () => setImage(''))
        //         const blobStream = ss.createBlobReadStream(img)
        //         let size = 0

        //         blobStream.on('data', (chunk) => {
        //             size += chunk.length
        //             console.log(`Uploading ${img.name} --- ${Math.floor(size / img.size * 100)} %`)
        //         })

        //         blobStream.pipe(stream)
        //     })
        // }> {
        //         const stream = ss.createStream()
        //         ss(socket).emit('send-message', stream, {image: img.name}, () => setImage(''))
        //         const blobStream = ss.createBlobReadStream(img)
        //         let size = 0

        //         blobStream.on('data', (chunk) => {
        //             size += chunk.length
        //             console.log(`Uploading ${img.name} --- ${Math.floor(size / img.size * 100)} %`)
        //         })

        //         blobStream.pipe(stream)
        //     })
        // }s.createStream()
        //         ss(socket).emit('send-message', stream, {image: img.name}, () => setImage(''))
        //         const blobStream = ss.createBlobReadStream(img)
        //         let size = 0

        //         blobStream.on('data', (chunk) => {
        //             size += chunk.length
        //             console.log(`Uploading ${img.name} --- ${Math.floor(size / img.size * 100)} %`)
        //         })

        //         blobStream.pipe(stream)
        //     })
        // }
    }

    const inputProps = {
        message,
        setMessage,
        sendMessage
    }

    const uploadProps = {
        file,
        setFile,
        sendFiles
    }

    const messagesProps = {
        roomData,
        messages,
        name,
        room
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