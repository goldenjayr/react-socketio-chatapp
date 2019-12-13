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

    const composeData = () => {

        return { message, file: file.map(f => f.name), name, room }
    }

    const clearData = () => {
        setMessage('')
        setFile([])
    }

    const sendData = (e) => {
        e.preventDefault()
        const data = composeData()
        console.log("TCL: sendData -> data", data)
        if (data){
            file.forEach(item => {
                const stream = ss.createStream()
                ss(socket).emit('send-data', stream, {name, room, file: {name: item.name, size: item.size}}, () => clearData())
                ss.createBlobReadStream(item).pipe(stream)
            })
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
        sendData
    }

    const uploadProps = {
        file,
        setFile
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
                <InfoBar name={name} room={room} />
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