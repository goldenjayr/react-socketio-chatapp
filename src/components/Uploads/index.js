import React, {useState, useEffect} from 'react'
import io from 'socket.io-client'
import ss from 'socket.io-stream'
import queryString from 'query-string'


let socket

const Uploads = ({location, history}) => {
    const [images, setImages] = useState([])
    let name = ''
    if (location.search) {
        name = queryString.parse(location.search).name
    } else if (location.pathname) {
        name = location.pathname.slice(9)
    }

    const ENDPOINT = `localhost:4000/uploads`
    const query = { query: { file_name: name }}
    useEffect(() => {

        socket = io(ENDPOINT, query)
        socket.on('connected-uploads', (data) => {
            console.log(data)
        })
        socket.emit('ready')
    }, [])

    useEffect(() => {
        ss(socket).on('upload-data', (stream, data) => {
        console.log("TCL: Uploads -> data", data)

            const parts = []
            stream.on('data', chunk => {
            console.log("TCL: Uploads -> chunk", chunk)
                parts.push(chunk)
                if(parts.length === data.length) {
                    parseImage(parts)
                }
            })


        })
    }, )

    useEffect(() => {
        socket.on('uploaded', () => {
        console.log("TCL: Uploads -> uploaded")
            socket.emit('ready')
        })
    }, [])


    const parseImage = (parts) => {
        console.log("TCL: parseImage -> parts", parts)
        // const arrayBufferView = new Uint8Array(image);
        const blob = new Blob( [ ...parts ], { type: "image/jpeg" } );
        const urlCreator = window.URL || window.webkitURL;
        const imageUrl = urlCreator.createObjectURL( blob );
        setImages(state => {
            return [
                ...state,
                imageUrl
            ]
        })
    }


    return (
        <div>
            {images && images.map(image => {
                return (<img key={image} width="300" height="auto" src={image} alt="preview" />);
            })}
        </div>
        )
    }

export default Uploads